const express = require("express");
const app = express();
const Joi = require("joi");

const { recipesData } = require("./src/data.js");

app.use(express.json());

//Get Request
app.get("/", (req, res) => {
  res.send("Welcome to the root route of the API.");
});

//Shows all the data
app.get("/api/recipes", (req, res) => {
  res.send(recipesData);
});

//get a certain recipe by adding a ID argument
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

// get recipes by name
app.get("/api/recipes/name/:name", (req, res) => {
  const name = req.params.name.replace(/\s/g, "");
  const regex = new RegExp(name.split("").join("\\s*"), "i");

  const recipes = recipesData.filter((c) => regex.test(c.name));

  if (recipes.length === 0)
    return res
      .status(404)
      .send({ message: "No recipes found with the given name." });
  res.send(recipes);
});

//get recipes by tag
app.get("/api/recipes/tag/:tag", (req, res) => {
  const tag = req.params.tag.replace(/\s/g, "");
  const regex = new RegExp("^" + tag.split("").join("\\s*") + "$", "i");

  const recipes = recipesData.filter((c) => c.tag.some((t) => regex.test(t)));

  if (recipes.length === 0)
    return res
      .status(404)
      .send({ message: "No recipes found with the given tag." });
  res.send(recipes);
});

//Post Request
app.post("/api/recipes", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    steps: Joi.array().items(Joi.string()).required(),
    tag: Joi.array().items(Joi.string()).optional(), // tag is now an array
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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

//PUT request
app.put("/api/recipes/:id", (req, res) => {
  const ID = parseInt(req.params.id);
  const recipe = recipesData.find((c) => c.id === ID);
  if (!recipe) return res.status(404).send({ message: "Recipe not found." });

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

//delete request
app.delete("/api/recipes/:id", (req, res) => {
  const ID = parseInt(req.params.id);
  const recipe = recipesData.find((c) => c.id === ID);
  if (!recipe) return res.status(404).send({ message: "Recipe not found." });

  const index = recipesData.indexOf(recipe);
  recipesData.splice(index, 1);

  res.send(recipe);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on http://localhost:${port}...`));
