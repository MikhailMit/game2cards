(() => {

    let cardsWrap = document.querySelector('.memory-game__wrap')
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    const button = document.querySelector('.Btn-again');
    const startButton = document.querySelector('.btn-start');
    const totalCards = document.querySelector('input');
    const maineTitle = document.querySelector('h2');
    button.disabled = true;
    let timer = document.querySelector('.memory-game__timer');
    let countdown;
    let audiocard = document.querySelector('#card')
    let audioClick = document.querySelector('#click')
    let audioNeon03 = document.querySelector('#neon')

    function newCards(numder, dataValue) {
        let memoryCard = document.createElement('div');
        const frontFace = document.createElement('div');
        const backFace = document.createElement('div');
        memoryCard.classList.add('memory-card');
        frontFace.classList.add('front-face');
        backFace.classList.add('back-face');
        memoryCard.setAttribute('data-value', `${dataValue}`);
        frontFace.textContent = numder;
        memoryCard.append(frontFace, backFace);
        return memoryCard;
    };
    startButton.addEventListener('click', () => {
        addCards();
        letsBegin();
        startButton.disabled = true
        audioClick.play()

    });

    function addCards() {
        let numCards = totalCards.value;
        ((numCards >= 2 && numCards <= 10) && (numCards % 2 === 0)) ? numCards: numCards = 8;
        for (let i = 0; i < 2; i++) {
            for (let i = 1; i <= numCards; i++) {
                let createCard = newCards(i, i);
                cardsWrap.append(createCard);
            };
        };
    }

    function letsBegin() {
        let cards = document.querySelectorAll('.memory-card');
        timer.style.opacity = 1;
        button.disabled = true;
        let countOpenCard = 0;

        timer.style.textShadow = "0 0 5px #fff,0 0 10px #2ab69d,0 0 15px #2ab69d, 0 0 20px #2ab69d, 0 0 40px #2ab69d, 0 0 70px #2ab69d,0 0 100px #2ab69d"
        document.body.style.backgroundColor = '#121418';
        button.style.textShadow = '0 0 10px #fff, 0 0 40px #fdc536, 0 0 70px #fdc536';
        totalCards.classList.remove('active');
        maineTitle.textContent = 'let\'s try again';

        function lightOn() {
            button.disabled = false;
            timer.style.opacity = 0;
            maineTitle.style.color = '#fff';
            maineTitle.style.textShadow = '0 0 10px #fff, 0 0 20px #fff, 0 0 40px #2ab69d, 0 0 70px #2ab69d'
            totalCards.classList.add('active');
            audioNeon03.play();
        }

        function timerLauncher() {
            let timeInSec = 60;
            timer.textContent = timeInSec;

            if (timer.textContent > 0) {
                clearInterval(countdown)
            };
            countdown = setInterval(function() {
                if (timeInSec > 0) {
                    timer.innerHTML = --timeInSec;
                    if (timeInSec < 11) timer.style.textShadow = "0 0 5px #fff,0 0 10px #e65848,0 0 15px #e65848, 0 0 20px #e65848, 0 0 40px #e65848, 0 0 70px #e65848,0 0 100px #e65848"
                    if (timeInSec < 1) {
                        cards.forEach(card => card.classList.remove('flip'));
                        lightOn();
                        cards.forEach(card => card.removeEventListener('click', flipCard));
                    };
                };
            }, 1000);
            return timeInSec
        };
        (() => {
            cards.forEach(card => {
                    card.classList.remove('flip');
                }),
                timerLauncher();
        })();
        button.addEventListener('click', () => {
            letsBegin();
            audioClick.play()


        });

        function flipCard() {
            if (lockBoard) return;
            if (this === firstCard) return;
            this.classList.add('flip');
            audiocard.play()
            if (!hasFlippedCard) {
                hasFlippedCard = true;
                firstCard = this;
                audiocard.play()
                return;
            };
            secondCard = this;
            lockBoard = true;

            checkForMatch();
        };

        function checkForMatch() {
            let isMatch = firstCard.dataset.value === secondCard.dataset.value;
            isMatch ? disableCards() : unflipCards();
        };

        function disableCards() {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            (countOpenCard += 2);

            if (countOpenCard >= cards.length) {
                lightOn();
            };

            resetBoard();
        };

        function unflipCards() {
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                resetBoard();
            }, 1500);
        };

        function resetBoard() {
            [hasFlippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];
            audiocard.play()
        };
        (function shuffle() {
            let cardsArr = Array.from(cards);
            const arrLength = cardsArr.length
            let cardsArrNum = [];
            for (let i = 0; i < arrLength; i++) {
                cardsArrNum[i] = 1 + i;
            }
            for (let i = arrLength - 1; i > -1; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [cardsArrNum[i], cardsArrNum[j]] = [cardsArrNum[j], cardsArrNum[i]];
                cardsArr[i].style.order = cardsArrNum[i]
            }
        })();
        cards.forEach(card => card.addEventListener('click', flipCard));
    }
})();
