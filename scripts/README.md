# Photo Album Automation Scripts

## create_photo_album.py

Automates the creation of photo gallery pages from a folder of images.

### What It Does

1. **Reads captions** from `ImageCaptions.csv` in the image folder
2. **Renames images** to `YYYY-MM-DD-hh-mm-caption.jpeg` format
3. **Optimizes images** (80% quality, typically 85% size reduction)
4. **Generates markdown** file in `_photography/` folder with grid layout

### Prerequisites

```bash
pip3 install Pillow
```

### Input Format

Create an `ImageCaptions.csv` file in your image folder:

```csv
filename,datetime,caption
IMG_5481.jpeg,2026-01-03 12:54,Excited for the trip start
IMG_5484.jpeg,2026-01-03 16:37,Annnd we've landed
IMG_5490.jpeg,2026-01-03 19:54,Dinner at Da Tita. Yum!
```

**Supported datetime formats:**
- `YYYY-MM-DD HH:MM:SS`
- `YYYY-MM-DD HH:MM`
- `YYYY/MM/DD HH:MM`
- `DD-MM-YYYY HH:MM`
- `DD/MM/YYYY HH:MM`

### Usage

**Basic usage:**
```bash
python3 scripts/create_photo_album.py images/2026-01-MyTrip "My Trip Title"
```

**With location:**
```bash
python3 scripts/create_photo_album.py images/2026-01-MyTrip "My Trip Title" --location "Goa, India"
```

**Dry run (preview without changes):**
```bash
python3 scripts/create_photo_album.py images/2026-01-MyTrip "My Trip Title" --dry-run
```

### Output

The script creates:
- Renamed and optimized images in the same folder
- `_photography/YYYY-MM-DD-my-trip-title.md` with gallery markup

### Example Workflow

1. **Create image folder:**
   ```bash
   mkdir images/2026-02-Kerala
   ```

2. **Copy images** from phone/camera to folder

3. **Create ImageCaptions.csv** with your captions and timestamps

4. **Run the script:**
   ```bash
   python3 scripts/create_photo_album.py images/2026-02-Kerala "Kerala Backwaters" --location "Kerala, India"
   ```

5. **Commit and push:**
   ```bash
   git add images/2026-02-Kerala _photography/
   git commit -m "Add Kerala trip photo album"
   git push
   ```

6. **Delete CSV** (optional):
   ```bash
   rm images/2026-02-Kerala/ImageCaptions.csv
   ```

### Generated Markdown Structure

```markdown
---
layout: photo
title: "Kerala Backwaters"
date: 2026-02-15
location: Kerala, India
---

<div class="grid-item" data-caption="Houseboat morning">
  <img src="{{ site.baseurl }}/images/2026-02-Kerala/2026-02-15-08-30-Houseboat morning.jpeg" alt="Houseboat morning">
</div>

<div class="grid-item" data-caption="Breakfast on deck">
  <img src="{{ site.baseurl }}/images/2026-02-Kerala/2026-02-15-09-00-Breakfast on deck.jpeg" alt="Breakfast on deck">
</div>
```

### Tips

- **Captions:** Keep them short but descriptive (max 80 chars used in filename)
- **Datetime:** Include time for proper chronological sorting
- **Image quality:** Script uses quality=80 which is visually identical but much smaller
- **Filename characters:** Avoid `< > : " / \ | ? *` in captions
