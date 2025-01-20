const BASE_URL = 'http://localhost:5050/api'; // Replace with your actual API base URL

// Fetch all products
export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Fetch a product by ID
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Fetch product categories
export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (productData) => {
  try {
    console.log('productData:', productData);
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    const newProduct = await response.json();
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Fetch products by category
export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/products?category=${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products by category');
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

// Update a product by ID
export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    const updatedProduct = await response.json();
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product by ID
export const deleteProduct = async (id) => {
  try {
    console.log("in delete product api",id)
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return { message: 'Product deleted successfully' };
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Additional API functions can be added here
