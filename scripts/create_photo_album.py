#!/usr/bin/env python3
"""
Photo Album Generator

Usage:
  python3 create_photo_album.py <image_folder> <album_title> [--location "Location Name"]

Expected input:
  - Image folder containing JPEGs and an ImageCaptions.csv file
  - CSV format: filename,datetime,caption (datetime as YYYY-MM-DD HH:MM or similar)

Output:
  - Renames images to YYYY-MM-DD-hh-mm-caption.jpeg format
  - Creates markdown file in _photography/ folder
  - Optimizes images (quality 80)
"""

import os
import sys
import csv
import re
import argparse
from datetime import datetime
from pathlib import Path

# Try to import PIL for optimization
try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    HAS_PIL = False
    print("Warning: PIL not installed. Images won't be optimized.")
    print("Install with: pip3 install Pillow")


def parse_datetime(dt_string):
    """Parse various datetime formats."""
    formats = [
        "%Y-%m-%d %H:%M:%S",
        "%Y-%m-%d %H:%M",
        "%Y/%m/%d %H:%M:%S",
        "%Y/%m/%d %H:%M",
        "%d-%m-%Y %H:%M:%S",
        "%d-%m-%Y %H:%M",
        "%d/%m/%Y %H:%M:%S",
        "%d/%m/%Y %H:%M",
    ]
    for fmt in formats:
        try:
            return datetime.strptime(dt_string.strip(), fmt)
        except ValueError:
            continue
    raise ValueError(f"Cannot parse datetime: {dt_string}")


def sanitize_filename(caption):
    """Make caption safe for filename."""
    # Remove/replace problematic characters
    caption = caption.strip()
    # Keep alphanumeric, spaces, and some punctuation
    caption = re.sub(r'[<>:"/\\|?*]', '', caption)
    # Replace multiple spaces with single space
    caption = re.sub(r'\s+', ' ', caption)
    return caption[:80]  # Limit length


def read_captions_csv(csv_path):
    """Read captions from CSV file."""
    captions = []
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Try different column name variations
            filename = row.get('filename') or row.get('Filename') or row.get('file') or row.get('File')
            dt_str = row.get('datetime') or row.get('DateTime') or row.get('date') or row.get('Date') or row.get('timestamp')
            caption = row.get('caption') or row.get('Caption') or row.get('description') or row.get('Description')

            if filename and caption:
                try:
                    dt = parse_datetime(dt_str) if dt_str else None
                    captions.append({
                        'original_filename': filename.strip(),
                        'datetime': dt,
                        'caption': caption.strip()
                    })
                except ValueError as e:
                    print(f"Warning: {e} for file {filename}")
    return captions


def optimize_image(filepath):
    """Optimize image with PIL."""
    if not HAS_PIL:
        return

    try:
        img = Image.open(filepath)
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        img.save(filepath, 'JPEG', quality=80, optimize=True)
    except Exception as e:
        print(f"Warning: Could not optimize {filepath}: {e}")


def rename_images(image_folder, captions):
    """Rename images based on captions."""
    renamed = []

    for item in captions:
        original = item['original_filename']
        original_path = os.path.join(image_folder, original)

        if not os.path.exists(original_path):
            print(f"Warning: File not found: {original}")
            continue

        dt = item['datetime']
        caption = sanitize_filename(item['caption'])

        if dt:
            new_filename = f"{dt.strftime('%Y-%m-%d-%H-%M')}-{caption}.jpeg"
        else:
            # If no datetime, use original name prefix
            new_filename = f"{caption}.jpeg"

        new_path = os.path.join(image_folder, new_filename)

        if original_path != new_path:
            # Handle potential conflicts
            if os.path.exists(new_path):
                base, ext = os.path.splitext(new_filename)
                counter = 1
                while os.path.exists(new_path):
                    new_filename = f"{base}_{counter}{ext}"
                    new_path = os.path.join(image_folder, new_filename)
                    counter += 1

            os.rename(original_path, new_path)
            print(f"Renamed: {original} -> {new_filename}")

        # Optimize
        optimize_image(new_path)

        renamed.append({
            'filename': new_filename,
            'datetime': dt,
            'caption': item['caption']
        })

    # Sort by datetime
    renamed.sort(key=lambda x: x['datetime'] or datetime.min)
    return renamed


