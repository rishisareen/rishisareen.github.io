// main.js - index page logic
document.getElementById('newBtn').onclick = ()=> location.href='editor.html';
document.getElementById('llmBtn').onclick = ()=> location.href='llm.html';
const listEl = document.getElementById('list');
const status = document.getElementById('status');
const search = document.getElementById('search');

async function renderList(){
  status.textContent = 'Loading recipes...';
  try{
    const items = await listRecipes();
    status.textContent = '';
    window._recipes = items;
    display(items);
  }catch(err){
    status.textContent = 'Error: ' + err.message;
  }
}

function display(items){
  listEl.innerHTML = '';
  const q = search.value.trim().toLowerCase();
  items.filter(it => {
    if(!q) return true;
    return it.name.toLowerCase().includes(q) || it.name.toLowerCase().replace('.md','').includes(q);
  }).forEach(it=>{
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = it.name.replace(/\.md$/,'');
    a.href = 'recipe.html?file=' + encodeURIComponent(it.name);
    li.appendChild(a);
    const meta = document.createElement('div');
    meta.className='meta';
    const edit = document.createElement('button');
    edit.textContent = 'Edit';
    edit.onclick = (e)=> { e.preventDefault(); location.href='editor.html?file='+encodeURIComponent(it.name); }
    meta.appendChild(edit);
    li.appendChild(meta);
    listEl.appendChild(li);
  });
}

search.addEventListener('input', ()=> display(window._recipes || []));
renderList();
