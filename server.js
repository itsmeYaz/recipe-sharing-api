// Import necessary modules
const express = require("express");
const app = express();
const Joi = require("joi");

// Import recipe data
const { recipesData } = require("./src/data.js");

// Middleware to parse JSON bodies
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the root route of the API.");
});

// Route to get all recipes
app.get("/api/recipes", (req, res) => {
  res.send(recipesData);
});

// Route to get a specific recipe by ID
app.get("/api/recipes/:id", (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
  });

  const { error } = schema.validate(req.params);
  if (error) return res.status(400).send(error.details[0].message);

  // Find recipe by ID
  const ID = req.params.id;
  const recipe = recipesData.find((c) => c.id === parseInt(ID));
  if (!recipe) return res.status(404).send({ message: "Recipe not found." });
  res.send(recipe);
});

// Route to get recipes by name
app.get("/api/recipes/name/:name", (req, res) => {
  // Create regex from name
  const name = req.params.name.replace(/\s/g, "");
  const regex = new RegExp(name.split("").join("\\s*"), "i");

  // Find recipes by name
  const recipes = recipesData.filter((c) => regex.test(c.name));

  if (recipes.length === 0)
    return res
      .status(404)
      .send({ message: "No recipes found with the given name." });
  res.send(recipes);
});

// Route to get recipes by tag
app.get("/api/recipes/tag/:tag", (req, res) => {
  // Create regex from tag
  const tag = req.params.tag.replace(/\s/g, "");
  const regex = new RegExp("^" + tag.split("").join("\\s*") + "$", "i");

  // Find recipes by tag
  const recipes = recipesData.filter((c) => c.tag.some((t) => regex.test(t)));

  if (recipes.length === 0)
    return res
      .status(404)
      .send({ message: "No recipes found with the given tag." });
  res.send(recipes);
});

// Route to create a new recipe
app.post("/api/recipes", (req, res) => {
  // Validate recipe data
  const schema = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    steps: Joi.array().items(Joi.string()).required(),
    tag: Joi.array().items(Joi.string()).optional(), // tag is now an array
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create new recipe
  const newRecipe = {
    id: recipesData.length + 1,
    name: req.body.name,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    tag: req.body.tag || [], // if tag is not provided, default to an empty array
  };

  recipesData.push(newRecipe);
  res.send(newRecipe);
});

// Route to update a recipe
app.put("/api/recipes/:id", (req, res) => {
  // Find recipe by ID
  const ID = parseInt(req.params.id);
  const recipe = recipesData.find((c) => c.id === ID);
  if (!recipe) return res.status(404).send({ message: "Recipe not found." });

  // Validate recipe data
  const schema = Joi.object({
    id: Joi.number().integer(),
    name: Joi.string(),
    ingredients: Joi.array().items(Joi.string()),
    steps: Joi.array().items(Joi.string()),
    tag: Joi.array().items(Joi.string()),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Merge the existing recipe with the new data from req.body
  Object.assign(recipe, req.body);

  res.send(recipe);
});

// Route to delete a recipe
app.delete("/api/recipes/:id", (req, res) => {
  // Find recipe by ID
  const ID = parseInt(req.params.id);
  const recipe = recipesData.find((c) => c.id === ID);
  if (!recipe) return res.status(404).send({ message: "Recipe not found." });

  // Remove recipe from array
  const index = recipesData.indexOf(recipe);
  recipesData.splice(index, 1);

  res.send(recipe);
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on http://localhost:${port}...`));
