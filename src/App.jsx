import { useState } from 'react';
import Menu from './components/Menu';
import OrderForm from './components/OrderForm';

function App() {
  const params = new URLSearchParams(window.location.search);
  const tableNumber = params.get('table') || 'Unknown';

  const [selectedItems, setSelectedItems] = useState([]);

  const onSelect = (item) => {
    const existing = selectedItems.find(i => i._id === item._id);
    if (existing) {
      existing.quantity += 1;
      setSelectedItems([...selectedItems]);
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const reset = () => setSelectedItems([]);

  return (
    <div>
      <h1>Welcome to Our Restaurant</h1>
      <Menu onSelect={onSelect} />
      {selectedItems.length > 0 && (
        <OrderForm tableNumber={tableNumber} items={selectedItems} reset={reset} />
      )}
    </div>
  );
}

export default App;
