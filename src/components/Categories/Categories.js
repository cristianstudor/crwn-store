import React from 'react';
import CategoryItem from '../CategoryItem/CategoryItem.js';
import './Categories.scss';

const Categories = ({ categories }) => {
  return(
    <div className="categories-container">
        {
          categories.map( category => (
            <CategoryItem key={category.id} category={category}/>
          ))
        }
    </div>
  )
}

export default Categories;