const box = document.getElementById('datetime');

function updateTime() {
    const now = new Date();
    const text = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',      // 'long' даст "October"
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
    });
box.textContent = text.replace(' at', ',');}

if (box) {
    updateTime();
    setInterval(updateTime, 1000);  // сколько миллисекунд в секунде?
}
