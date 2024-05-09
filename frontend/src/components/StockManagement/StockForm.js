import React, { useState } from 'react';
import { updateStock, addDessertToStock } from '../../services/stockService';

const StockForm = ({ dessertId, availableDesserts, fetchAvailableDesserts, fetchDesserts, onUpdate }) => {
  const [selectedDessertId, setSelectedDessertId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (dessertId) {
          await updateStock(dessertId, quantity);
        } else {
          await addDessertToStock(selectedDessertId, quantity);
          setSelectedDessertId('');
          // Refresh the available desserts and stock entries
          fetchAvailableDesserts();
          fetchDesserts();
        }
        setQuantity(0);
        if (onUpdate) {
            onUpdate();
        }
      } catch (error) {
        setError(error.message);
      }
    };


  return (
    <div>
      <h3>{dessertId ? 'Update Stock' : 'Add Dessert to Stock'}</h3>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        {!dessertId && (
        <select
          value={selectedDessertId}
          onChange={(e) => setSelectedDessertId(e.target.value)}
          required
        >
          <option value="">Select a dessert</option>
          {availableDesserts.map((dessert) => (
            <option key={dessert._id} value={dessert._id}>
              {dessert.name}
            </option>
          ))}
        </select>
        )}
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button type="submit">{dessertId ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default StockForm;