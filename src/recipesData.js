/**
 * This module exports an array of recipe objects.
 * Each recipe object has the following properties:
 * - id: a unique identifier for the recipe
 * - name: the name of the recipe
 * - ingredients: an array of strings, each representing an ingredient needed for the recipe
 * - steps: an array of strings, each representing a step in the recipe
 * - tag: an array of strings, each representing a category or tag associated with the recipe
 */

const recipes = [
  {
    id: 1,
    name: "Sinigang",
    ingredients: [
      "Meat (pork, beef, shrimp, fish, or any preferred protein)",
      "Tamarind (fresh or powdered), or other souring agents like calamansi, green mango, or kamias",
      "Vegetables (kangkong/water spinach, radish, eggplant, okra, tomatoes)",
      "Onions",
      "Garlic",
      "Salt",
      "Pepper",
      "Water",
    ],
    steps: [
      "1. In a large pot, sauté onions and garlic until fragrant.",
      "2. Add the meat and cook until lightly browned.",
      "3. Pour in enough water to cover the meat and bring to a boil.",
      "4. Once boiling, lower the heat to a simmer and let it cook until the meat is tender.",
      "5. Add the tamarind (or other souring agents) to the pot and simmer for a few minutes to extract the sour flavor.",
      "6. Add the vegetables starting with the ones that take longer to cook (e.g., radish, eggplant) and simmer until tender.",
      "7. Season with salt and pepper to taste.",
      "8. Serve hot and enjoy!",
    ],
    tag: ["Lunch"],
  },
  {
    id: 2,
    name: "Adobo",
    ingredients: [
      "Meat (chicken, pork, or combination)",
      "Soy sauce",
      "Vinegar",
      "Garlic",
      "Bay leaves",
      "Peppercorns",
      "Water",
      "Oil (optional, for frying)",
    ],
    steps: [
      "1. In a pot or pan, combine the meat, soy sauce, vinegar, garlic, bay leaves, and peppercorns.",
      "2. Let it marinate for at least 30 minutes to absorb the flavors.",
      "3. Add water until the meat is just covered.",
      "4. Bring to a boil, then reduce the heat and simmer until the meat is tender and the sauce is reduced and thickened, about 30-45 minutes.",
      "5. Optional: For a crispier texture, you can fry the cooked meat in oil until golden brown.",
      "6. Serve hot with rice and enjoy!",
    ],
    tag: ["Lunch"],
  },
  {
    id: 3,
    name: "Burger",
    ingredients: [
      "Ground beef or alternative (e.g., turkey, chicken, or plant-based substitute)",
      "Burger buns",
      "Lettuce leaves",
      "Sliced tomatoes",
      "Sliced onions",
      "Cheese slices",
      "Salt",
      "Black pepper",
      "Optional: condiments such as ketchup, mustard, mayonnaise",
    ],
    steps: [
      "1. Season the ground beef with salt and pepper, and mix well.",
      "2. Divide the seasoned beef into equal portions and shape them into patties.",
      "3. Preheat a grill or a pan over medium-high heat.",
      "4. Cook the burger patties for about 4-5 minutes on each side, or until they reach your desired level of doneness.",
      "5. Toast the burger buns on the grill or in a toaster until lightly browned.",
      "6. Assemble the burgers by placing lettuce leaves, tomato slices, onion slices, and cheese slices on the bottom half of each bun.",
      "7. Add the cooked burger patties on top of the cheese.",
      "8. Spread condiments of your choice on the top half of the buns.",
      "9. Close the burgers with the top half of the buns, and serve immediately.",
    ],
    tag: ["Lunch"],
  },
  {
    id: 4,
    name: "Kare-Kare",
    ingredients: [
      "1 kilo oxtail, cut into 2-inch lengths",
      "1/2 kilo beef tripe, cleaned and cut into bite-sized pieces",
      "3 tablespoons cooking oil",
      "4 cloves garlic, minced",
      "1 onion, chopped",
      "4 tablespoons peanut butter",
      "1 cup ground toasted rice",
      "6 cups water",
      "1 bundle string beans (sitaw), cut into 2-inch lengths",
      "1 large eggplant, sliced",
      "1 banana blossom (puso ng saging), sliced",
      "Salt and pepper to taste",
      "Bagoong (shrimp paste), for serving",
    ],
    steps: [
      "1. In a large pot, heat the cooking oil over medium heat. Sauté the garlic and onion until fragrant.",
      "2. Add the oxtail and beef tripe. Cook until browned.",
      "3. Pour in the water and bring to a boil. Simmer until the meat is tender, about 2-3 hours.",
      "4. Add the peanut butter and ground toasted rice. Stir until well combined.",
      "5. Add the string beans, eggplant, and banana blossom. Cook until the vegetables are tender.",
      "6. Season with salt and pepper to taste.",
      "7. Serve hot with bagoong on the side.",
    ],
    tag: ["Lunch", "Dinner"],
  },
  {
    id: 5,
    name: "Lechon Kawali",
    ingredients: [
      "1 kilo pork belly, skin-on",
      "4 cloves garlic, crushed",
      "3 bay leaves",
      "1 tablespoon peppercorns",
      "Salt",
      "Water",
      "Cooking oil, for deep frying",
    ],
    steps: [
      "1. In a large pot, place the pork belly along with the garlic, bay leaves, peppercorns, and a generous amount of salt.",
      "2. Cover the pork belly with water and bring to a boil. Reduce the heat and let it simmer until the meat is tender, about 1 to 1.5 hours.",
      "3. Remove the pork belly from the pot and let it cool. Once cooled, pat the skin dry with paper towels.",
      "4. Heat cooking oil in a deep frying pan or pot over medium heat. Carefully add the pork belly, skin-side down, and fry until the skin is crispy and golden brown, about 8-10 minutes.",
      "5. Remove the pork belly from the oil and let it drain on a wire rack or paper towels.",
      "6. Slice the lechon kawali into serving portions and serve hot with a dipping sauce of vinegar, soy sauce, and chopped onions.",
    ],
    tag: ["Lunch"],
  },
];

module.exports = { recipes };
