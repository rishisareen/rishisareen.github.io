// GitHub API configuration
const GITHUB_CONFIG = {
    username: 'rishi.sareen',
    repo: 'rishisareen.github.io',
    token: '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',
    branch: 'main'
};

class GitHubAPI {
    static async makeRequest(url, options = {}) {
        const headers = {
            'Authorization': `token ${GITHUB_CONFIG.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            ...options.headers
        };

        const response = await fetch(url, {
            ...options,
            headers
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`GitHub API error: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`);
        }

        return response.json();
    }

    static async listRecipes() {
        try {
            const url = `https://api.github.com/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/contents/recipes`;
            const files = await this.makeRequest(url);
            
            // Filter for markdown files and extract titles
            const recipes = [];
            for (const file of files) {
                if (file.name.endsWith('.md') && file.type === 'file') {
                    const title = this.extractTitleFromFilename(file.name);
                    recipes.push({
                        filename: file.name,
                        title: title,
                        sha: file.sha,
                        downloadUrl: file.download_url
                    });
                }
            }
            
            return recipes.sort((a, b) => a.title.localeCompare(b.title));
        } catch (error) {
            if (error.message.includes('404')) {
                // Recipes folder doesn't exist yet
                return [];
            }
            throw error;
        }
    }

    static async getRecipe(filename) {
        const url = `https://raw.githubusercontent.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/recipes/${filename}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch recipe: ${response.status} ${response.statusText}`);
        }
        
        return response.text();
    }

    static async saveRecipe(filename, content, message = null) {
        const url = `https://api.github.com/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/contents/recipes/${filename}`;
        
        // First, try to get the existing file to get its SHA
        let sha = null;
        try {
            const existingFile = await this.makeRequest(url);
            sha = existingFile.sha;
        } catch (error) {
            // File doesn't exist, which is fine for new files
            if (!error.message.includes('404')) {
                throw error;
            }
        }

        const body = {
            message: message || `${sha ? 'Update' : 'Add'} recipe: ${this.extractTitleFromFilename(filename)}`,
            content: btoa(unescape(encodeURIComponent(content))), // Base64 encode with proper UTF-8 handling
            branch: GITHUB_CONFIG.branch
        };

        if (sha) {
            body.sha = sha;
        }

        return this.makeRequest(url, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }

    static async deleteRecipe(filename) {
        const url = `https://api.github.com/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/contents/recipes/${filename}`;
        
        // Get the file's SHA first
        const existingFile = await this.makeRequest(url);
        
        const body = {
            message: `Delete recipe: ${this.extractTitleFromFilename(filename)}`,
            sha: existingFile.sha,
            branch: GITHUB_CONFIG.branch
        };

        return this.makeRequest(url, {
            method: 'DELETE',
            body: JSON.stringify(body)
        });
    }

    static extractTitleFromFilename(filename) {
        // Remove .md extension and replace hyphens/underscores with spaces
        return filename
            .replace(/\.md$/, '')
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }

    static sanitizeFilename(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .replace(/^-+|-+$/g, '') + '.md';
    }

    static extractTitleFromContent(content) {
        // Try to extract title from first heading
        const lines = content.split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('# ')) {
                return trimmed.substring(2).trim();
            }
        }
        return null;
    }
}
