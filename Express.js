const express = require('express');
const { Router } = express;
bodyParser = require('body-parser').json();

const server = express();
const routerProductos = Router();

const Contenedor = require('./Contenedor.js');

server.use('/', routerProductos);

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

routerProductos.get("/", (req, res) => {
  res.send("index.html")
})

routerProductos.get('/api/productos', function(req, res){
  res.send(productos)
});

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

routerProductos.get('/productoRandom', function(req, res){
  const producto = productos[getRandomInt(0, productos.length)];
  res.send(producto);
});

routerProductos.get('/api/productos/:id', function(req, res){
  const producto = productos.find(item => item.id == req.params.id);
  if(producto) {
    res.send(producto);
  } else {
    res.send({ p: producto, error: 'producto no encontrado' })
  }
})

routerProductos.post('/api/productos', bodyParser, function(req, res){
  const producto = {
    id: productos.length + 1,
    ...req.body
  };
  productos.push(producto);
  res.send(productos);
})

routerProductos.put('/api/productos/:id', bodyParser, function(req, res){
  const producto = productos.findIndex(item => item.id == req.params.id);
  if(producto) {
    console.log(producto)
    productos[producto] = {
      id: producto + 1,
      ...req.body
    }
    res.send(productos);
  } else {
    res.send({ error: 'producto no encontrado' })
  }
})

routerProductos.delete('/api/productos/:id', function(req, res){
  const newProd = productos.filter(item => item.id != req.params.id);
  productos = newProd;
  res.send(productos);
})

server.listen(8080, () => {
  console.log(`Listening on port 8080`);
});
