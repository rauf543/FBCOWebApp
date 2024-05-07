import React, { useState } from 'react';
import { updateStock } from '../../services/stockService';

const StockForm = ({ dessertId }) => {
    const [quantity, setQuantity] = useState(0);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateStock(dessertId, quantity);
            setQuantity(0);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h3>Update Stock</h3>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default StockForm;