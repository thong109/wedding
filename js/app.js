const scriptURL =
  'https://script.google.com/macros/s/AKfycbzWlqu74djrhX7tXqmkaD0n6S13iCua4vpRdIT_mscudVGk-5XveEHJ3sYH1QW6RCLHkg/exec'; // Dán link Web App từ bước 2

document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const status = document.getElementById('status');

  const data = {
    name: document.getElementById('name').value,
    relationship: document.getElementById('relationship').value,
    message: document.getElementById('message').value
  };

  try {
    await fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors', // localhost tránh CORS
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    status.textContent = '✅ Đã gửi dữ liệu!';
    e.target.reset();
  } catch (err) {
    console.error(err);
    status.textContent = '❌ Lỗi gửi dữ liệu!';
  }
});
