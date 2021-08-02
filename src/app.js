const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  var { title, url, techs } = request.body;

  var repositorie = { 
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  } 
  
  repositories.push(repositorie);

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  var { id } = request.params;
  var { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  
  if(repositorieIndex < 0){
    return response.status(400).json({ erro: "Repositorie not found."})
  }

  const repositorie = { 
    id,
    title,
    url,
    techs,
    likes: 1
  }

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  var { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  
  if(repositorieIndex < 0){
    return response.status(400).json({ erro: "Repositorie not found."})
  }

  repositories.splice(repositorieIndex,1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  var { id } = request.params;

  const repositorie = repositories.find(repositorie => repositorie.id === id);

  if(repositorie == undefined){
    return response.status(400).json({ erro: "This repository does not exist."})
  }

  repositorie.likes += 1;
  return response.json(repositorie);
});

module.exports = app;
