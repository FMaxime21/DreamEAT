import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './pagination.css'
const Pagination = ({ recipesPerPage, totalRecipes, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className=''>
        <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number}>
            <a onClick={() => paginate(number)} href='#' className='active'>
              {number}
            </a>
          </li>
        ))}
        </ul>
    </nav>
  );
};

export default Pagination;