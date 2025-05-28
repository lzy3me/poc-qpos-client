import { useEffect, useState } from 'react';
import api from '../api';

function Menu({ onSelect }) {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    api.get('/menu').then(res => {
      setMenu(res.data.filter(item => item.isActive));
    });
  }, []);

  return (
    <div>
      <h2>Menu</h2>
      {menu.map(item => (
        <div key={item._id}>
          <strong>{item.name}</strong> - ฿{item.price}<br />
          {item.description}<br />
          <button onClick={() => onSelect(item)}>Add to Order</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Menu;
