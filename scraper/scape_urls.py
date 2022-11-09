from recipe_scrapers import scrape_me

# entry point
scraper = scrape_me('https://www.allrecipes.com/recipe/158968/spinach-and-feta-turkey-burgers/')

url_set = set([])
black_list = set([])

def search(node):
    if (node):
        url_set.add(node)

        links = scraper.links()
        for i in range(len(links)):
            link = links[i]["href"]
            if link[:35] == "https://www.allrecipes.com/recipes/":
                search(scrape_me(``))


print(scraper.title())
scraper.total_time()
scraper.yields()
print(scraper.ingredients())
print(scraper.instructions())  # or alternatively for results as a Python list: scraper.instructions_list()
print(scraper.image())
scraper.host()

links = scraper.links()

for i in range(len(links)):
    link = links[i]["href"]
    if link[:35] == "https://www.allrecipes.com/recipes/":
        print(link)

scraper.nutrients()  # if available
