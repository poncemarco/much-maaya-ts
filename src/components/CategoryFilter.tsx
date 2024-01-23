import React, { useState, useEffect } from 'react';
import { fetchItems } from '../services/items';
import { type Datum } from '../types/api';

const ProductFilter = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredItems, setFilteredItems] = useState<Datum[]>([]);
  const [allItems, setAllItems] = useState<Datum[]>([]);

  const loadCategoriesAndItems = async () => {
    const items = await fetchItems();
    const uniqueCategories = Array.from(
      new Set(items.map((item) => item.category))
    );
    setCategories(uniqueCategories);
    setAllItems(items);
    setFilteredItems(items);
  };


  loadCategoriesAndItems();


  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);

    // Filtrar los productos por categoría
    const filtered = category
      ? allItems.filter((item) => item.category === category)
      : allItems;

    setFilteredItems(filtered);
  };

  console.log(filteredItems);

  return (
    <div>
      <label htmlFor="categoryFilter">Filtrar por categoría:</label>
      <select
        id="categoryFilter"
        onChange={(e) => handleCategoryChange(e.target.value)}
        value={selectedCategory || ''}
      >
        <option value="">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
  
        ))}
      </ul>
    </div>
  );
};

export default ProductFilter;
