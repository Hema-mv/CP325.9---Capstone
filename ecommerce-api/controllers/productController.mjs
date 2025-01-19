import Product from '../models/product.mjs';


// Get all products
async function  getAllProducts(req, res) 
 {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function  createProduct(req, res) 
 {
  const { name, price, description, category, stock ,image } = req.body;
  console.log('req.body:test', req.body);
  console.log('req.body:params', req.params);
  try {
    const newProduct = new Product({ name, price, description, category, stock ,image});
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function  getProductById(req, res) 
 {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function  updateProduct(req, res) 
 {
  const { name, price, description, category, stock,image } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.stock = stock || product.stock;
product.image=image||product.image;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function  deleteProduct(req, res) 
 {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export default { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct };