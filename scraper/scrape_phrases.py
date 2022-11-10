from recipe_scrapers import scrape_me

i = 0

with open("urls.txt") as fr:
    fw = open("phrases.txt", "w")
    while True:
        line = fr.readline()
        if not line: break
        print(i, line.strip())
        data = scrape_me(line.strip())
        for ing in data.ingredients():
            fw.write(ing + "\n")
        i += 1

    fw.close()
