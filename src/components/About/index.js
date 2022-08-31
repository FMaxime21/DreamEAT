import React, { useState, useEffect, useContext, Fragment } from 'react'
import { Link } from 'react-router-dom'
import dream from '../../images/DreamCorp.png'
import {FirebaseContext} from '../Firebase'
import Logout from '../Logout'
import Quiz from '../Quiz'

const centerH2 = {
    textAlign: 'center',
    marginTop: '40px'
}

const centerImg = {
    display: "block",
    margin: "60px auto"
}

const About = (props) => {

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
                        <p className="fontRight">With DreamEAT, discover simple but effective recipes. With the drop-down list below, choose an ingredient you own and DreamEat will display recipes containing it that have been created by and for users. We want everyone, whether they are a student, a working person or a person with any kind of income, to be able to cook a simple recipe without wasting any food. Don't hesitate and discover DreamEAT.</p>

                    </div>
                </div>
            </div>

            <div className='quiz-bg'>
            <div className='container'>
                <h2 style={centerH2}>DreamEAT is a web application
                    created and developed by the DreamCorporation composed of 5 people.
                    The recent events since 2020 have shaken up all of us
                    our way of life. The consequences brought because of it
                    have made us react and decide to take back our life and health in hand.
                    This is where the application comes in.
                    People who do not know how to cook or are not in a condition to do so
                    can be satisfied with this application.
                </h2>
                <img style={centerImg} src={dream} alt="error page" />
            </div>
        </div>

        </div>
        

    )

/*
    return (
        <div className='quiz-bg'>
            <div className='container'>
                <h2 style={centerH2}>DreamEAT is a web application
                    created and developed by the DreamCorporation composed of 5 people.
                    The recent events since 2020 have shaken up all of us
                    our way of life. The consequences brought because of it
                    have made us react and decide to take back our life and health in hand.
                    This is where the application comes in.
                    People who do not know how to cook or are not in a condition to do so
                    can be satisfied with this application.
                </h2>
                <img style={centerImg} src={dream} alt="error page" />
            </div>
        </div>
    )
*/    
}

export default About