const canvas = document.getElementById('doughnutCanvas');
const context = canvas.getContext('2d');
const toggleBtn = document.getElementById('toggleBtn');

// Canvas and doughnut size configuration
const CANVAS_COLS = 80;
const CANVAS_ROWS = 22;
const CHAR_WIDTH = 16;   // Try 12-16 for larger, 8-10 for smaller
const CHAR_HEIGHT = 16;

canvas.width = CANVAS_COLS * CHAR_WIDTH;
canvas.height = CANVAS_ROWS * CHAR_HEIGHT;

// Center offset for drawing
const X_OFFSET = Math.floor((canvas.width - CANVAS_COLS * CHAR_WIDTH) / 2);
const Y_OFFSET = Math.floor((canvas.height - CANVAS_ROWS * CHAR_HEIGHT) / 2);

let A = 0;
let B = 0;
let running = false;
let frameId = null;

function draw() {
    const z = new Array(CANVAS_COLS * CANVAS_ROWS).fill(0);
    const b = new Array(CANVAS_COLS * CANVAS_ROWS).fill(' ');

    for (let j = 0; j < 628; j += 7) {
        for (let i = 0; i < 628; i += 2) {
            const c = Math.sin(i / 100);
            const d = Math.cos(j / 100);
            const e = Math.sin(A);
            const f = Math.sin(j / 100);
            const g = Math.cos(A);
            const h = d + 2;
            const D = 1 / (c * h * e + f * g + 5);
            const l = Math.cos(i / 100);
            const m = Math.cos(B);
            const n = Math.sin(B);
            const t = c * h * g - f * e;
            const x = Math.floor(40 + 30 * D * (l * h * m - t * n));
            const y = Math.floor(12 + 15 * D * (l * h * n + t * m));
            const o = Math.floor(x + CANVAS_COLS * y);
            const N = Math.floor(8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n));

            if (0 <= y && y < CANVAS_ROWS && 0 <= x && x < CANVAS_COLS && 0 < o && o < CANVAS_COLS * CANVAS_ROWS && D > z[o]) {
                z[o] = D;
                b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
            }
        }
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = `${CHAR_HEIGHT}px monospace`;

    for (let i = 0; i < CANVAS_COLS * CANVAS_ROWS; i++) {
        const char = b[i];
        const x = i % CANVAS_COLS;
        const y = Math.floor(i / CANVAS_COLS);

        // Set color based on character
        if (char === '@') {
            context.fillStyle = '#fff'; // white
        } else if (char === '#' || char === '$') {
            context.fillStyle = '#ff69b4'; // pink
        } else if (char !== ' ') {
            context.fillStyle = '#deb887'; // light brown (burlywood)
        } else {
            continue; // skip drawing spaces
        }

        context.fillText(char, x * CHAR_WIDTH, y * CHAR_HEIGHT);
    }

    A += 0.04;
    B += 0.02;

    if (running) {
        frameId = requestAnimationFrame(draw);
    }
}

toggleBtn.onclick = function() {
    running = !running;
    toggleBtn.textContent = running ? 'Stop' : 'Start';
    if (running) {
        draw();
    } else if (frameId) {
        cancelAnimationFrame(frameId);
    }
};

context.clearRect(0, 0, canvas.width, canvas.height);