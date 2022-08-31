import React, { useState, useContext } from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import { FirebaseContext } from '../Firebase'

const Signup = (props) => {

    const firebase = useContext(FirebaseContext);

    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const [logindata, setlogindata] = useState(data);
    const [error, setError] = useState('');

    const handleChange = e => {
        setlogindata({...logindata, [e.target.id]: e.target.value });
    }

    const handleSubmit = e => {
        //↓ empecher le rechargement de la page
        e.preventDefault();
        //↓ on a destructuré pour recuperer les valeurs dessous
        const { email, password, pseudo } = logindata;
        firebase.signupUser(email, password)
        .then( authUser => {
            return firebase.user(authUser.user.uid).set({
                //on peut aussi ecrire pseudo: pseudo
                //ici le champ a le meme nom
                pseudo,
                email
            })
        })
        .then(() => {
            setlogindata({...data});
            props.history.push('/welcome')
        })
        .catch(error => {
            setError(error);
            setlogindata({...logindata});
        });
    }

    const {pseudo, email, password, confirmPassword } = logindata;

    const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword
    ? <button disabled>Inscription</button> : <button>Inscription</button>

    //gestion des erreurs
    const errorMsg = error !== '' && <span>{error.message}</span>;

    return (
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className="formBoxLeftSignup">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                        {errorMsg}

                        <br /><br /><br /><br /><br /><br />
                        <form onSubmit={handleSubmit}>
                            <h2>Inscription</h2>
                            <div className="inputBox">
                                <input onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete="off" required/>
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>
                            <div className="inputBox">
                                <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required/>
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            <div className="inputBox">
                                <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required/>
                                <label htmlFor="confirmPassword">Confirmer le Mot de passe</label>
                            </div>
                            {btn}
                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to="/login">
                                Déja inscrit ? Connectez vous.
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup