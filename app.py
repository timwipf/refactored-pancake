import math
import time
import sys

A = 0
B = 0

print('\033[2J', end='')  # Clear screen
print('\033[?25l', end='')  # Hide cursor

try:
    while True:
        z = [0] * 1760
        b = [' '] * 1760
        print('\033[H', end='')  # Move cursor to top-left
        for j in range(0, 628, 7):  # 0 to 2pi, step ~0.11
            for i in range(0, 628, 2):  # 0 to 2pi, step ~0.03
                c = math.sin(i / 100)
                d = math.cos(j / 100)
                e = math.sin(A)
                f = math.sin(j / 100)
                g = math.cos(A)
                h = d + 2
                D = 1 / (c * h * e + f * g + 5)
                l = math.cos(i / 100)
                m = math.cos(B)
                n = math.sin(B)
                t = c * h * g - f * e
                x = int(40 + 30 * D * (l * h * m - t * n))
                y = int(12 + 15 * D * (l * h * n + t * m))
                o = int(x + 80 * y)
                N = int(8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n))
                if 0 <= y < 22 and 0 <= x < 80 and 0 < o < 1760 and D > z[o]:
                    z[o] = D
                    b[o] = ".,-~:;=!*#$@"[N if N > 0 else 0]
        print(''.join(b[i] + ('\n' if i % 80 == 79 else '') for i in range(1760)), end='', flush=True)
        A += 0.04
        B += 0.02
        time.sleep(0.01)
finally:
    print('\033[?25h', end='')  # Show cursor again
