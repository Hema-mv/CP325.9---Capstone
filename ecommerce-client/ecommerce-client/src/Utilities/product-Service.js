import { getProducts, getProductById, getCategories, createProduct, getProductsByCategory, updateProduct,deleteProduct } from './product-api';

// Fetch all products
export const fetchAllProducts = async () => {
  try {
    const products = await getProducts();
    console.log('products:', products);
    return products;
  } catch (error) {
    console.error('Error in fetchAllProducts:', error);
    throw error;
  }
};

// Fetch product by ID
export const fetchProductById = async (id) => {
  try {
    const product = await getProductById(id);
    return product;
  } catch (error) {
    console.error('Error fetching product by id:', error);
    throw error;
  }
};

// Fetch product categories
export const fetchCategories = async () => {
  try {
    const categories = await getCategories();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Create a new product
export const createNewProduct = async (productData) => {
  try {
    const newProduct = await createProduct(productData);
    console.log('New product:', newProduct);
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  try {
    const products = await getProductsByCategory(category);
    return products;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

// Update product by ID
export const updateExistingProduct = async (id, productData) => {
  try {
    console.log("update",productData)
    const updatedProduct = await updateProduct(id, productData);
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete product by ID
export const deleteProductById = async (id) => {
  try {
    console.log('in delete',id)
    const response = await deleteProduct(id);
    return response;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Additional service functions can be added here
