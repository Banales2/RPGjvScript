let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let intentory = ['stick'];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const Stats = document.querySelector('#stats');
const monsterHealthText = document.querySelector('#monsterHealth');
const monsterNameText = document.querySelector('#monsterName');
const weapons = [{
        name: 'stick',
        damage: 5,
        price: 0
    },{
        name: 'dagger',
        damage: 30,
        price: 30
    },{
        name: 'axe',
        damage: 50,
        price: 100
    },{
        name: 'sword',
        damage: 50,
        price: 200
    }
];

const monsters = [{
        name: 'slime',
        level: 2,
        health: 20
    }
    ,{
        name: 'fanged beast',
        level: 8,
        health: 60
    }
    ,{
        name: 'dragon',
        level: 20,
        health: 300
    }
];

// Initialize the game state
const locations = [
    {
        name: 'town square',
        'button text': ['Go to store', 'Go to cave', 'Fight dragon'],
        'button functions': [goStore, goCave, fightDragon],
        text: 'You are in the town square. You can see a sign for the store and a path leading to the cave.'
    },
    {
        name: 'store',
        'button text': ['Buy 10 health (10 gold)', `Buy weapon (30 gold)`, 'Go to town square'],
        'button functions': [buyHealth, buyWeapon, goTown],
        text: 'You enter the store.'
    },
    {
        name: 'cave',
        'button text': ['Fight slime', 'Fight fanged beast', 'Go to town square'],
        'button functions': [fightSlime, fightBeast, goTown],
        text: 'You are in a dark cave. You can hear a monster growling.'
    },
    {
        name: 'fight',
        'button text': ['Attack', 'Dodge', 'Run away'],
        'button functions': [attack, dodge, goTown],
        text: 'You are fighting a monster!'
    },{
        name: 'kill monster',
        "button text": ['Go town', 'Go town', 'Go town'],
        "button functions": [goTown, goTown, goTown],
        text: 'You defeated the monster! You gain gold and experience points.'
    },{
        name: 'lose',
        'button text': ['Replay?', 'Replay?', 'Replay?'],
        'button functions': [restart, restart, restart],
        text: 'LMAO you noob!'
    },{
        name: 'win',
        'button text': ['Replay?', 'Replay?', 'Replay?'],
        'button functions': [restart, restart, restart],
        text: 'You defeated the dragon! You are victorious! You can replay the game.'
    }
];

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = 'none';
    text.innerText = location.text;

    button1.innerText = location['button text'][0];
    button2.innerText = location['button text'][1];
    button3.innerText = location['button text'][2];
    
    button1.onclick = location['button functions'][0];
    button2.onclick = location['button functions'][1];
    button3.onclick = location['button functions'][2];
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update({
        ...locations[1],
        'button text': [
            'Buy 10 health (10 gold)',
            currentWeapon < weapons.length - 1 
              ? `Buy weapon (${weapons[currentWeapon + 1].price} gold)`
              : 'You already have the best weapon',
            'Go to town square'
        ]
    });
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if (gold >= 10) {
        health += 10;
        gold -= 10;
        healthText.innerText = `Health: ${health}`;
        goldText.innerText = `Gold: ${gold}`;
    } else {
        text.innerText = 'You do not have enough gold to buy health.';
    }
}

function buyWeapon() {
    if (gold >= weapons[currentWeapon+1].price && currentWeapon < weapons.length - 1) {
        gold -= weapons[currentWeapon + 1].price;
        currentWeapon++;
        goStore();
        text.innerText = `You bought a ${weapons[currentWeapon].name}.`;
        intentory.push(weapons[currentWeapon].name);
        text.innerText +=  `Your inventory: ${intentory.join(', ')}.`;
        goldText.innerText = gold;
        console.log(currentWeapon);
    }else if (currentWeapon >= weapons.length - 1) {
        text.innerText = 'You already have the best weapon.';
    }else {
        text.innerText = 'You do not have enough gold to buy a weapon.';
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}


function fightBeast() {
    fighting = 1;
    goFight();
}


function fightDragon() {
    fighting = 2;
    goFight();
}

 function goFight () {
    update(locations[3]);
    mHealth = monsters[fighting].health;
    monsterStats.style.display = 'block';
    Stats.style.display = 'block';
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = mHealth;
}

function attack() {
    text.innerText = `The ${monsters[fighting].name} attacks!`;
    text.innerText += ` You attack with your ${weapons[currentWeapon].name}.`;
    health -= monsters[fighting].level;
    mHealth -= weapons[currentWeapon].damage + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = mHealth;
    if (health <= 0) {
        lose();
    }else if (mHealth <= 0) {
        fighting === 2 ? win() : defeatMonster();
    }
}

function dodge() {
    text.innerText = `You dodge the attack! The ${monsters[fighting].name} misses.`;
}

function lose() {
    update(locations[5]);
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function restart() {
    health = 100;
    xp = 0;
    gold = 50;
    currentWeapon = 0;
    intentory = ['stick'];
    healthText.innerText = health;
    xpText.innerText = xp;
    goldText.innerText = gold;
    update(locations[0]);
}

function win() {
    update(locations[6]);
}