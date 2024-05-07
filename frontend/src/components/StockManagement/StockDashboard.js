import React, { useEffect, useState } from 'react';
import { getDesserts } from '../../services/stockService';
import StockForm from './StockForm';

const StockDashboard = () => {
    const [desserts, setDesserts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDesserts = async () => {
            try {
                const data = await getDesserts();
                setDesserts(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchDesserts();
    }, []);

    return (
        <div>
            <h2>Stock Dashboard</h2>
            {error && <p>{error}</p>}
            {desserts.map((dessert) => (
                <div key={dessert._id}>
                    <h3>{dessert.name}</h3>
                    <p>Quantity: {dessert.quantity}</p>
                    <StockForm dessertId={dessert._id} />
                </div>
            ))}
        </div>
    );
};

export default StockDashboard;