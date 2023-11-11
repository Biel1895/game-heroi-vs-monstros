const form = document.getElementById('hero-form');
let monster = createMonstroNivel1();

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const heroName = document.getElementById('hero-name').value;
    const selectedClassCard = document.querySelector('.class-card.selected');

    if (!selectedClassCard) {
        console.error('Classe de herói não selecionada');
        return;
    }

    const heroClass = selectedClassCard.getAttribute('data-class');
    let hero;

    if (heroClass === 'guerreiro') {
        hero = createGuerreiro(heroName);
    } else if (heroClass === 'mago') {
        hero = createMago(heroName);
    } else {
        console.error('Classe de herói inválida');
        return;
    }

    let heroImage = document.getElementById('hero-image');
    heroImage.src = `./assets/img/${heroClass}.svg`;

    let monsterImage = document.getElementById('monster-image');
    const attackButton = document.querySelector('.attackButton');

    attackButton.addEventListener('click', () => {
        if (hero.life > 0 && monster.life > 0) {
            heroImage.classList.add('jump-animation');
            setTimeout(function () {
                monsterImage.classList.add('jump-animation');
            }, 300);
            setTimeout(function () {
                heroImage.classList.remove('jump-animation');
            }, 1000);
            setTimeout(function () {
                monsterImage.classList.remove('jump-animation');
            }, 1100);
        }
    });

    document.querySelector('.fightarea').classList.remove('hidden');
    document.querySelector('.log').classList.remove('hidden');
    document.querySelector('.rodape').classList.remove('d-flex');
    document.querySelector('.rodape').classList.add('hidden');
    form.classList.add('hidden');

    stage.start(
        hero,
        monster,
        document.querySelector('#char'),
        document.querySelector('#monster'),
    );
});

document.addEventListener('DOMContentLoaded', function () {
    const classCards = document.querySelectorAll('.class-card');

    classCards.forEach(function (card) {
        card.addEventListener('click', function () {
            classCards.forEach(function (c) {
                c.classList.remove('selected');
            });

            this.classList.add('selected');
        });
    });

    let gameMusic = document.getElementById('game-music');
    let gameStart = document.getElementById('game-start');
    let buttonStart = document.getElementById('submit-hero');

    document.addEventListener('click', () => {
        gameMusic.play();
    });

    gameMusic.addEventListener('ended', () => {
        gameMusic.currentTime = 0; // Reinicia o tempo de reprodução para o início
        gameMusic.play();
    });

    buttonStart.addEventListener('click', () => {
        const heroName = document.getElementById('hero-name').value;
        const selectedClassCard = document.querySelector('.class-card.selected');

        if (heroName.trim() !== '' && selectedClassCard) {
            gameStart.play();
        } else {
            console.error('Nome do herói e/ou classe não selecionados');
        }
    });
});

const attackButton = document.querySelector('.attackButton');


attackButton.addEventListener('click', () => {
    let gameAttackSom = document.getElementById('game-attack');
    let gameAttackSom2 = document.getElementById('game-attack2');
    gameAttackSom.play();
    function reproduzirComAtraso() {

        setTimeout(function () {
            gameAttackSom2.pause();
            gameAttackSom2.currentTime = 0;
            gameAttackSom2.play();
        }, 550);
    };
    reproduzirComAtraso();

    heroImageContent.classList.add('jump-animation');

    setTimeout(function () {
        heroImageContent.classList.remove('jump-animation');
    }, 600);
});

function restartGame() {
    monster = createMonstroNivel2();
    hero = stage.fighter1;

    hero.life = hero.maxLife;
    monster.life = monster.maxLife;

    let monsterImagem = document.querySelector('.fighter-image-monster');
    monsterImagem.src = `./assets/img/monstro2.svg`;

    stage.fighter2 = monster;
};

