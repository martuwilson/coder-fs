// class with fs module
const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor(){
        this.products = [];
        this.productsPath = path.join(__dirname, 'products.json');
        this.id = 0;
    }

    // read products from file
    readProducts(){
        this.products = JSON.parse(fs.readFileSync(this.productsPath, 'utf8'));
    }

    // write products to file
    writeProducts(){
        fs.writeFileSync(this.productsPath, JSON.stringify(this.products));
    }

    // add product to products array
    addProduct({title,description, price, thumbnail,stock}){
        let product = {
            title,
            description,
            price,
            thumbnail,
            stock,
            id: this.id++
        }
        this.products.push(product);
        this.writeProducts();

        if(this.products.find((p) => p.id === product.id)){
            return {error: 'El producto ya existe'}
          }else{
              this.products.push(product);
              return product;
            }
    }

    // get all products
    getProducts(){
        this.products.length > 0 ? this.products : {error: 'No hay productos cargados'}
    }

    // get product by id

    getProductById(id){
        let product = this.products.find((product) => product.id === id);
        return product ? product : {error: 'Producto no encontrado'}
    }

    // update product by id
    updateProductById(id, {title,description, price, thumbnail,stock}){

        let product = this.products.find((product) => product.id === id);
        if(product){
            product.title = title;
            product.description = description;
            product.price = price;
            product.thumbnail = thumbnail;
            product.stock = stock;
            this.writeProducts();
        }
        return product ? product : {error: 'Producto no encontrado'}
    }

    // delete product by id
    deleteProductById(id){
        let product = this.products.find((product) => product.id === id);
        if(product){
            this.products = this.products.filter((product) => product.id !== id);
            this.writeProducts();
        }
        return product ? product : {error: 'Producto no encontrado'}
    }
}

guitarra = new ProductManager();

guitarra.addProduct({title: 'Guitarra', description: 'Guitarra electrica', price: 1000, thumbnail: 'guitarra.jpg', stock: 10});