import React, { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../Firebase'

const Logout = () => {

    const firebase = useContext(FirebaseContext);

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if(checked){
            firebase.signoutUser();
        }
    }, [checked, firebase])

    const handleChange = event => {
        setChecked(event.target.checked);
    }


    return (
        <div  className="taille3">
        <div className="logoutContainer">
            <label className="switch">
                <input type="checkbox" onChange={handleChange}
                />
                <span className="slider round">
                </span>
                <h2 className="taille">DECONNEXION</h2>
            </label>
        </div>
        </div>
    )
}

export default Logout
