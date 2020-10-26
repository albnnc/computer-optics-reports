# Постановка задачи

Для случайной матрицы 2х3 построить fft2, по одной оси взять стандартное fft (возможно, "встроенное"), по другой — методом Блюстейна. Взять обратное преобразование и сравнить с оригиналом.

# Решение

Решение представлено в файлах `calc.py` и `bluestain.py`.

# Вывод программы

```
Original matrix:
[[0.92 0.61 0.22]
 [0.56 0.81 0.97]]

Reference FFT result:
[[ 4.09+0.j    0.17-0.2j   0.17+0.2j ]
 [-0.59+0.j    0.83-0.47j  0.83+0.47j]]

Handmade FFT result:
[[ 4.09+0.00e+00j  0.17-1.97e-01j  0.17+1.97e-01j]
 [-0.59-2.11e-16j  0.83-4.75e-01j  0.83+4.75e-01j]]

Are reference and handmade FFTs close to be the same?
Yes

Handmade recreated matrix:
[[0.92-3.05e-17j 0.61-4.14e-17j 0.22-3.34e-17j]
 [0.56+2.75e-18j 0.81+4.73e-17j 0.97+5.53e-17j]]

Are original and handmade original close to be the same?
Yes
```
