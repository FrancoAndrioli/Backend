const fs = require('fs');

module.exports = class Contenedor {
    constructor(file) {
        this.fileName = file;   
    }        
    
    save = async (product) => {
        try {
          if(fs.existsSync(this.fileName)) {
              const products = await this.getAll();
              const lastAdded = products.reduce((acc, item) => item.id > acc ? acc = item.id : acc, 0);
              const newProduct = {
                id: lastAdded + 1,
                ...product
              }
              products.push(newProduct);
              console.log("Guarda: ", newProduct)
              await fs.promises.writeFile(this.fileName, JSON.stringify(products, null, 2));
          } else {
            // Si el archivo no existe
            const newProduct = {
              id: 1,
              ...product
            }
            // Creamos el archivo
            await fs.promises.writeFile(this.fileName, JSON.stringify([newProduct], null, 2));
          }
        } catch (error) {
          console.log(error)
        }
    }

    getById = async (id) => {
      try {
        if(fs.existsSync(this.fileName)) {
          const products = await this.getAll();
          if(products.find(item => item.id === id)) {
            const product = products.find(item => item.id === id);
            return product;
          } else {
            console.log('El producto no se encuentra en la lista');
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    getAll = async () => {
      try {
        const content = await fs.promises.readFile(this.fileName, 'utf8');
        const products = JSON.parse(content);
        return products;
      } catch (error) {
        console.log(error)
      }
    }

    deleteById = async (id) => {
      try {
        const products = await this.getAll();
        if(products.find(item => item.id === id)) {
          const newProducts = products.filter(item => item.id !== id);
          await fs.promises.writeFile(this.fileName, JSON.stringify(newProducts, null, 2));
        } else {
          console.log('El producto no se encuentra en la lista');
        }
      } catch (error) {
        console.log(error)
      }
    }

    deleteAll = async () => {
      try {
        console.log('Elimino todos los archivos');
        await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 2));
      } catch (error) {
        console.log(error)
      }
    }
}
