import '../node_modules/tesseract.js/dist/tesseract.min.js'

const ocr = () => {
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
    if (e.target.id === 'to-text') {
      const image = canvas.toDataURL;
      (async () => {
        const worker = await Tesseract.createWorker('eng');
        // const ret = await worker.recognize(image);
        const ret = await worker.recognize(canvas);
        console.log(ret.data.text);
        await worker.terminate();
      })();
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

  // Mouse
  canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
  });
  canvas.addEventListener('mouseup', () => {
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
  canvas.addEventListener('touchend', () => {
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
};

export { ocr }
