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
      /*axios.get('https://msprapi.000webhostapp.com/listeRecette.php')
      .then(response => {
        
      console.log('response')
      this.setState({data: response.data.results.Coupon})
      const listOfDescriptionTemp = this.state.data.map(dta => ({description: dta.description})) 
      this.setState({listOfDescription: listOfDescriptionTemp})
      }, error => {
      console.log(error);
      });*/
      console.log("ded")
      let url = 'https://api.sheety.co/9784ddeb511a51a42e4b5f82f649116c/dreamEatApi/feuille1';
      fetch(url)
      .then((response) => response.json())
      .then(json => {
        // Do something with the data
        console.log(json.feuille1);
        console.log('response')
        this.setState({data: json.feuille1})
        const listOfDescriptionTemp = this.state.data.map(dta => ({description: dta.description})) 
        this.setState({listOfDescription: listOfDescriptionTemp})
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

    filtre = () => {
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
                <div className={"center1"}>
              <div
              id={rct.id_recette}
              className={"recetteList" }
              onClick = {() => this.getid(rct.id_recette)}>
              <p   style={{padding:"10px"}}>nom de la recette : {rct.nomRecette}</p>
              <img src = {image} width="100" height="70" style={{position:"relative"}}/>
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
                  formatGroupLabel={formatGroupLabel}
                  onChange={(event) => this.newSelectValue(event)}/>
         {this.filtre()}
          </div>
      )
    }
}
const animatedComponents = makeAnimated();

const groupedOptions = [
    { label: 'legume', options: [
            { value: 'oignon', label: 'oignon' },
            { label: 'courgette', options: 'courgette'},
            { label: 'carottes', options: 'carottes'},
            { label: 'carotte', options: 'carotte'},
        ]},
    { label: 'fruit', options: [
            { value: 'apple', label: 'apple' },
            { label: 'orange', options: 'orange'},
            { label: 'tomate', options: 'tomate'},
            { label: 'pomme', options: 'pomme'},
        ]},
    { label: 'féculent', options: [
            { value: 'patte', label: 'patte' },
            { label: 'riz', options: 'riz'},
            { label: 'pâte', options: 'pâte'},
        ]}


]
const formatGroupLabel = data => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};

const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
};
const option = [
  { value: 'pomme', label: 'pomme' },
  { value: 'oignon', label: 'oignon' },
  { value: 'tomate', label: 'tomate' },
  { value: 'orange', label: 'orange' },
  { value: 'riz', label: 'riz'},
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