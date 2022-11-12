# import spacy
import numpy as np
import random
import pickle

# sp = spacy.load('en_core_web_sm')

language = set([])
bow_vectors = np.zeros((0, 0))
i = 0

with open("tag_vects.bn", "rb") as f: # "rb" because we want to read in binary mode
    (language, bow_vectors) = pickle.load(f)

# with open("phrases.txt") as fr:
#     lines = fr.readlines()
#     doc = sp(lines[100].strip())
#     print()
#     print(lines[100].strip())
#     print(vectors[100])
#     print(doc.count_by(spacy.attrs.TAG))
#     for word in doc:
#         print(word, word.tag_, word.tag)

from numpy import array
from numpy import mean
from numpy import cov
from numpy.linalg import eig

rows_id = random.sample(range(0, bow_vectors.shape[0]), 500)
A = bow_vectors[rows_id, :]
M = mean(A.T, axis=1)
C = A - M
V = cov(C.T)
values, vectors = eig(V)

P = vectors.T.dot(C.T)
print(P.T, P.T.shape, A.shape)
