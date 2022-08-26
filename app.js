require("dotenv").config();
const { json } = require("express");
const express = require("express");
const app = express();
const port = process.env.APP_PORT ?? 5000;

const {
  getUserById, 
  updateUser, 
  deleteUser, 
  getUsers, 
  postUser 
} = require("./userHandlers");

const {
  getMovieById,
  getMovies,
  updateMovie,
  deleteMovie,
  postMovie
} = require("./movieHandlers");

const { validateUser } = require("./validators.js");
const { validateMovie } = require("./validators.js");


app.use(json());
// ROUTES 
const welcome = (req, res) => {
  res.send("Welcome to the users list");
};

// GET ROUTES 
app.get("/", welcome);

// POST ROUTES 
app.post("/api/movies", validateMovie, postMovie);
app.post("/api/users", validateUser, postUser);
app.post("/api/users", postUser);

app.get("/api/users", getUsers);
app.get("/api/users/:id", getUserById);
app.put("/api/users/:id", updateUser);
app.put("/api/users/:id", validateUser, updateUser);
app.delete("/api/users/:id", deleteUser);



app.post("/api/movies", postMovie);

app.get("/api/movies", getMovies);
app.get("/api/movies/:id", getMovieById);
app.put("/api/movies/:id", updateMovie);
app.put("/api/movies/:id", validateMovie, updateMovie);
app.delete("/api/movies/:id", deleteMovie);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});