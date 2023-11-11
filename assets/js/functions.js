const defaultCharacter = {
    name: '',
    life: 1,
    maxLife: 1,
    attack: 0,
    defense: 0
}

const createGuerreiro = (name) => {
    return {
        ...defaultCharacter,
        name: name,
        life: 100,
        maxLife: 100,
        attack: 10,
        defense: 12
    }
}

const createMago = (name) => {
    return {
        ...defaultCharacter,
        name: name,
        life: 70,
        maxLife: 70,
        attack: 18,
        defense: 8
    }
}

const createMonstroNivel1 = () => {
    return {
        ...defaultCharacter,
        name: 'Monstro Nível 1',
        life: 60,
        maxLife: 60,
        attack: 5,
        defense: 4
    }
}

const createMonstroNivel2 = () => {
    return {
        ...defaultCharacter,
        name: 'Monstro Nível 2',
        life: 130,
        maxLife: 130,
        attack: 15,
        defense: 10
    }
}

const stage = {
    fighter1: null,
    fighter2: null,
    fighter1El: null,
    fighter2El: null,

    start(fighter1, fighter2, fighter1El, fighter2El) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;

        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => {
            this.doAttack(this.fighter1, this.fighter2);

            document.querySelector('.attackButton').disabled = true;
            setTimeout(function () {
                document.querySelector('.attackButton').disabled = false;
            }, 1300);
        });

        this.update();
    },
    update() {
        // Fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} <span class="hp">${this.fighter1.life.toFixed(0)} HP</span>`;
        let f1Hp = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Hp}%`;
        // Fighter 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} <span class="hp">${this.fighter2.life.toFixed(0)} HP</span>`;
        let f2Hp = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Hp}%`;

    },
    doAttack(attacking, attacked) {
        if (attacking.life <= 0 || attacked.life <= 0) {
            log.addMessage('Tentando chutar cachorro morto	&#128514;	&#128514;	&#128514;')
            return;
        }

        const attackFactor = (Math.random() * 2).toFixed(2);
        const defenseFactor = (Math.random() * 2).toFixed(2);

        const actualAttack = attacking.attack * attackFactor;
        const actualDefense = attacked.defense * defenseFactor;

        if (actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            attacked.life = attacked.life < 0 ? 0 : attacked.life;
            log.addMessage(`<strong>${attacking.name}</strong> causou <strong>${actualAttack.toFixed(0)}</strong> de dano no <strong>${attacked.name}</strong>`);
        } else {
            log.addMessage(`<strong>${attacked.name}</strong> conseguiu defender!`)
        }

        if (attacking.life > 0 && attacked.life > 0) {
            setTimeout(() => {
                this.doMonsterAttack(attacked, attacking);
            }, 1200);
        } else {
            log.addMessage(`O <strong>${attacked.name}</strong> foi derrotado!`);

            if (attacked.name === 'Monstro Nível 1') {
                restartGame();
                setTimeout(() => {
                    log.addMessage(`Você tem um novo desafio...`);
                }, 1000);
            } else if (attacked.name === 'Monstro Nível 2') {
                log.addMessage(`Parabéns! Você derrotou o Monstro Nível 2 e venceu o jogo!`);
            } else {
                log.addMessage(`...`);
            }
            this.update();
        }

        this.update();
    },

    doMonsterAttack(attacked, attacking) {
        const monsterAttackFactor = (Math.random() * 2).toFixed(2);
        const monsterDefenseFactor = (Math.random() * 2).toFixed(2);

        const monsterActualAttack = attacked.attack * monsterAttackFactor;
        const monsterActualDefense = attacking.defense * monsterDefenseFactor;

        if (monsterActualAttack > monsterActualDefense) {
            attacking.life -= monsterActualAttack;
            attacking.life = attacking.life < 0 ? 0 : attacking.life;
            log.addMessage(`<strong>${attacked.name}</strong> causou <strong>${monsterActualAttack.toFixed(0)}</strong> de dano em <strong>${attacking.name}</strong>`);
        } else {
            log.addMessage(`<strong>${attacking.name}</strong> conseguiu defender o contra-ataque do monstro!`);
        }

        this.update();
    }

}

const log = {
    list: [],
    addMessage(msg) {
        this.list.push(msg);
        this.render();
    },
    render() {
        const logEl = document.querySelector('.log');
        logEl.innerHTML = '';

        for (let i in this.list) {
            logEl.innerHTML += `<li class="text-white">${this.list[i]}</li>`
        }

        logEl.scrollTop = logEl.scrollHeight;
    }
}