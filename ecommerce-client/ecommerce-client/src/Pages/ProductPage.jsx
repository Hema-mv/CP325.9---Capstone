import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProductById, createNewProduct, updateExistingProduct, fetchAllProducts, deleteProductById } from '../Utilities/product-Service';
import '../Styles/product.css';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    image: ''
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (isEditMode) {
      fetchProduct();
    }
    fetchProducts();
  }, [id]);

  const fetchProduct = async () => {
    try {
      console.log(id)
      const productData = await fetchProductById(id);
      setFormData(productData);
    } catch (error) {
      console.error('Error fetching product1:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const productsData = await fetchAllProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateExistingProduct(id, formData);
        alert('Product updated successfully');
      } else {
        await createNewProduct(formData);
        alert('Product created successfully');
      }
      navigate('/products'); // Navigate to the product list page after submission
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProductById(productId);
      alert('Product deleted successfully');
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <div className="product-management-page">
      <h1>{isEditMode ? 'Edit Product' : 'Create New Product'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isEditMode ? 'Update Product' : 'Create Product'}</button>
        {isEditMode && <button type="button" onClick={() => handleDelete(id)}>Delete Product</button>}
      </form>

      <h2>Product List</h2>
      <Link to="/product">Add New Product</Link>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.price}
            <Link to={`/product/${product.id}`}>Edit</Link>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPage;