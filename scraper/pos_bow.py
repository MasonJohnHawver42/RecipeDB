import spacy
import numpy as np
import pickle

sp = spacy.load('en_core_web_sm')

language = set([])
documents = []
i = 0

with open("phrases.txt") as fr:
    while True:
        line = fr.readline()
        if not line: break
        print(i, line.strip())
        doc = sp(line.strip())
        cnt = doc.count_by(spacy.attrs.TAG)
        language.update(cnt.keys())
        documents.append(cnt)
        i += 1

language = dict((id, i) for i, id in enumerate(language))
vectors = np.zeros((len(documents), len(language)))

for j, doc in enumerate(documents):
    print(j, doc)
    for k, v in doc.items():
        vectors[j][language[k]] = v

print(len(language), language)

with open("tag_vects.bn", "wb") as f:
    pickle.dump((language, vectors), f)
