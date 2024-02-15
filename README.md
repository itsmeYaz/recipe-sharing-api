# 🍔 Recipe Sharing API

## Group Members

- **👤 [Nielven Mascarinas](https://www.facebook.com/NielvenMascarinas/)**
- **👤 [Cindy Rosales](https://www.facebook.com/cindy.riofloridorosales)**
- **👤 [Aliza Rabe](https://www.facebook.com/maylyn.pelobello.7)**
- **👤 [Ryan Natividad](https://www.facebook.com/Ryan3024)**

## 💡 About the Application

This application is a Recipe Sharing System built using Node.js, Express, and MongoDB. It provides a RESTful API for creating, reading, updating, and deleting (CRUD) recipes.

### Features

1. **Recipe Management**: Users can create new recipes, view all recipes, view a specific recipe by its ID or name, update existing recipes, and delete recipes.
2. **Tag-based Search**: Users can search for recipes based on tags. This feature allows users to find all recipes that fall under a specific category, such as 'Vegetarian', 'Gluten-free', etc.
3. **Name-based Search**: Users can search for recipes by their names. This feature allows users to find a specific recipe quickly if they know its name.
4. **Error Handling**: The application includes robust error handling. If an error occurs, the application will return a helpful error message and, in development mode, a stack trace.

### Purpose

The purpose of this application is to provide a simple and efficient way to manage and search for recipes.

## ⚙ Local Setup

Follow these steps to set up the application locally:

1. **Clone the Repository**: First, clone the repository to your local machine using Git. You can do this by running the following command in your terminal:

```bash
git clone https://github.com/itsmeYaz/recipe-sharing-api.git
```

2. **Install Dependencies**: Navigate into the cloned repository directory and install the necessary dependencies. Run the following command in your terminal:

```bash
npm install
```

3. **Start the Server**: Now, you can start the server by running the following command in your terminal:

```bash
npm run dev
```

The server will start, and you should see a message like <span style="color:green"><strong>Listening on http://localhost:8080...</strong></span> in your terminal.

4. **Test the Application**: You can now test the application by sending requests to <span style="color:green"><strong>http://localhost:8080/api/recipes</strong></span>. You can use a tool like Postman to send HTTP requests.

# 🌐 Recipe API Endpoint Guide

This API allows you to manage recipes. Here's how you can use the endpoints:

## Get All Recipes

**Endpoint:** `/api/recipes`

**Method:** `GET`

**Description:** Returns all recipes.

## Get a Specific Recipe by ID

**Endpoint:** `/api/recipes/:id`

**Method:** `GET`

**Description:** Returns the recipe with the specified ID.

**Parameters:**

- `id`: The ID of the recipe.

## Get Recipes by Name

**Endpoint:** `/api/recipes/name/:name`

**Method:** `GET`

**Description:** Returns recipes with the specified name.

**Parameters:**

- `name`: The name of the recipe.

## Get Recipes by Tag

**Endpoint:** `/api/recipes/tag/:tag`

**Method:** `GET`

**Description:** Returns recipes with the specified tag.

**Parameters:**

- `tag`: The tag of the recipe.

## Create a New Recipe

**Endpoint:** `/api/recipes`

**Method:** `POST`

**Description:** Creates a new recipe.

**Body:**

- `name`: The name of the recipe (required).
- `ingredients`: The ingredients of the recipe (required).
- `steps`: The steps of the recipe (required).
- `tag`: The tags of the recipe (optional).

## Update a Recipe

**Endpoint:** `/api/recipes/:id`

**Method:** `PUT`

**Description:** Updates the recipe with the specified ID.

**Parameters:**

- `id`: The ID of the recipe.

**Body:**

- `name`: The name of the recipe (optional).
- `ingredients`: The ingredients of the recipe (optional).
- `steps`: The steps of the recipe (optional).
- `tag`: The tags of the recipe (optional).

## Delete a Recipe

**Endpoint:** `/api/recipes/:id`

**Method:** `DELETE`

**Description:** Deletes the recipe with the specified ID.

**Parameters:**

- `id`: The ID of the recipe.

# 📚 Dependencies Guide

This project uses several dependencies to function correctly. Here's a brief description of each one:

## Dependencies

### 🚀 Express

**Version:** ^4.18.2

**Description:** Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

**Usage:** In this project, Express is used to create the server and manage the API routes.

### 🔍 Joi

**Version:** ^17.12.1

**Description:** Joi is a powerful schema description language and data validator for JavaScript.

**Usage:** In this project, Joi is used to validate the data sent to the API endpoints.

## DevDependencies

### 🔄 Nodemon

**Version:** ^3.0.3

**Description:** Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.

**Usage:** In this project, Nodemon is used to automatically restart the server whenever a file is changed. It's used in the `dev` script in the `package.json` file.
