import React, { useState } from 'react';

const Item = ({ item, toggleItemResolved, removeItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleCheckboxChange = () => {
    toggleItemResolved(item.id);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <li className={`item ${item.resolved ? 'resolved' : ''}`}>
      <div className="item-details">
        <input
          type="checkbox"
          checked={item.resolved}
          onChange={handleCheckboxChange}
        />
        <span>{item.name}</span>
      </div>
      <div className="item-quantity">
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
      </div>
      <button onClick={() => removeItem(item.id)} className="remove-btn">×</button>
    </li>
  );
};

export default Item;
