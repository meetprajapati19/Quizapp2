import React, { useState } from 'react';
import './ToggleButton.css'; // Optional: For styling the toggle button

const ToggleButton = ({ isActive, onToggle }) => {
  const [active, setActive] = useState(isActive);

  const handleToggle = () => {
    const newState = !active;
    setActive(newState);
    onToggle(newState); // Call the parent component's function to handle the toggle
  };

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={active}
        onChange={handleToggle}
      />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleButton;
