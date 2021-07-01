import React, { Component } from "react";
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Modal from 'react-modal';
import image from '../../images/imageExemple.jpg';

class Search extends Component {
    constructor(props){
      super(props)
      this.state = {
        IsOpen : true,
        selectValue:[],
        data:[],
        listOfDescription : [],
        isOpen: false,
        infoModal:null,
      }
    }
    componentDidMount() {
      axios.get('https://msprapi.000webhostapp.com/listeRecette.php')
      .then(response => {
      this.setState({data: response.data.results.Coupon})
      const listOfDescriptionTemp = this.state.data.map(dta => ({description: dta.description})) 
      this.setState({listOfDescription: listOfDescriptionTemp})
      }, error => {
      console.log(error);
      });
    }

    handleOpenModal = () => {
      this.state.isOpen === false ? this.setState({ isOpen: true }) : this.setState({ isOpen: false })
    }
    
    handleCloseModal = () => {
      this.setState({ showModal: false });
    }
    test = () => {
      //document.getElementById("test"+0).style.width = "200px"
      document.getElementById("test"+0)
    }
    getid = (monId) => {
      var id=monId;
      this.state.data.map((dta)=> {
        if(dta.id_recette === id){
          this.setState({infoModal: dta})
        }
      })
      this.state.isOpen === false ? this.setState({ isOpen: true }) : this.setState({ isOpen: false })
    }

    filtreGreg = () => {
        var nb = this.state.selectValue.length
        var tab = []
        for(let i = 0; i<nb; i++){
          tab[i] = this.state.selectValue[i].value
        }
        const descriptionToFilter = this.state.listOfDescription.map((dtf) => dtf.description)
        let tabResult = []
      if(nb === 1 ){
        tabResult = descriptionToFilter.filter(recette => recette.includes(tab[0]) === true)
      }
      if(nb === 2 ){
        tabResult = descriptionToFilter.filter(recette => recette.includes(tab[0]) === true && recette.includes(tab[1]))
      }
      if(nb === 3 ){
        tabResult = descriptionToFilter.filter(recette => recette.includes(tab[0]) === true && recette.includes(tab[1]) && recette.includes(tab[2]))
      }
      if(nb === 4 ){
        tabResult = descriptionToFilter.filter(recette => recette.includes(tab[0]) === true && recette.includes(tab[1]) && recette.includes(tab[2]) && recette.includes(tab[3]))
      }
      if(nb === 5 ){
        tabResult = descriptionToFilter.filter(recette => recette.includes(tab[0]) === true && recette.includes(tab[1]) && recette.includes(tab[2]) && recette.includes(tab[3]) && recette.includes(tab[4]))
      }


        let tabResultFinal = []
          this.state.data.map((dta,index) => {
           tabResult.map((tbr)=> {
             if(tbr === dta.description){
               tabResultFinal.push(dta)
             }
           })
            
          })
        
        return(
          tabResultFinal.map((rct,index) => {
            return(
              <div
              id={rct.id_recette}
              className={"recetteList" }
              onClick = {() => this.getid(rct.id_recette)}>
              <p style={{padding:"10px"}}>nom de la recette : {rct.nom_recette}</p>
              <img src = {image} width="100" height="70" style={{position:"relative",left:"180px"}}/>
              <Modal 
              style={customModal}
              isOpen={this.state.isOpen}
              onRequestClose={this.handleOpenModal}
              onCloseModal={this.handleOpenModal}
              contentLabel="Minimal Modal Example"
              ariaHideApp={false}
              >
              <p>nom de la recette : {this.state.infoModal!== null && this.state.infoModal!== undefined ? this.state.infoModal.nom_recette : ""}</p>
              <p>description de la recette : {this.state.infoModal!== null && this.state.infoModal!== undefined ? this.state.infoModal.description : ""}</p>
              <div style={{textAlign:"center"}} >
              <img src = {image} width="350" height="250"/>
              </div>
              </Modal>
              </div>
              
            )
          })
        )
      }

        newSelectValue = (event) => {
        this.setState({selectValue: event})
      }

////////////////////////////// RENDU DU COMPOSANT //////////////////////////////////

    render(){
      return(
          <div>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              placeholder="choose your ingredients ..."
              options={option} 
              onChange={(event) => this.newSelectValue(event)}/>
         {this.filtreGreg()}
          </div>
      )
    }
}
const animatedComponents = makeAnimated();

const option = [
  { value: 'apple', label: 'apple' },
  { value: 'oignon', label: 'oignon' },
  { value: 'tomate', label: 'tomate' },
  { value: 'orange', label: 'orange' },
  { value: 'carottes', label: 'carottes'},
  { value: 'riz', label: 'riz'},
  { value: 'patte', label: 'patte'},
  { value: 'carotte', label: 'carotte'},
]
const customModal= {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


export default Search;