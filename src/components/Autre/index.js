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
                        <p className="fontRight">With DreamEAT, discover simple but effective recipes. With the drop-down list below, choose an ingredient you own and DreamEat will display recipes containing it that have been created by and for users. We want everyone, whether they are a student, a working person or a person with any kind of income, to be able to cook a simple recipe without wasting any food. Don't hesitate and discover DreamEAT.</p>

                    </div>
                </div>
            </div>

        </div>

    )
}

export default Welcome

/*
<div>
    <Search/>
</div>
*/