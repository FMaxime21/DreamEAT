import React from 'react'
import { Link } from 'react-router-dom'

const Quiz = (props) => {
    return (
        <div className="taille2">
            <h2>Pseudo : {props.userData.pseudo}</h2>
            <Link className='text-tuning' to="/Recette">
                Pour créer une recette
            </Link>
        </div>
 )
  
}

export default Quiz

/*const Quiz = (props) => {
       <div>
            <h2>Pseudo : {props.userData.pseudo}</h2>
        </div>
    )return (
     
}

class Quiz extends Component {
    
    render() {

        const { pseudo } = this.props.userData;

        return(
            <div>
            <h2>Pseudo : {pseudo}</h2>
        </div>
        )
    }
}*/