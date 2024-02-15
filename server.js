const express = require("express");
const app = express();
const Joi = require("joi");

const { recipesData } = require("./src/data.js");

app.use(express.json());

//Get Request
app.get("/", (req, res) => {
  res.send(recipesData);
});

app.get("/api/recipes", (req, res) => {
  res.send(recipesData);
});

//get a certain recipe by adding a argument
app.get("/api/recipes/:id", (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
  });

  const { error } = schema.validate(req.params);
  if (error) return res.status(400).send(error.details[0].message);

  const ID = req.params.id;
  const recipe = recipesData.find((c) => c.id === parseInt(ID));
  if (!recipe) return res.status(404).send({ message: "Recipe not found." });
  res.send(recipe);
});

//get recipes by tag
app.get("/api/recipes/tag/:tag", (req, res) => {
  const schema = Joi.object({
    tag: Joi.string().required(),
  });

  const { error } = schema.validate(req.params);
  if (error) return res.status(400).send(error.details[0].message);

  const tag = req.params.tag.toLowerCase();
  const recipes = recipesData.filter((c) => c.tag.toLowerCase() === tag);
  if (recipes.length === 0)
    return res
      .status(404)
      .send({ message: "No recipes found with the given tag." });
  res.send(recipes);
});

//Post Request
app.post("/api/recipes/create", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    steps: Joi.array().items(Joi.string()).required(),
    tag: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newRecipe = {
    id: recipesData.length + 1,
    name: req.body.name,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    tag: req.body.tag,
  };

  recipesData.push(newRecipe);
  res.send(newRecipe);
});

//PUT request
app.put("/api/recipes/update/:id", (req, res) => {
  const ID = parseInt(req.params.id);
  const recipe = recipesData.find((c) => c.id === ID);
  if (!recipe) return res.status(404).send({ message: "Recipe not found." });

  const schema = Joi.object({
    id: Joi.number().integer(),
    name: Joi.string().required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    steps: Joi.array().items(Joi.string()).required(),
    tag: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  recipe.name = req.body.name;
  recipe.ingredients = req.body.ingredients;
  recipe.steps = req.body.steps;
  recipe.tag = req.body.tag;

  res.send(recipe);
});

//delete request
app.delete("/api/recipes/delete/:id", (req, res) => {
  const ID = parseInt(req.params.id);
  const recipe = recipesData.find((c) => c.id === ID);
  if (!recipe) return res.status(404).send({ message: "Recipe not found." });

  const index = recipesData.indexOf(recipe);
  recipesData.splice(index, 1);

  res.send(recipe);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on http://localhost:${port}...`));
