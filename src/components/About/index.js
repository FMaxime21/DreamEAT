import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import dream from '../../images/DreamCorp.png'

const centerH2 = {
    textAlign: 'center',
    marginTop: '40px'
}

const centerImg = {
    display: "block",
    margin: "60px auto"
}

const About = () => {

    return (
        <div className='quiz-bg'>
            <div className='container'>
                <h2 style={centerH2}>DreamEAT est une application web
                    crée et développé par la DreamCorporation composée de 5 personnes.
                    Les récents événements connus depuis 2020 nous ont tous chamboulés
                    notre façon de vivre. 
                    <br></br>
                    Les conséquences apportées à cause de celui-ci
                    nous ont fait réagir et décidé de reprendre notre vie et santé en main.
                    L'application intervient justement dans ce cas-ci.
                    <br></br>
                    Les personnes ne savant pas cuisiner ou bien n'étant pas en état pour le faire
                    pourront être satsifait de cette application.
                </h2>
                <img style={centerImg} src={dream} alt="error page" />
            </div>
        </div>
    )
}

export default About