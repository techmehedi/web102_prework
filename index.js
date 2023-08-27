// Disclaimer: I Typed starter code up again myself to make code simplier for me

// Import the JSON data about the crowd-funded games from the games.js file
import GAMES_DATA from './games.js';

// Create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// Remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// Create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game-card');
        gameDiv.innerHTML = `
            <img src="${games[i].img}" class="game-img">
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>`;
        gamesContainer.appendChild(gameDiv);
    }
}

// Initially, add all games to the page
addGamesToPage(GAMES_JSON);

// Challenge 4: Summary statistics
const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((sum, game) => sum + game.backers, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString();

const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;

// Challenge 5: Filtering games
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
}

function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

// Challenge 7: Top-funded games
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((a, b) => b.pledged - a.pledged);
const [firstGame, secondGame, ...restGames] = sortedGames;

const firstGameElement = document.createElement('p');
firstGameElement.innerHTML = firstGame.name;
firstGameContainer.appendChild(firstGameElement);

const secondGameElement = document.createElement('p');
secondGameElement.innerHTML = secondGame.name;
secondGameContainer.appendChild(secondGameElement);
