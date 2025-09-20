const scriptURL =
  'https://script.google.com/macros/s/AKfycbynGKa_GeeKVQymMZMjphYMxSQJW2loGhxqQ-0PtQG5jxZIbak1uoAhUGTK-G9BWk-F2g/exec'; // Dán link Web App từ bước 2

document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btnSubmit = document.querySelector('.btn-submit');
  btnSubmit.disabled = true;
  const form = document.getElementById('userForm');
  const status = document.getElementById('status');

  const data = {
    name: document.getElementById('name').value,
    relationship: document.getElementById('relationship').value,
    message: document.getElementById('message').value,
    accept: document.getElementById('accept').value
  };

  try {
    const isLocal =
      window.location.hostname === 'localhost' ||
      window.location.protocol === 'http:';

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    if (isLocal) {
      options.mode = 'no-cors';
    }

    const res = await fetch(scriptURL, options);

    if (!isLocal) {
      const result = await res.json();
      if (result.result === 'success') {
        const wrap = document.getElementById('heart-wrap');
        const fallHearts = HeartAnimator(wrap, { effect: 'fall' });
        fallHearts.trigger(true);
        btnSubmit.disabled = false;
        form.reset();
      } else {
        status.textContent = 'Vui lòng thử lại sau!';
        btnSubmit.disabled = false;
        setTimeout(() => {
          status.textContent = '';
        }, 3000);
      }
    } else {
      const wrap = document.getElementById('heart-wrap');
      const fallHearts = HeartAnimator(wrap, { effect: 'fall' });
      fallHearts.trigger(true);
      form.reset();
      btnSubmit.disabled = false;
      setTimeout(() => {
        status.textContent = '';
      }, 3000);
    }
  } catch (err) {
    console.error(err);
    status.textContent = 'Vui lòng thử lại sau!';
    btnSubmit.disabled = false;
  }
});
