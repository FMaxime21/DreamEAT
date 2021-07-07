import React, {useState, Fragment, useContext, useEffect} from 'react'
import {FirebaseContext} from '../Firebase'
import Logout from '../Logout'
import Quiz from '../Quiz'
import Search from '../Search/search'

const Welcome = (props) => {

    const firebase = useContext(FirebaseContext);

    const [userSession, setUserSession] = useState(null);

    const [userData, setUserData] = useState('');

    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/');
        })

        if (userSession !== null) {
            firebase.user(userSession.uid)
                .get()
                .then(doc => {
                    if (doc && doc.exists) {
                        const myData = doc.data();
                        setUserData(myData);
                    }
                })
                .catch(error => {

                })
        }

        return () => {
            listener();
        }
    }, [userSession])

    //phase de sécurisation
    return userSession === null ? (
        <Fragment>
            <div className="loader"></div>
            <p>Loading...</p>
        </Fragment>
    ) : (
        <div>
            <div className="quiz-bg">
                <div className="container">
                    <Logout/>
                    <Quiz userData={userData}/>
                </div>
            </div>
            <div>
                <div className='slContainer2'>
                    <div className={"formBoxLeftFamille"}>
                    </div>
                    <div className="formBoxRight2">
                        <p className="fontRight">Avec DreamEAT, découvrez des recettes simples, mais efficaces. Avec la liste déroulante ci-dessous, choisissez un ingrédient que vous possédez et DreamEat se chargera d'afficher les recettes contenant celui-ci qui ont étés crées par et pour les utilisateurs. Nous cherchons à ce que chaque personne, qu'elle soit étudiante, dans la vie active avec tout types de revenus, puisse ne pas gaspiller une quelconque nourriture en la cuisinant dans une recette simple. N'hésitez plus et découvrez DreamEAT.</p>

                    </div>
                </div>
            </div>


            <div>
                <Search/>
            </div>

        </div>

    )
}

export default Welcome
