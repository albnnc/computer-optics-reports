import copy
import math
import numpy as np
from bluestain import fft_bluestein

original = np.random.rand(2, 3)

reference = np.fft.fft2(original)

handmade = np.array([np.fft.fft(x) for x in original])
handmade = handmade.transpose()
handmade = np.array([fft_bluestein(x, False) for x in handmade])
handmade = handmade.transpose()

handmade_original = np.fft.ifft2(handmade)

np.set_printoptions(precision=2)
print('Original matrix:')
print(original)
print()
print('Reference FFT result:')
print(reference)
print()
print('Handmade FFT result:')
print(handmade)
print()
print('Are reference and handmade FFTs close to be the same?')
print('Yes' if np.allclose(original, handmade_original) else 'No')
print()
print('Handmade recreated matrix:')
print(handmade_original)
print()
print('Are original and handmade original close to be the same?')
print('Yes' if np.allclose(original, handmade_original) else 'No')
