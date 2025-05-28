import React, { useState } from 'react';
import api from '../api';

function OrderForm({ tableNumber, items, reset }) {
  const [notes, setNotes] = useState({});

  const submitOrder = async () => {
    const order = {
      tableNumber: Number(tableNumber),
      items: items.map(item => ({
        menuItemId: item._id,
        quantity: item.quantity,
        price: item.price,
        notes: notes[item._id] || '',
      })),
    };

    await api.post('/order', order);
    alert('Order placed!');
    reset();
  };

  return (
    <div>
      <h3>Your Order (Table {tableNumber})</h3>
      {items.map(item => (
        <div key={item._id}>
          {item.name} x {item.quantity}
          <br />
          <textarea
            placeholder="Notes (e.g., no spicy)"
            value={notes[item._id] || ''}
            onChange={e => setNotes({ ...notes, [item._id]: e.target.value })}
          />
          <hr />
        </div>
      ))}
      <button onClick={submitOrder}>Submit Order</button>
    </div>
  );
}

export default OrderForm;
