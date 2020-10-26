import cmath


def fft_bluestein(x, is_inverse):
    n = len(x)
    if n == 0:
        return []
    m = 2 ** (n * 2).bit_length()
    coeff = (1 if is_inverse else -1) * cmath.pi / n
    exp_table = [cmath.rect(1, (i * i % (n * 2)) * coeff) for i in range(n)]
    a = [(x * y) for (x, y) in zip(x, exp_table)] + [0] * (m - n)
    b = exp_table[:n] + [0] * (m - (n * 2 - 1)) + exp_table[:0:-1]
    b = [x.conjugate() for x in b]
    c = convolve_power2(a, b)[:n]
    return [(x * y) for (x, y) in zip(c, exp_table)]


def convolve_power2(x, y):
    assert len(x) == len(y)
    n = len(x)
    x = fft_power2(x, False)
    y = fft_power2(y, False)
    for i in range(n):
        x[i] *= y[i]
    x = fft_power2(x, True)
    return [(v / n) for v in x]


def fft_power2(x, is_inverse):
    def reverse_bits(v, width):
        result = 0
        for _ in range(width):
            result = (result << 1) | (v & 1)
            v >>= 1
        return result
    n = len(x)
    levels = n.bit_length() - 1
    if 2**levels != n:
        raise ValueError("Length is not a power of 2")
    coeff = (2 if is_inverse else -2) * cmath.pi / n
    exp_table = [cmath.rect(1, i * coeff) for i in range(n // 2)]
    x = [x[reverse_bits(i, levels)] for i in range(n)]
    size = 2
    while size <= n:
        half_size = size // 2
        table_step = n // size
        for i in range(0, n, size):
            k = 0
            for j in range(i, i + half_size):
                tmp = x[j + half_size] * exp_table[k]
                x[j + half_size] = x[j] - tmp
                x[j] += tmp
                k += table_step
        size *= 2
    return x
