import React, { useState } from 'react';
import { useCombobox } from 'downshift';
import './UserInput.css';

import cityList from './filteredCityList.json'; // Import the filtered city list

function UserInput({ onSubmit }) {
  const [filteredCities, setFilteredCities] = useState(cityList);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    setInputValue,
  } = useCombobox({
    items: filteredCities.slice(0, 20),
    onInputValueChange: ({ inputValue }) => {
      if (!inputValue) {
        setFilteredCities([]);
        return;
      }
      const filtered = cityList
        .filter((city) =>
          city.name.toLowerCase().startsWith(inputValue.toLowerCase())
        )
        .reduce((uniqueCities, city) => {
          if (!uniqueCities.some((c) => c.name === city.name && c.country === city.country)) {
            uniqueCities.push(city);
          }
          return uniqueCities;
        }, []);

      setFilteredCities(filtered);
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        onSubmit(selectedItem.name);
        setInputValue('');
      }
    },
  });

  const handleButtonClick = () => {
    const inputValue = getInputProps().value;
    if (typeof inputValue === 'string') {
      onSubmit(inputValue);
    }
  };

  return (
    <form className="user-input-form" {...getComboboxProps()} onSubmit={(e) => e.preventDefault()}>
      <input
        {...getInputProps()}
        type="text"
        className="user-input"
        placeholder="Enter city name"
      />
      <button type="submit" className="submit-btn" onClick={handleButtonClick}>
        Get Weather
      </button>
      <ul
        className="suggestions-list"
        {...getMenuProps()}
        style={{
          border: isOpen && getInputProps().value ? '1px solid #e0e0e0' : 'none',
        }}
      >
        {isOpen &&
          getInputProps().value &&
          filteredCities.slice(0, 20).map((city, index) => (
            <li
              {...getItemProps({ item: city, index })}
              key={city.id}
              className={highlightedIndex === index ? 'suggestion-item highlighted-item' : 'suggestion-item'}
            >
              {city.name}, {city.country}
            </li>
          ))}
      </ul>
    </form>
  );
}

export default UserInput;