def generate_markdown(images, image_folder, album_title, location=None):
    """Generate gallery markdown file."""
    # Determine the relative path for images
    folder_name = os.path.basename(image_folder)

    # Get date from first image or use today
    if images and images[0]['datetime']:
        album_date = images[0]['datetime'].strftime('%Y-%m-%d')
    else:
        album_date = datetime.now().strftime('%Y-%m-%d')

    # Create slug from title
    slug = re.sub(r'[^a-z0-9]+', '-', album_title.lower()).strip('-')

    md_filename = f"{album_date}-{slug}.md"

    # Build markdown content
    lines = [
        "---",
        "layout: photo",
        f'title: "{album_title}"',
        f"date: {album_date}",
    ]

    if location:
        lines.append(f"location: {location}")

    lines.append("---")
    lines.append("")

    for img in images:
        caption = img['caption']
        filename = img['filename']
        lines.append(f'<div class="grid-item" data-caption="{caption}">')
        lines.append(f'  <img src="{{{{ site.baseurl }}}}/images/{folder_name}/{filename}" alt="{caption}">')
        lines.append('</div>')
        lines.append('')

    return md_filename, '\n'.join(lines)


def main():
    parser = argparse.ArgumentParser(description='Generate photo album from image folder')
    parser.add_argument('image_folder', help='Path to folder containing images and ImageCaptions.csv')
    parser.add_argument('album_title', help='Title for the album')
    parser.add_argument('--location', '-l', help='Location name (optional)')
    parser.add_argument('--dry-run', '-n', action='store_true', help='Show what would be done without making changes')

    args = parser.parse_args()

    image_folder = os.path.abspath(args.image_folder)

    # Find CSV file
    csv_path = os.path.join(image_folder, 'ImageCaptions.csv')
    if not os.path.exists(csv_path):
        print(f"Error: ImageCaptions.csv not found in {image_folder}")
        print("Expected CSV format: filename,datetime,caption")
        sys.exit(1)

    print(f"Reading captions from: {csv_path}")
    captions = read_captions_csv(csv_path)
    print(f"Found {len(captions)} images with captions")

    if args.dry_run:
        print("\n=== DRY RUN - No changes will be made ===\n")
        for item in captions:
            dt = item['datetime']
            caption = sanitize_filename(item['caption'])
            if dt:
                new_name = f"{dt.strftime('%Y-%m-%d-%H-%M')}-{caption}.jpeg"
            else:
                new_name = f"{caption}.jpeg"
            print(f"{item['original_filename']} -> {new_name}")
        return

    # Rename and optimize images
    print("\nRenaming and optimizing images...")
    renamed_images = rename_images(image_folder, captions)

    # Generate markdown
    print("\nGenerating markdown...")
    md_filename, md_content = generate_markdown(
        renamed_images,
        image_folder,
        args.album_title,
        args.location
    )

    # Find _photography folder (go up from scripts or image folder)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(script_dir)
    photography_dir = os.path.join(repo_root, '_photography')

    if not os.path.exists(photography_dir):
        os.makedirs(photography_dir)

    md_path = os.path.join(photography_dir, md_filename)
    with open(md_path, 'w', encoding='utf-8') as f:
        f.write(md_content)

    print(f"\nCreated: {md_path}")

    # Optionally delete the CSV
    print(f"\nYou can now delete: {csv_path}")

    print("\n✓ Done! Don't forget to git add, commit, and push.")


if __name__ == '__main__':
    main()
