import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const API_BASE_URL = 'http://localhost:8080/api';

function App() {
  const [products, setProducts] = React.useState([]);
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState(5);
  const [sortBy, setSortBy] = React.useState('id');
  const [direction, setDirection] = React.useState('asc');
  const [totalPages, setTotalPages] = React.useState(0);
  const [error, setError] = React.useState('');

  const fetchProducts = async (nextPage = page, nextSize = size, nextSortBy = sortBy, nextDirection = direction) => {
    try {
      setError('');
      const response = await fetch(
        `${API_BASE_URL}/products?page=${nextPage}&size=${nextSize}&sortBy=${nextSortBy}&direction=${nextDirection}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Unable to load products');
      }

      const data = await response.json();
      setProducts(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      setError(err.message || 'Something went wrong while loading products');
    }
  };

  React.useEffect(() => {
    fetchProducts(page, size, sortBy, direction);
  }, [page, size, sortBy, direction]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError('');
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          price: Number(price)
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Unable to create product');
      }

      setName('');
      setPrice('');
      setPage(0);
      fetchProducts(0, size, sortBy, direction);
    } catch (err) {
      setError(err.message || 'Unable to add product');
    }
  };

  const handleDelete = async (id) => {
    try {
      setError('');
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Unable to delete product');
      }

      fetchProducts(page, size, sortBy, direction);
    } catch (err) {
      setError(err.message || 'Unable to delete product');
    }
  };

  return (
    <div className="container">
      <h1>Product List</h1>

      {error && <div className="alert error">{error}</div>}

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

      <div className="toolbar">
        <label>
          Sort by:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </label>

        <label>
          Direction:
          <select value={direction} onChange={(e) => setDirection(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>

        <label>
          Page size:
          <select value={size} onChange={(e) => {
            setSize(Number(e.target.value));
            setPage(0);
          }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>

      <ul className="product-list">
        {products.length === 0 ? (
          <li className="empty">No products found.</li>
        ) : (
          products.map((product) => (
            <li key={product.id} className="product-item">
              <div>
                <strong>{product.name}</strong> - ${Number(product.price).toFixed(2)}
              </div>
              <button type="button" className="delete-btn" onClick={() => handleDelete(product.id)}>
                Delete
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="pagination">
        <button type="button" disabled={page === 0} onClick={() => setPage((prev) => Math.max(prev - 1, 0))}>
          Previous
        </button>
        <span>Page {page + 1} / {Math.max(totalPages, 1)}</span>
        <button type="button" disabled={page >= totalPages - 1} onClick={() => setPage((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
