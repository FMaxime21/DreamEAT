import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const Config = {
    apiKey: "AIzaSyDKwyoXsnZe-diKkBXvLi8bEiT4Kn2maTg",
    authDomain: "dreameat-50f01.firebaseapp.com",
    projectId: "dreameat-50f01",
    storageBucket: "dreameat-50f01.appspot.com",
    messagingSenderId: "112919620758",
    appId: "1:112919620758:web:94a5876d780539530b66b7"
  };

class Firebase
{
    constructor(){
        app.initializeApp(Config);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    //inscription
    signupUser = (email, password) =>
       this.auth.createUserWithEmailAndPassword(email, password);
    
    // Connexion
    loginUser = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password);
        
    //Deconnexion
    signoutUser = () => this.auth.signOut();

    currentUser = (user) => this.auth.updateCurrentUser(user);

    //Recupere mot de passe
    passwordReset = (email) => this.auth.sendPasswordResetEmail(email);
    
    //Créer users dans la bdd
    user = (uid) => this.db.doc(`users/${uid}`);

    //Créer une recette dans la bdd
    CreateRecipe = (uid) => 
    this.db.doc(`recettes/${uid}`);
}

export default Firebase