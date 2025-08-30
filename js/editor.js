// editor.js
const params = new URLSearchParams(location.search);
const fileParam = params.get('file');
const mdEl = document.getElementById('md');
const preview = document.getElementById('preview');
const filenameInput = document.getElementById('filename');
const titleInput = document.getElementById('title');
const status = document.getElementById('status');

document.getElementById('back').onclick = ()=> location.href = 'index.html';

mdEl.addEventListener('input', ()=> {
  preview.innerHTML = marked.parse(mdEl.value || '');
});

// load if editing existing file
async function loadIfExists(){
  if(!fileParam) {
    // check if LLM generated content exists in sessionStorage
    const generated = sessionStorage.getItem('llm_generated_md');
    if(generated){
      mdEl.value = generated;
      preview.innerHTML = marked.parse(generated);
      // remove from session
      sessionStorage.removeItem('llm_generated_md');
    }
    return;
  }
  filenameInput.value = fileParam;
  status.textContent = 'Loading...';
  try{
    const md = await fetchRawRecipe(fileParam);
    mdEl.value = md;
    preview.innerHTML = marked.parse(md);
    // try extract title
    const m = md.match(/^#\s*(.+)/m);
    if(m) titleInput.value = m[1];
    status.textContent = '';
  }catch(err){
    status.textContent = 'Error loading file: ' + err.message;
  }
}

document.getElementById('saveBtn').onclick = async ()=>{
  const filename = filenameInput.value.trim();
  if(!filename) return alert('Enter filename (e.g. my-recipe.md)');
  const content = mdEl.value;
  const title = titleInput.value.trim() || filename.replace(/\.md$/,'');
  const commitMsg = `Add/Update recipe: ${title}`;
  status.textContent = 'Saving...';
  try{
    await saveRecipe(filename, content, commitMsg);
    status.textContent = 'Saved successfully.';
    setTimeout(()=> location.href = 'index.html', 800);
  }catch(err){
    status.textContent = 'Save error: ' + err.message;
  }
};

loadIfExists();
