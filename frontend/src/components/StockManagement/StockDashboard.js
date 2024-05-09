//App/frontend\src\components\StockManagement

import React, { useEffect, useState } from 'react';
import { getDesserts, getAvailableDesserts } from '../../services/stockService';
import StockForm from './StockForm';

const StockDashboard = () => {
  const [desserts, setDesserts] = useState([]);
  const [availableDesserts, setAvailableDesserts] = useState([]);
  const [error, setError] = useState(null);
  const fetchDesserts = async () => {
    try {
      const data = await getDesserts();
      console.log(data)
      setDesserts(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchAvailableDesserts = async () => {
    try {
      const data = await getAvailableDesserts();
      setAvailableDesserts(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {

    fetchDesserts();
    fetchAvailableDesserts();
    console.log(desserts)
  }, []);

  return (
    <div>
      <h2>Stock Dashboard</h2>
      {error && <p>{error}</p>}
      {desserts.map((dessert) => (
        <div key={dessert._id}>
          <h3>{dessert.dessert_id.name}</h3>
          <p>Quantity: {dessert.quantity}</p>
          <StockForm dessertId={dessert.dessert_id._id} onUpdate={fetchDesserts}/>
        </div>
      ))}
      <div>
        <StockForm
          availableDesserts={availableDesserts}
          fetchAvailableDesserts={fetchAvailableDesserts}
          fetchDesserts={fetchDesserts}
        />
      </div>
    </div>
  );
};

export default StockDashboard;