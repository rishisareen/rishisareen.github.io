// github.js - handles GitHub API operations (HARDCODED CREDENTIALS)
// WARNING: Token is hardcoded here. This gives anyone who can view this site or repo access to commit to your repo.
// Use with caution.
const GITHUB = {
  username: 'rishisareen',
  repo: 'rishisareen.github.io',
  branch: 'main',
  token: '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',
  apiBase: 'https://api.github.com'
};

function authHeaders(){
  return {
    'Authorization': 'token ' + GITHUB.token,
    'Accept': 'application/vnd.github.v3+json'
  };
}

// List files under /recipes/
async function listRecipes(){
  const url = GITHUB.apiBase + '/repos/' + GITHUB.username + '/' + GITHUB.repo + '/contents/recipes';
  const res = await fetch(url, { headers: authHeaders() });
  if(!res.ok) throw new Error('List failed: ' + res.status + ' ' + await res.text());
  const data = await res.json();
  // Filter md files and sort by name
  return data.filter(f=>f.type==='file' && f.name.endsWith('.md')).map(f=>({name:f.name, path:f.path, sha:f.sha, url:f.download_url}));
}

// Get raw markdown content for a file (via raw.githubusercontent)
async function fetchRawRecipe(filename){
  const raw = 'https://raw.githubusercontent.com/' + GITHUB.username + '/' + GITHUB.repo + '/' + GITHUB.branch + '/recipes/' + filename;
  const res = await fetch(raw);
  if(!res.ok) throw new Error('Fetch raw failed: ' + res.status);
  return await res.text();
}

// Get file metadata (to obtain sha) via contents API
async function getFileMeta(filename){
  const url = GITHUB.apiBase + '/repos/' + GITHUB.username + '/' + GITHUB.repo + '/contents/recipes/' + filename;
  const res = await fetch(url, { headers: authHeaders() });
  if(res.status===404) return null;
  if(!res.ok) throw new Error('Get meta failed: ' + res.status + ' ' + await res.text());
  return await res.json(); // contains sha
}

// Save (create or update) markdown file under recipes/
async function saveRecipe(filename, contentMarkdown, commitMessage){
  // contentMarkdown -> base64
  const b64 = btoa(unescape(encodeURIComponent(contentMarkdown)));
  const meta = await getFileMeta(filename);
  const body = {
    message: commitMessage || ('Add recipe: ' + filename),
    content: b64,
    branch: GITHUB.branch
  };
  if(meta && meta.sha) body.sha = meta.sha; // update
  const url = GITHUB.apiBase + '/repos/' + GITHUB.username + '/' + GITHUB.repo + '/contents/recipes/' + filename;
  const res = await fetch(url, {
    method: 'PUT',
    headers: Object.assign({'Content-Type':'application/json'}, authHeaders()),
    body: JSON.stringify(body)
  });
  if(!res.ok) {
    const txt = await res.text();
    throw new Error('Save failed: ' + res.status + ' ' + txt);
  }
  return await res.json();
}

export { listRecipes, fetchRawRecipe, saveRecipe, getFileMeta };
