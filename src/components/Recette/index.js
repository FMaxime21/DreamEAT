import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Recette = (props) => {

    const firebase = useContext(FirebaseContext);

    const data = {
        Titre: '',
        Ingrédients: '',
        Recettes: '',
        Catégorie: '',
        CatégorieEntrée: '',
        CatégoriePlat: '',
        CatégorieDessert: '',
        Pseudo: '',
        Email: '',
        Password: '',
        Test:''
    }

    const [createdata, setcreatedata] = useState(data);

    const handleChange = e => {
        setcreatedata({...createdata, [e.target.id]: e.target.value });
    }

        const history = useHistory()

        const faireRedirection = () => { 
          let url = "/welcome"
          history.push(url)
        }

    /*const handleSubmit = e => {
        //↓ empecher le rechargement de la page
        e.preventDefault();
        //↓ on a destructuré pour recuperer les valeurs dessous
        console.log(firebase.user());
        const { Titre, Ingrédients, Recettes, Catégorie, CatégorieEntrée, CatégoriePlat, CatégorieDessert} = createdata;
        firebase.currentUser()
        .then( CurrentUser => {
            return firebase.CreateRecipe(CurrentUser.user.uid).set({
                //on peut aussi ecrire pseudo: pseudo
                //ici le champ a le meme nom
                Titre,
                Ingrédients,
                Recettes,
                Catégorie,
                CatégorieEntrée,
                CatégoriePlat,
                CatégorieDessert
            })
        })
            
            .then(() => {
                setcreatedata({...data})
                props.history.push('/welcome')
            })

    }*/

    const handleSubmit = e => {
        e.preventDefault()
        const qs = require('qs');
        axios.post('https://msprapi.000webhostapp.com/ajoutRecette.php',  qs.stringify({
        'nom_recette': Titre,
        'description':Description
        }))
        .then((res) => {
            faireRedirection()
        })
        .catch((error) => {
        console.error(error)
         })
    }

    const {Titre, Ingrédients, Description, Catégorie, CatégorieEntrée, CatégoriePlat, CatégorieDessert} = createdata;

    const btn = Titre === '' || Description === ''
    ? <button disabled>Créer la recette</button> : <button>Créer la recette</button>

    return (
        <div>
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className="formBoxRight">
                    <div className="formContent">
                        <form  onSubmit={handleSubmit}>
                            <div className="welcomePage2"></div><br />
                            <h2 className="centerG">Crée ta recette</h2>
                            <div className="inputBox">
                                <input onChange={handleChange} value={Titre} type="text" id="Titre" autoComplete="off" placeholder="Pates aux pates" required/>
                                <label htmlFor="Titre" className="center">Titre</label>
                            </div>
                            <div className="inputBox, centerG">
                                <label htmlFor="Catégorie" className="centerG">Catégorie</label>
                                <br /><br />
                                <select onChange={handleChange} type="text" id="Catégorie" autoComplete="off" required>
                                <option value={Catégorie}>Choisit une catégorie</option>
                                <option value={CatégorieEntrée}>Entrée</option>
                                <option value={CatégoriePlat}>Plat</option>
                                <option value={CatégorieDessert}>Dessert</option>                                </select> 
                            </div><br /><br />
                            <div className="inputBox, centerG">



                            </div><br /><br />

                            <div className="inputBox, centerG">
                                <label htmlFor="Recette" className="centerG">Description</label><br /><br />
                                <textarea rows="7" cols="150" onChange={handleChange} value={Description} type="text" id="Description" autoComplete="off" placeholder="1 - Faire bouillir de l'eau en ayant ajouté du sel" required/>
                            </div><br /><br /><br />
                            {btn}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Recette
