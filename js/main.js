const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

toolbar.addEventListener('click', e => {
  if (e.target.id === 'clear') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});

toolbar.addEventListener('change', e => {
  if (e.target.id === 'stroke') {
    ctx.strokeStyle = e.target.value;
  }

  if (e.target.id === 'lineWidth') {
    lineWidth = e.target.value;
  }

});

// canvas.toDataURL

// Mouse
canvas.addEventListener('mousedown', (e) => {
  isPainting = true;
  startX = e.clientX;
  startY = e.clientY;
});
canvas.addEventListener('mouseup', e => {
  isPainting = false;
  ctx.stroke();
  ctx.beginPath();
});
canvas.addEventListener('mousemove', e => {
  if (!isPainting) {
    return;
  }
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
  ctx.stroke();
});

// Touch
canvas.addEventListener('touchstart', (e) => {
  isPainting = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});
canvas.addEventListener('touchend', e => {
  isPainting = false;
  ctx.stroke();
  ctx.beginPath();
});
canvas.addEventListener('touchmove', e => {
  if (!isPainting) {
    return;
  }
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineTo(e.touches[0].clientX - canvasOffsetX, e.touches[0].clientY);
  ctx.stroke();
});

