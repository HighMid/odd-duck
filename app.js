'use strict';

// Variables Initialization and Declaration

const allImgs = [
    { name: 'Bag', src: 'img/bag.jpg', altText: 'Picture of a two R2D2 luggage bags' },
    { name: 'Banana', src: 'img/banana.jpg', altText: 'A sliced banana' },
    { name: 'Bathroom', src: 'img/bathroom.jpg', altText: 'Ipad attached to toilet paper stand' },
    { name: 'Boots', src: 'img/boots.jpg', altText: '3D render yellow open toed boots' },
    { name: 'Breakfast', src: 'img/breakfast.jpg', altText: 'Breakfast inside a toaster over/coffee maker combo' },
    { name: 'Bubblegum', src: 'img/bubblegum.jpg', altText: 'Meatball bubble gum' },
    { name: 'Chair', src: 'img/chair.jpg', altText: 'Red chair with a bump on the seat' },
    { name: 'Cthulu', src: 'img/cthulhu.jpg', altText: 'Toy cthuhlu who looks like a mind flayer' },
    { name: 'Dog-duck', src: 'img/dog-duck.jpg', altText: 'Small dog with a toy duck beak' },
    { name: 'Dragon', src: 'img/dragon.jpg', altText: 'Dragon tail meat in a can' },
    { name: 'Pen', src: 'img/pen.jpg', altText: "Pen's with blue colored utensil caps" },
    { name: 'Pet-sweep', src: 'img/pet-sweep.jpg', altText: 'Broom sweeper attachments for humans and dogs' },
    { name: 'Scissors', src: 'img/scissors.jpg', altText: 'Scissors that can also be used to cut and take pizza slices' },
    { name: 'Shark', src: 'img/shark.jpg', altText: 'guy sleeping in a shark sleeping bag' },
    { name: 'Sweep', src: 'img/sweep.png', altText: 'Baby boy in a suit that resembles a floor sweeper' },
    { name: 'Tauntaun', src: 'img/tauntaun.jpg', altText: 'Boy inside a tauntaun sleeping bag' },
    { name: 'Unicorn', src: 'img/unicorn.jpg', altText: 'Delicious unicorn meat in a can' },
    { name: 'Water-can', src: 'img/water-can.jpg', altText: 'Watering can with a backwards neck' },
    { name: 'Wine-glass', src: 'img/wine-glass.jpg', altText: 'Wine glass thats only open on one side' },
];
const allImgInstances = [];
let usedImgs = [];

const leftRandImg = document.querySelector('section img:first-child');
const midRandImg = document.querySelector('section img:nth-child(2)');
const rightRandImg = document.querySelector('section img:nth-child(3)');
const Results = document.querySelector('article h2');
const listResults = document.querySelector('article ul');
const ImgStorageKey = "Img-storage-key";

let clicks = 0;
const maxClicks = 25;

let leftImgInstance = 0;
let midImgInstance = 0;
let rightImgInstance = 0;

// Constructor for images

function imageGen(name, src, altText, view = 0, click = 0){
    this.name = name;
    this.src = src;
    this.altText = altText;
    this.view = view;
    this.click = click;


}
function localImgStorage(){

    localStorage.setItem(ImgStorageKey, JSON.stringify(allImgInstances));
}

function loadImgFromStorage(){

    const storedImgText = localStorage.getItem(ImgStorageKey);

    if(storedImgText){
        parseImgText(storedImgText);
    }else {
        pushImg();
    }
    

}

function parseImgText(storedImgText){

    const storedImgObjects = JSON.parse(storedImgText);

    allImgInstances.length = 0;

    for(let ImgObject of storedImgObjects){
        const currentImg = new imageGen(ImgObject.name , ImgObject.src , ImgObject.altText, ImgObject.view, ImgObject.click)
        allImgInstances.push(currentImg);
    }
}

function pushImg(){
    for(let i=0; i < allImgs.length; i++){
        const images = allImgs[i];
        allImgInstances.push(new imageGen(images.name, images.src, images.altText));
    }
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
            renderChart();
            resultsButton.style.display = 'none'; 
        });
        
        localImgStorage();

        return; 
    }

    if(usedImgs.length < 3){
        usedImgs = allImgInstances.slice();
        randomImg(usedImgs);
    }
    

    leftImgInstance = usedImgs.pop();
    midImgInstance = usedImgs.pop();
    rightImgInstance = usedImgs.pop();


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
function renderChart(){

    const imgNames = [];
    const imgClicks = [];
    const imgViews = [];

    for(let i=0; i<allImgInstances.length; i++){

        const currentImg = allImgInstances[i];
        const imgName = currentImg.name;
        const imgClick = currentImg.click;
        const imgView = currentImg.view;

        imgViews.push(imgView);
        imgClicks.push(imgClick);
        imgNames.push(imgName);
    }

    const data = {
        labels: imgNames,
        datasets:   [{
            label: 'Likes',
            data: imgClicks,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)'
            ],
            borderWidth: 1
        },
        {
            label: 'Views',
            data: imgViews,
            backgroundColor: [
                'rgba(225, 159, 64, 0.2)'
            ],
            borderColor: [
                `rgb(255, 159, 64)`
            ],
            borderWidth: 1

        }
    ]}

    const config = {
        type: 'bar',
        data: data,
        option: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },

    };

    let canvasChart = document.getElementById('bar-chart');
    const barChart = new Chart(canvasChart, config);
}

function start(){
    leftRandImg.addEventListener('click' , handleLeftRandImg);
    midRandImg.addEventListener('click' , handleMidRandImg);
    rightRandImg.addEventListener('click' , handleRightRandImg);

    loadImgFromStorage();
    renderImg();
}

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
    for(let i=0; i<allImgInstances.length; i++) {
      const currentImg = allImgInstances[i];
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



start();