// llm.js - uses fetch to call OpenAI (or compatible). User provides OpenAI key in input.
const openaiKeyInput = document.getElementById('openaiKey');
const promptEl = document.getElementById('prompt');
const generated = document.getElementById('generated');
const preview = document.getElementById('preview');
const status = document.getElementById('status');

document.getElementById('back').onclick = ()=> location.href='index.html';
document.getElementById('generate').onclick = async ()=>{
  const key = openaiKeyInput.value.trim();
  const prompt = promptEl.value.trim();
  if(!key) return alert('Enter OpenAI API key (sk-...)');
  if(!prompt) return alert('Enter prompt for recipe generation.');
  status.textContent = 'Generating...';
  try{
    // simple call to OpenAI chat completions
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + key
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{role:'user', content: prompt + "\n\nRespond ONLY in Markdown for a recipe. Include a title as H1."}],
        max_tokens: 800
      })
    });
    if(!resp.ok) {
      const txt = await resp.text();
      throw new Error('LLM call failed: ' + resp.status + ' ' + txt);
    }
    const j = await resp.json();
    let text = '';
    if(j.choices && j.choices.length) {
      if(j.choices[0].message) text = j.choices[0].message.content;
      else if(j.choices[0].text) text = j.choices[0].text;
    }
    if(!text) throw new Error('No text returned from LLM');
    generated.value = text;
    preview.innerHTML = marked.parse(text);
    status.textContent = 'Generated — you can open in editor.';
    localStorage.setItem('openai_key', key);
  }catch(err){
    status.textContent = 'Error: ' + err.message;
  }
};

document.getElementById('openEditor').onclick = ()=>{
  sessionStorage.setItem('llm_generated_md', generated.value || '');
  location.href = 'editor.html';
};
