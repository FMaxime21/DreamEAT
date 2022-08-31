import React from 'react'
import image from '../../images/imageExemple.jpg';
import ListGroup from 'react-bootstrap/ListGroup';
import './recipes.scss'

const Recipes = ({ dataRecipe, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className=''>
      <ul className='recipe'>
        <ul className=''>
          {dataRecipe.map(recipe => (
            <li key={recipe.id} className=''>
              <div className='recipe-content'>
              </div>
              <li className="line-hr"></li>
              
              <p class="recipe-tags">Tags :
                <span class="recipe-tag">#{recipe.tags}</span>
              </p>
              <div className="recipe-box">

                <img src={recipe.image === '' ? recipe.image = image : recipe.image} width="70" height="70" style={{ position: "relative" }} />
                
                <div>
                <h1 className="recipe-title">
                <a href="#">
                  {recipe.name}
                </a>
              </h1>
                </div>
                
              </div>
              <p className="recipe-desc">
                  {recipe.description}
                  <p className="recipe-metadata">
                    <span className='recipe-rating'>★★★★☆</span>
                    <span className='recipe-votes'>(6 votes)</span>
                  </p>
                </p>
              
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};

export default Recipes;