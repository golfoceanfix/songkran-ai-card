async function generatePoem() {
  const name = document.getElementById('girlName').value.trim();
  if (!name) return alert("กรุณาใส่ชื่อสาวก่อนน้าา~ 💦");

  document.getElementById('loader').style.display = 'block';
  const card = document.getElementById('card');
  card.style.display = 'none';
  card.classList.remove('show');

  document.getElementById('name').innerText = name;

  const res = await fetch('/api/poem', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });

  const data = await res.json();
  document.getElementById('poem').innerText = data.poem;

  document.getElementById('loader').style.display = 'none';
  card.style.display = 'block';

  setTimeout(() => {
    card.classList.add('show');
  }, 50);
}

document.getElementById('saveCard')?.addEventListener('click', () => {
  const card = document.querySelector(".card");
  const btn = document.getElementById("saveCard");

  btn.style.visibility = "hidden";

  setTimeout(() => {
    html2canvas(card, {
      scale: 3,
      useCORS: true,
      backgroundColor: null
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'songkran-card.png';
      link.href = canvas.toDataURL("image/png");
      link.click();
      btn.style.visibility = "visible";
    });
  }, 100);
});