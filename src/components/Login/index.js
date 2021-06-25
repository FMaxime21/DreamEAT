import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'

const Login = (props) => {

    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if(password.length > 5 && email !== '')
        {
            setBtn(true);
        }
        else if(btn === true)
        {
            setBtn(false);
        }
    },//La fonction fléchée va s'éxecuté qu'une seule fois avec []
    [password, email])

    const handleSubmit = e => {
        e.preventDefault();
        
        firebase.loginUser(email, password)
        .then(user => {
            props.history.push('/welcome');
        })
        .catch(error => {
            setError(error);
            // Pour vider le formulaire. Ne sers à rien ici.
            setEmail('');
            setPassword('');
        })
    }

    return (
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className="formBoxLeftLogin">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                        {error !== '' && <span>{error.message}</span>}
                        <br /><br /><br /><br /><br /><br />
                        <form onSubmit={handleSubmit}>
                            <h2>Connexion</h2>
                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input onChange={e => setPassword(e.target.value)} value={password} type="password" autoComplete="off" required/>
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}
                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to="/Signup">
                                Nouveau sur ce site ? Inscrivez vous maintenant.
                            </Link>
                            <br />
                            <Link className='simpleLink' to="/ForgetPassword">
                                Mot de passe oublié ? Récupérer le ici.
                            </Link>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default Login
