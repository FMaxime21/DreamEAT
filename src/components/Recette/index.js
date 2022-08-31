import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../Firebase';
import { useHistory } from "react-router-dom";
import Recipes from './recipes';
import Pagination from './pagination';

import axios from 'axios';

const Recette = (props) => {

    const firebase = useContext(FirebaseContext);
    const [image, setImage] = useState('')

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
        Test: '',
        Image: image,
        Tags: ''
    }

    const [dataRecipe, setDataRecipe] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(5);
    const [refresh, setRefresh] = useState(false);


    const [createRec, setCreateRec] = useState(true)
    const [createdata, setcreatedata] = useState(data);

  

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'dreameat')
        setLoading(true)
        const res = await fetch('https://api.cloudinary.com/v1_1/dreameat/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()
        setImage(file.secure_url)
        setLoading(false)
    }

    const handleChange = e => {
        setcreatedata({ ...createdata, [e.target.id]: e.target.value });
    }

    const history = useHistory()

    const faireRedirection = () => {
        let url = "/Recette"
        history.push(url)
    }

    const viewRecipes = () => {

    }

    // https://jsonplaceholder.typicode.com/posts
    useEffect(() => {
            const fetchRecipes = async () => {
                setLoading(true)
                const result = await axios.get('https://api.sheety.co/53569327778e2c8468e6ac1385ef8938/dbDreamEat/feuille1');
                setDataRecipe(result.data.feuille1)
                console.log("updated", result.data.feuille1)
                setLoading(false)
    
            };
    
                fetchRecipes()
                console.log('test',refresh)
            console.log("mounted")
        
    }, [setDataRecipe])

    console.log('Data on data recipe: ', dataRecipe)

    //get current recipes
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    console.log("First index :", indexOfFirstRecipe);
    console.log("Last index :", indexOfLastRecipe);

    const currentRecipes = dataRecipe.slice(indexOfFirstRecipe, indexOfLastRecipe)

    //Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

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
        const id = Date.now()
        const Rating = 'unrated'
        const Image = image
        /*const qs = require('qs');
        console.log(Titre)
        console.log(Description)
        const id = 'cd'
        axios.post('https://api.sheety.co/9784ddeb511a51a42e4b5f82f649116c/dreamEatApi/feuille1',  qs.stringify({
            id,Titre,Description
        }))
        .then((res) => {
            faireRedirection()
        })
        .catch((error) => {
        console.error(error)
         })*/
        let url = 'https://api.sheety.co/53569327778e2c8468e6ac1385ef8938/dbDreamEat/feuille1';
        let body = {
            "feuille1": {
                "id": id, "name": Titre, "description": Description, "image": Image, "rating": Rating
            }
        }
        console.log(body)
        fetch(url, {
            method: 'POST',
            "headers": {
                "content-type": "application/json",

            },
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .then(json => {
                // Do something with object
                console.log(json.feuille1);
            })
            .then((res) => {
                faireRedirection()
                window.location.reload();
            })
    }

    const { Titre, Ingrédients, Image, Tags, Rating, Description, Catégorie, CatégorieEntrée, CatégoriePlat, CatégorieDessert } = createdata;

    const btn = Titre === '' || Description === ''
        ? <button disabled>Créer la recette</button> : <button>Créer la recette</button>


    const view = () => {
        if (createRec === true) {
            return (
                <div>

                    <div className='signUpLoginBox'>
                        <div className='slContainer'>
                            <div className="formBoxRight">
                                <div className="formContent">
                                    <div>
                                        <button onClick={() => setCreateRec(true)}>
                                            Ajouter sa propre recette
                                        </button>

                                        <button onClick={() => {setCreateRec(false); setRefresh(true)}}>
                                            Voir toutes les recettes
                                        </button>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="welcomePage2"></div><br />
                                        <h2 className="centerG">Crée ta recette</h2>
                                        <div className="inputBox">
                                            <input onChange={handleChange} value={Titre} type="text" id="Titre" autoComplete="off" placeholder="Pates aux pates" required />
                                            <label htmlFor="Titre" className="center">Titre</label>
                                        </div>
                                        <div className="inputBox">
                                            <input onChange={handleChange} value={Tags} type="text" id="Tags" autoComplete="off" placeholder="Legumes" />
                                            <label htmlFor="Tags" className="center">Tags</label>
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
                                        <div className="">
                                            <h2>Upload Image</h2>
                                            <input
                                                type="file"
                                                name="file"
                                                placeholder="Upload an image"
                                                onChange={uploadImage}
                                            />
                                            {loading ? (
                                                <h3>Loading...</h3>
                                            ) : (
                                                <img src={image} style={{ width: '200px' }} />
                                            )}
                                        </div>
                                        <div className="inputBox, centerG">
                                            <label htmlFor="Recette" className="centerG">Description</label><br /><br />
                                            <textarea rows="7" cols="150" onChange={handleChange} value={Description} type="text" id="Description" autoComplete="off" placeholder="1 - Faire bouillir de l'eau en ayant ajouté du sel" required />
                                        </div><br /><br /><br />
                                        {btn}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>

                    <div className='signUpLoginBox'>
                        <div className='slContainer'>
                            <div className="">
                                <div className="formContent">
                                    <div>
                                        <button onClick={() => setCreateRec(true)}>
                                            Ajouter sa propre recette
                                        </button>

                                        <button onClick={() => {setCreateRec(false); setRefresh(true)}}>
                                            Voir toutes les recettes
                                        </button>
                                    </div>
                                    <h2 className="centerG">Toutes les recettes</h2>

                                    <Recipes dataRecipe={currentRecipes} loading={loading} />
                                    <Pagination
                                        recipesPerPage={recipesPerPage}
                                        totalRecipes={dataRecipe.length}
                                        paginate={paginate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }


    return (


        <div>

            {view()}
        </div>
    )
}

export default Recette
