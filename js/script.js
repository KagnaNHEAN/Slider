'use strict';
/*********************************Mise en place des photos*********************/
var slides =
[
  {image: 'images/image1.jpg' , legend: 'Angkor Vat'                 },
  {image: 'images/image2.jpg' , legend: 'Angkor Vat vue du ciel'     },
  {image: 'images/image3.jpg' , legend: 'Capital Cambodge'           },
  {image: 'images/image4.jpg' , legend: 'Couché du soleil sur Angkor'},
  {image: 'images/image5.jpg' , legend: 'Un moine bouddhiste'        },
  {image: 'images/image6.jpg' , legend: 'Un paysan'                  },
  {image: 'images/image7.jpg' , legend: 'Racine géante'              },
  {image: 'images/image8.jpg' , legend: 'Paysage campagne'           },
  {image: 'images/image9.jpg' , legend: 'Apsara'                     },
  {image: 'images/image10.jpg' , legend: 'Une facette d\'Angkor'     }
];

/*****************************Fonctions du caroussel***************************/
//Objet contenant l'état du carrousel
var state =
{
  index: 0,
  timer: null
};

//Fonction suivant
function onSliderNext() {
  state.index++;

  if(state.index == slides.length){
    state.index = 0;
  }
  //Mise à jour de l'affichage
  refreshSlider(); //il faut la créer plus tard
}

//Fonction précédent
function onSliderPrevious() {
  state.index--;
  if(state.index = -1){
    state.index = slides.length - 1;
  }
  refreshSlider();
}

//Fonction rafraîchir
function refreshSlider() {
  var sliderImage = document.querySelector('#slider img');
  var sliderLegend = document.querySelector('#slider figcaption');

  sliderImage.src = slides[state.index].image;
  sliderLegend.textContent = slides[state.index].legend;
}

//Fonction utilitaire pour gérer le hasard
function getRandomInteger(min,max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
}

function onSliderRandom() {
  var inDex;
  do {
    inDex = getRandomInteger(0, slides.length - 1); //Récuparation n° slide aléatoire différent de l'actuel
  }
  while(inDex == state.index);
  state.index = inDex;
  refreshSlider();
}

//Fonction cacher et afficher barre d'outils
var barreOutils;
var button;

function onClickButton() {
  barreOutils.classList.toggle('hide'); //La méthode .toggle() va ajouter ou supprimer la classe (tel un interrupteur).
}

//Fonction play
function playSlider() {
  state.timer = setInterval(onSliderNext, 2500)

  var iconElement = document.querySelector('#sliderPlay i'); //Switch sur l'icône pause
  iconElement.classList.add('fa-pause');
  iconElement.classList.remove('fa-play');
  iconElement.textContent = ' Pause';
}

//Fonction pause
function pauseSlider() {
  clearInterval(state.timer);
  state.timer = null;

  var iconElement = document.querySelector('#sliderPlay i'); //Switch sur l'icône play
  iconElement.classList.add('fa-play');
  iconElement.classList.remove('fa-pause');
  iconElement.textContent = ' Play';
}

//Condition si caroussel est en pause ou play qui indique au slider quoi faire
 function onSliderToggle() {
   if(state.timer == null) {
     playSlider();
   } else {
     pauseSlider();
   }
 }

/*Fonction pour passer photos avec touche espace et activer play pause avec
la propriété keyCode qui est une propriété de l'objet event d'où
le 'e' en argument dans la fonction. 37 = touche gauche, 39 = touche droite,
32 = touche espace*/
function onKeyDown(e) {
  switch(e.keyCode) {
    case 37:
      onSliderPrevious();
      break;

    case 39:
      onSliderNext();
      break;

    case 32:
      onSliderToggle();
      break;
  }
}

/*******************************Code Principal*********************************/

/*On fait une fonction qui regroupe tout le déroulement du slider en appliquant
l'event sur l'objet document qui est le 'DOMContentLoaded' et en 2ème argument
on passe une fonction anonyme*/
document.addEventListener('DOMContentLoaded', function()
{
  var buttonNext = document.querySelector('#sliderNext');
  buttonNext.addEventListener('click', onSliderNext);

  var buttonPrev = document.querySelector('#sliderPrev');
  buttonPrev.addEventListener('click', onSliderPrevious);

  var buttonRandom = document.querySelector('#sliderR');
  buttonRandom.addEventListener('click', onSliderRandom);

  var buttonPlay = document.querySelector('#sliderPlay');
  buttonPlay.addEventListener('click', onSliderToggle);

  button = document.querySelector('#toolbarToggle');
  button.addEventListener('click', onClickButton);
  barreOutils = document.querySelector('ul'); //Pour activer la fonction onClickButton

  document.addEventListener('keyDown', onKeyDown); //Pour activer les touche clavier sur le BOM

  refreshSlider(); //Pour afficher une image dès le début
});
