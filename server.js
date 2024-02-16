// Import necessary modules
const express = require("express");
const app = express();
const Joi = require("joi");

// Import recipe data
const { recipes } = require("./src/recipesData.js");
const { users } = require("./src/userData.js");

// Middleware to parse JSON bodies
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the root route of the API.");
});

// Route to get all recipes
app.get("/api/recipes", (req, res) => {
  res.send(recipes);
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
  const recipe = recipes.find((c) => c.id === parseInt(ID));
  if (!recipe) return res.status(404).send({ message: "Recipe not found." });
  res.send(recipe);
});

// Route to get recipes by name
app.get("/api/recipes/name/:name", (req, res) => {
  // Create regex from name
  const name = req.params.name.replace(/\s/g, "");
  const regex = new RegExp(name.split("").join("\\s*"), "i");

  // Find recipes by name
  const recipe = recipes.filter((c) => regex.test(c.name));

  if (recipe.length === 0)
    return res
      .status(404)
      .send({ message: "No recipes found with the given name." });
  res.send(recipe);
});

// Route to get recipes by tag
app.get("/api/recipes/tag/:tag", (req, res) => {
  // Create regex from tag
  const tag = req.params.tag.replace(/\s/g, "");
  const regex = new RegExp("^" + tag.split("").join("\\s*") + "$", "i");

  // Find recipes by tag
  const recipe = recipes.filter((c) => c.tag.some((t) => regex.test(t)));

  if (recipe.length === 0)
    return res
      .status(404)
      .send({ message: "No recipes found with the given tag." });
  res.send(recipe);
});

// Route to create a new recipe
app.post("/api/recipes", (req, res) => {
  // Validate recipe data
  const schema = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    steps: Joi.array().items(Joi.string()).required(),
    tag: Joi.array().items(Joi.string()).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create new recipe
  const newRecipe = {
    id: recipes.length + 1,
    name: req.body.name,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    tag: req.body.tag || [], // if tag is not provided, default to an empty array
  };

  recipes.push(newRecipe);
  res.send(newRecipe);
});

// Route to update a recipe
app.put("/api/recipes/:id", (req, res) => {
  // Find recipe by ID
  const ID = parseInt(req.params.id);
  const recipe = recipes.find((c) => c.id === ID);
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
  const oldRecipe = { ...recipe };
  Object.assign(recipe, req.body);

  // Find the changes
  const changes = {};
  for (const key in oldRecipe) {
    if (oldRecipe[key] !== recipe[key]) {
      changes[key] = {
        old: oldRecipe[key],
        new: recipe[key],
      };
    }
  }

  res.send({ message: "The recipe has been updated.", changes });
});

// Route to delete a recipe
app.delete("/api/recipes/:id", (req, res) => {
  // Find recipe by ID
  const ID = parseInt(req.params.id);
  const recipe = recipes.find((c) => c.id === ID);
  if (!recipe) return res.status(404).send({ message: "Recipe not found." });

  // Remove recipe from array
  const index = recipes.indexOf(recipe);
  recipes.splice(index, 1);

  res.send({
    message: `A recipe with ID ${ID} has been deleted.`,
  });
});

//USERS Route

/**
 * GET /api/users
 * Returns a list of all users.
 */
app.get("/api/users", (req, res) => {
  res.send(users);
});

/**
 * POST /api/users
 * Creates a new user.
 */
app.post("/api/users", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  users.push(user);
  res.send(user);
});

/**
 * PUT /api/users/:id
 * Updates an existing user.
 */
app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send({ message: "User not found." });

  const schema = Joi.object({
    name: Joi.string(),
    password: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const oldUser = { ...user };
  if (req.body.name) user.name = req.body.name;
  if (req.body.password) user.password = req.body.password;

  const changes = {};
  for (const key in oldUser) {
    if (oldUser[key] !== user[key]) {
      changes[key] = {
        old: oldUser[key],
        new: user[key],
      };
    }
  }

  res.send({ message: "User has been updated.", changes });
});

/**
 * DELETE /api/users/:id
 * Deletes an existing user.
 */
app.delete("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send({ message: "User not found." });

  const index = users.indexOf(user);
  users.splice(index, 1);

  res.send({
    message: `User with ID ${user.id} has been deleted.`,
    deletedUser: user,
  });
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on http://localhost:${port}...`));
