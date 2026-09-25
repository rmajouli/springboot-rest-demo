import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

function App() {
  const [products, setProducts] = React.useState([]);
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:8080/api/products');
    const data = await response.json();
    setProducts(data);
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8080/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        price: Number(price)
      })
    });

    if (response.ok) {
      setName('');
      setPrice('');
      fetchProducts();
    }
  };

  return (
    <div className="container">
      <h1>Product List</h1>

      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
