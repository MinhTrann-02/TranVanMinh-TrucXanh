import { Card } from "./Card.js";
import { Label } from "./Label.js";

let label = new Label();
let score = 10000;
document.body.appendChild(label.elm);
label.elm.style.fontSize = '40px';
label.elm.style.color = 'wheat';
label.elm.style.margin = '20px'
label.elm.innerHTML = 'Score: ' + score;

let cardImages = Array.from({ length: 10 }, (_, index) => `images/image${index + 1}.png`);
cardImages = cardImages.concat(cardImages.slice(0));
let count = 0;
let row = -1;
const cards = [];
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
// shuffle(cardImages);
cardImages.forEach((src, index) => {
    if (count == 0) row++;
    let x = screenWidth / 2.3;
    let y = screenHeight / 2.3;
    let card = new Card(index, x, y, src);
    card.creatCard();
    movingCard(card.node.elm, index);
    cards.push(card);
    count++;
    if (count == 5) count = 0;
});


setTimeout(() => {
    cards.forEach(card => {
        card.node.elm.addEventListener('click', flipCard);
    })
}, 3000);


function movingCard(card, index) {
    gsap.to(card, {
        duration: 1,
        delay: index * 0.1,
        x: (index % 5 - 2) * 165,
        y: (Math.floor(index / 5) - 1.5) * 165,
        ease: 'elastic.out(1, 1)',
    });

}

const duration = 0.4;
let flippedCards = [];
let isClickEnabled = true;
function flipCard() {
    const selectedCard = this;
    let currentCard = cards.find((card) => card.node.elm == selectedCard);
    let cover = currentCard.cover.elm;
    let image = currentCard.image.elm;
    if (flippedCards.length < 2 && isClickEnabled) {
        gsap.to(cover, { scaleX: 0, duration, onComplete: () => handleSpamClick(currentCard) })
        gsap.to(image, {
            scaleX: 1, duration, delay: duration, onComplete: () => {
                if (flippedCards.length >= 2) checkMatch();
            }
        })
    }
}

function handleSpamClick(currentCard) {
    flippedCards.push(currentCard);
    if (flippedCards.length > 1) isClickEnabled = false;
}


let matchedPairs = 0;
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.id === card2.id) {
        flippedCards = [];
        flippedCards.push(card1)
        isClickEnabled = true;
    } else if (card1._imageSrc === card2._imageSrc) {
        TweenMax.to([card1.image.elm, card2.image.elm], 1, {
            scale: 1.2,
            opacity: 0,
            ease: Power2.easeInOut,
            onComplete: () => { isClickEnabled = true; }
        });
        score = updateScore(1000);
        matchedPairs++;
        if (matchedPairs === cardImages.length) {
            alert('Congratulations! You matched all pairs.');
            setTimeout(() => { location.reload(true); }, 2000);
        }
    } else {
        gsap.to(card1.image.elm, { scaleX: 0, duration })
        gsap.to(card2.image.elm, { scaleX: 0, duration, onComplete: () => resetCard(card1, card2) })
        score = updateScore(-500);
        if (score < 0) {
            alert('You lose, Good luck next time!');
            setTimeout(() => { location.reload(true); }, 1000);
        }
    }
    flippedCards = [];
}

function resetCard(card1, card2) {
    const resetProperties = { scaleX: 1, duration: duration };
    gsap.to(card1.cover.elm, resetProperties);
    gsap.to(card2.cover.elm, resetProperties);
    isClickEnabled = true;
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function updateScore(newUpdateScore) {
    let result = score + newUpdateScore;
    if (result < 0) result = 0;
    label.elm.innerHTML = 'Score: ' + result;
    return score + newUpdateScore;
}