from ai.principle_mapper import map_principle


review = (
    "The navigation menu is confusing and "
    "important options are difficult to locate"
)

result = map_principle(review)

print(result)