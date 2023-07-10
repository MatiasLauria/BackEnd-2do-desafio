const ProductManager = require("./ProductManager.js");
let productManager = new ProductManager();
console.log(productManager);



let persistirProduct = async () => {
    let product = await productManager.addProduct('Cafe', 'Cafe tostado Juan Valdez', 2000, "http://cafe.png", "CA45CO", 35);


    let products = await productManager.getProducts();
    console.log(`Productos encontrados en Product Manager: ${products.length}`);
    console.log(products);

    let foundProduct = await productManager.getProductById('CA45CO');
    console.log("Producto encontrado por ID:");
    console.log(foundProduct);

    await productManager.updateProduct('CA45CO', { price: 2500, description: 'Cafe tostado Juan Valdez premium' });

    await productManager.deleteProduct('CA45CO');




    
};

  
persistirProduct();
