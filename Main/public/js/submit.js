const submitPost = async (event) => {
    console.log('Somebody clicked the submit poem button');
  
    event.preventDefault();
  
    const text_input = document.querySelector('#post').value.trim();
  
    if (text_input) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ text_input }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert('Failed to write post. Try again.');
      }
    }
  };
  
  document
    .querySelector('#write-post')
    .addEventListener('submit', submitPost);