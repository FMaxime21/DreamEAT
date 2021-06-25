import React, { useRef, useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const Landing = () => {

    const[btn, setBtn] = useState(false);

    const refWolverine = useRef(null);

    useEffect(() => {
      refWolverine.current.classList.add("startingImg");
      setTimeout(() => {
        refWolverine.current.classList.remove("startingImg");
        setBtn(true);
      },)

    }, [])

    const displayBtn = btn && (
      <Fragment>
        <div className="leftBox">
          <table className="margin">
            <tr>
            <td className="taille">
          <Link className="btn-welcome" to="/signup" >Inscription</Link>
          </td>
          </tr>
          </table>
        </div>
        <div className="rightBox">
        <table className="margin">
            <tr>
            <td className="taille">
          <Link className="btn-welcome" to="/login">Connexion</Link>
          </td>
          </tr>
          </table>
        </div>
      </Fragment>
    )

    return (
              <main ref={refWolverine} className="welcomePage">
                {displayBtn} 
              </main>
    );
  }
  
  export default Landing;

  /*
                <td className="taille2">
              <h1>Pour se connecter :</h1>
              </td>*/