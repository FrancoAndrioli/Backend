const express = require('express');

const server = express();

const Contenedor = require('./Contenedor.js');

server.get('/', function(req, res){
  let msj = `Binvenido al servidor express`;
  res.send(`<h1>${msj}</h1>`)
});

let productos = [
  {
    "id": 1,
    "title": "Queso",
    "price": 23.45,
    "thumbnail": "https://sp.depositphotos.com/49398119/stock-photo-cubes-of-yellow-cheese-stacked.html"
  },
  {
    "id": 2,
    "title": "Cebolla",
    "price": 10.2,
    "thumbnail": "https://sp.depositphotos.com/220427776/stock-photo-sliced-red-onion-parsley-spices.html"
  },
  {
    "id": 3,
    "title": "Fideos",
    "price": 45.67,
    "thumbnail": "https://sp.depositphotos.com/308290294/stock-photo-stortelli-yellow-italian-pasta-close.html"
  },
  {
    "id": 4,
    "title": "Queso",
    "price": 23.45,
    "thumbnail": "https://sp.depositphotos.com/49398119/stock-photo-cubes-of-yellow-cheese-stacked.html"
  },
  {
    "id": 5,
    "title": "Cebolla",
    "price": 10.2,
    "thumbnail": "https://sp.depositphotos.com/220427776/stock-photo-sliced-red-onion-parsley-spices.html"
  },
  {
    "id": 6,
    "title": "Fideos",
    "price": 45.67,
    "thumbnail": "https://sp.depositphotos.com/308290294/stock-photo-stortelli-yellow-italian-pasta-close.html"
  }
]

server.get('/productos', function(req, res){
  res.send(productos)
});

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

server.get('/productoRandom', function(req, res){
  const producto = productos[getRandomInt(0, productos.length)];
  res.send(producto);
});

server.get('/contenedor', function(req, res){
  const cont = new Contenedor("products");
  const all = JSON.parse(cont.getAll());
  res.send(all);
})

server.listen(8080, () => {
  console.log(`Listening on port 8080`);
});
