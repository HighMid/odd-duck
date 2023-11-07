'use strict';

// Variables Initialization and Declaration

const allImg = [];
const leftRandImg = document.querySelector('section img:first-child');
const midRandImg = document.querySelector('section img:nth-child(2)');
const rightRandImg = document.querySelector('section img:nth-child(3)');
const Results = document.querySelector('article h2');
const listResults = document.querySelector('article ul');

let clicks = 0;
const maxClicks = 25;

let leftImgInstance = null;
let midImgInstance = null;
let rightImgInstance = null;

// Constructor for images

function imageGen(name, src, altText){
    this.name = name;
    this.src = src;
    this.altText = altText;
    this.view = 0;
    this.click = 0;
}

// Function to show images and tally clicks/views and repeat until otherwise

function renderImg(){

    if (clicks >= maxClicks) {

        
        leftRandImg.removeEventListener('click', handleLeftRandImg);
        midRandImg.removeEventListener('click', handleMidRandImg);
        rightRandImg.removeEventListener('click', handleRightRandImg);

       
        const resultsButton = document.getElementById('show-results');
        resultsButton.style.display = 'block';

       

        resultsButton.addEventListener('click', function() {
            renderResults();
            resultsButton.style.display = 'none'; 
        });

        return; 
    }

    randomImg(allImg);

    leftImgInstance = allImg[0];
    midImgInstance = allImg[1];
    rightImgInstance = allImg[2];


    leftRandImg.setAttribute('src', leftImgInstance.src);
    leftRandImg.setAttribute('alt', leftImgInstance.altText);

    midRandImg.setAttribute('src', midImgInstance.src);
    midRandImg.setAttribute('alt', midImgInstance.altText);

    rightRandImg.setAttribute('src', rightImgInstance.src);
    rightRandImg.setAttribute('alt', rightImgInstance.altText);

    leftImgInstance.view++;
    midImgInstance.view++;
    rightImgInstance.view++;

}

// Function to push all to an array, helps with clutter

function pushImg(){
    allImg.push(bag);
    allImg.push(banana);
    allImg.push(bathroom);
    allImg.push(boots);
    allImg.push(breakfast);
    allImg.push(bubblegum);
    allImg.push(chair);
    allImg.push(cthuhlu);
    allImg.push(dog_duck);
    allImg.push(dragon);
    allImg.push(pen);
    allImg.push(pet_sweet);
    allImg.push(scissors);
    allImg.push(sharks);
    allImg.push(sweep);
    allImg.push(tauntaun);
    allImg.push(unicorn);
    allImg.push(water_can);
    allImg.push(wine_glass);
}

// Function to shuffle the array

function randomImg(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
      }
}

// Function to tally views/clicks from user input and restart the process

function handleLeftRandImg() {
    leftImgInstance.click += 1;
    clicks += 1;
    renderImg();
}

// Function to tally views/clicks from user input and restart the process

function handleMidRandImg() {
    midImgInstance.click += 1;
    clicks += 1;
    renderImg();
}

// Function to tally views/clicks from user input and restart the process

function handleRightRandImg() {
    rightImgInstance.click += 1;
    clicks += 1;
    renderImg();
}

// Function to tally total views/clicks per image and display a list of them

function renderResults() {
    for(let i=0; i<allImg.length; i++) {
      const currentImg = allImg[i];
      const result = `${currentImg.name} had ${currentImg.view} views and was clicked ${currentImg.click} times.`;
      // console.log(result);
      const liElem = document.createElement('li');
      listResults.appendChild(liElem);
      liElem.textContent = result;
    }
}

// Not used right now but will be used to make a button

function handleResultsClick(){
    renderResults();
}

let bag = new imageGen('Bag', 'img/bag.jpg','Picture of a two R2D2 luggage bags');
let banana = new imageGen('Banana', 'img/banana.jpg', 'A sliced banana');
let bathroom = new imageGen('Bathroom', 'img/bathroom.jpg', 'Ipad attached to toilet paper stand');
let boots = new imageGen('Boots', 'img/boots.jpg', '3D render yellow open toed boots');
let breakfast = new imageGen('Breakfast', 'img/breakfast.jpg', 'Breakfast inside a toaster over/coffee maker combo');
let bubblegum = new imageGen('Bubblegum', 'img/bubblegum.jpg', 'Meatball bubble gum');
let chair = new imageGen('Chair', 'img/chair.jpg', 'Red chair with a bump on the seat');
let cthuhlu = new imageGen('Bag', 'img/cthulhu.jpg', 'Toy cthuhlu who looks like a mind flayer');
let dog_duck = new imageGen('Dog-duck', 'img/dog-duck.jpg', 'Small dog with a toy duck beak');
let dragon = new imageGen('Dragon', 'img/dragon.jpg', 'Dragon tail meat in a can');
let pen = new imageGen('Pen', 'img/pen.jpg', "Pen's with blue colored utensil caps");
let pet_sweet = new imageGen('Pet-sweet', 'img/pet-sweep.jpg', 'Broom sweeper attachments for humans and dogs');
let scissors = new imageGen('Scissors', 'img/scissors.jpg', 'Scissors that can also be used to cut and take pizza slices');
let sharks = new imageGen('Shark', 'img/shark.jpg', 'guy sleeping in a shark sleeping bag');
let sweep = new imageGen('Sweep', 'img/sweep.png', 'Baby boy in a suit that resembles a floor sweeper');
let tauntaun = new imageGen('Tauntaun', 'img/tauntaun.jpg', 'Boy inside a tauntaun sleeping bag');
let unicorn = new imageGen('Unicorn', 'img/unicorn.jpg', 'Delicious unicorn meat in a can');
let water_can = new imageGen('Water-can', 'img/water-can.jpg', 'Watering can with a backwards neck');
let wine_glass = new imageGen('Wine-glass', 'img/wine-glass.jpg', 'Wine glass thats only open on one side');

leftRandImg.addEventListener('click' , handleLeftRandImg);
midRandImg.addEventListener('click' , handleMidRandImg);
rightRandImg.addEventListener('click' , handleRightRandImg);


pushImg();
renderImg();