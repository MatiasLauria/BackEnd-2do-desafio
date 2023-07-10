
class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
};


class ProductManager {
    #products;
    #productDirPath;
    #productFilePath;
    #fileSystem;

    constructor() {
        this.#products = new Array();
        this.#productDirPath = "./files";
        this.#productFilePath = this.#productDirPath + "/Products.json";
        this.#fileSystem = require("fs");
    }


    // METODOS con persistencia en archivo.json
    // Crear producto
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        let newProduct = new Product(title, description, price, thumbnail, code, stock);
        console.log("Crear Producto: producto a registrar:");
        console.log(newProduct);

        try {
            //Creamos el directorio
            await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true });

            //Validamos que exista ya el archivo con usuarios sino se crea vacío para ingresar nuevos:
            if (!this.#fileSystem.existsSync(this.#productFilePath)) {
                //Se crea el archivo vacio.
                await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
            }

            //leemos el archivo
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8"); // []

            //Cargamos los productos encontrados para agregar el nuevo:
            //Obtenemos el JSON String 
            console.info("Archivo JSON obtenido desde archivo: ");
            console.log(productsFile);
            this.#products = JSON.parse(productsFile);

            console.log("Productos encontrados: ");
            console.log(this.#products);
            this.#products.push(newProduct);
            console.log("Lista actualizada de productos: ");
            console.log(this.#products);

            //Se sobreescribe el archivos de productos para persistencia.
            await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2, '\t'));
        } catch (error) {
            console.error(`Error creando producto nuevo: ${JSON.stringify(newProduct)}, detalle del error: ${error}`);
            throw Error(`Error creando producto nuevo: ${JSON.stringify(newProduct)}, detalle del error: ${error}`);
        }
    }



    // Leer productos 
    getProducts = async () => {
        try {

            //Creamos el directorio
            await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true });

            //Validamos que exista ya el archivo con productos si no se crea vacío para ingresar nuevos:
            if (!this.#fileSystem.existsSync(this.#productFilePath)) {
                //Se crea el archivo vacio.
                await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
            }

            //leemos el archivo
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");


            //Obtenemos el JSON String 
            console.info("Archivo JSON obtenido desde archivo: ");
            console.log(productsFile);
            this.#products = JSON.parse(productsFile);
            console.log("Productos encontrados: ");
            console.log(this.#products);
            return this.#products;

        } catch (error) {
            console.error(`Error consultando los usuarios por archivo, valide el archivo: ${this.#productDirPath}, 
                detalle del error: ${error}`);
            throw Error(`Error consultando los usuarios por archivo, valide el archivo: ${this.#productDirPath},
             detalle del error: ${error}`);
        }
    }

    // Leer producto por ID
    getProductById = async (id) => {
        try {
            // Creamos el directorio
            await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true });

            // Validamos que exista ya el archivo con productos, si no se crea vacío para ingresar nuevos
            if (!this.#fileSystem.existsSync(this.#productFilePath)) {
                // Se crea el archivo vacío
                await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
            }

            // Leemos el archivo
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");

            // Obtenemos el JSON String
            console.info("Archivo JSON obtenido desde archivo:");
            console.log(productsFile);
            this.#products = JSON.parse(productsFile);
            console.log("Productos encontrados:");
            console.log(this.#products);

            // Buscamos el producto por ID
            let product = this.#products.find((p) => p.code === id);

            // Devolvemos el producto encontrado
            return product;
        } catch (error) {
            console.error(`Error consultando el producto por ID: ${id}, detalle del error: ${error}`);
            throw Error(`Error consultando el producto por ID: ${id}, detalle del error: ${error}`);
        }
    }

    // Actualizar producto por ID
    updateProduct = async (id, updatedFields) => {
        try {
            // Creamos el directorio
            await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true });

            // Validamos que exista ya el archivo con productos, si no se crea vacío para ingresar nuevos
            if (!this.#fileSystem.existsSync(this.#productFilePath)) {
                // Se crea el archivo vacío
                await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
            }

            // Leemos el archivo
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");

            // Obtenemos el JSON String
            console.info("Archivo JSON obtenido desde archivo:");
            console.log(productsFile);
            this.#products = JSON.parse(productsFile);
            console.log("Productos encontrados:");
            console.log(this.#products);

            // Buscamos el producto por ID
            let productIndex = this.#products.findIndex((p) => p.code === id);

            if (productIndex !== -1) {
                // Actualizamos el producto con los campos proporcionados
                this.#products[productIndex] = { ...this.#products[productIndex], ...updatedFields };

                // Se sobreescribe el archivo de productos para persistencia.
                await this.#fileSystem.promises.writeFile(
                    this.#productFilePath,
                    JSON.stringify(this.#products, null, 2, '\t')
                );

                console.log("Producto actualizado exitosamente.");
                console.log("Producto actualizado:");
                console.log(this.#products[productIndex]);
            } else {
                console.log(`No se encontró ningún producto con el ID: ${id}`);
            }
        } catch (error) {
            console.error(`Error actualizando el producto por ID: ${id}, detalle del error: ${error}`);
            throw Error(`Error actualizando el producto por ID: ${id}, detalle del error: ${error}`);
        }
    }

    // Eliminar producto por ID
    deleteProduct = async (id) => {
        try {
            // Creamos el directorio
            await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true });

            // Validamos que exista ya el archivo con productos, si no se crea vacío para ingresar nuevos
            if (!this.#fileSystem.existsSync(this.#productFilePath)) {
                // Se crea el archivo vacío
                await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
            }

            // Leemos el archivo
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");

            // Obtenemos el JSON String
            console.info("Archivo JSON obtenido desde archivo:");
            console.log(productsFile);
            this.#products = JSON.parse(productsFile);
            console.log("Productos encontrados:");
            console.log(this.#products);

            // Buscamos el índice del producto por ID
            let productIndex = this.#products.findIndex((p) => p.code === id);

            if (productIndex !== -1) {
                // Eliminamos el producto del array
                let deletedProduct = this.#products.splice(productIndex, 1)[0];

                // Se sobreescribe el archivo de productos para persistencia.
                await this.#fileSystem.promises.writeFile(
                    this.#productFilePath,
                    JSON.stringify(this.#products, null, 2, '\t')
                );

                console.log("Producto eliminado exitosamente.");
                console.log("Producto eliminado:");
                console.log(deletedProduct);
            } else {
                console.log(`No se encontró ningún producto con el ID: ${id}`);
            }
        } catch (error) {
            console.error(`Error eliminando el producto por ID: ${id}, detalle del error: ${error}`);
            throw Error(`Error eliminando el producto por ID: ${id}, detalle del error: ${error}`);
        }
    }

    



}

module.exports = ProductManager;

