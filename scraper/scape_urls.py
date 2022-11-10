from recipe_scrapers import scrape_me
import pickle

url_set = set([])
leaf_set = set(['https://www.allrecipes.com/recipe/158968/spinach-and-feta-turkey-burgers/']) #to be explored
black_list = set([])

def load(fn):
    global url_set, leaf_set, black_list
    with open(fn, "rb") as f: # "rb" because we want to read in binary mode
        (url_set, leaf_set, black_list) = pickle.load(f)

def save(fn):
    global url_set, leaf_set, black_list
    with open(fn, "wb") as f:
        pickle.dump((url_set, leaf_set, black_list), f)

def make_txt(fn):
    global url_set, leaf_set, black_list

    f = open(fn, "w")
    for url in url_set:
        f.write(url + "\n")

    f.close()

def search():
    global url_set, leaf_set, black_list

    new_leafs = set([])
    for leaf in leaf_set:
        data = scrape_me(leaf)
        if data is not None:
            url_set.add(leaf)
            for a_tag in data.links():
                child_url = a_tag["href"]
                if child_url not in leaf_set and child_url not in url_set and child_url not in black_list and child_url[:34] == "https://www.allrecipes.com/recipe/":
                    new_leafs.add(child_url)
        else:
            black_list.add(leaf)

    return new_leafs

load("urls.bin")

print("Batch 0")
print("Searched:", len(url_set))
print("Explore:", len(leaf_set))

i = 0
while input("cont [y/n]").strip().lower() == "y":
    leaf_set = search()
    i += 1

    print("Batch", i)
    print("Searched:", len(url_set))
    print("Explore:", len(leaf_set))

print("Done")

save("urls.bin")
make_txt("urls.txt")

print(url_set)
