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
const monsterHealthText = document.querySelector('#monsterHealthText');
const monsterNameText = document.querySelector('#monsterNameText');
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
        damage: 100,
        price: 200
    }
]

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
        'button text': ['Buy 10 health (10 gold)', 'Buy weapon (30 gold)', 'Go to town square'],
        'button functions': [buyHealth, buyWeapon, goTown],
        text: 'You enter the store.'
    },
    {
        name: 'cave',
        'button text': ['Fight slime', 'Fight fanged beast', 'Go to town square'],
        'button functions': [fightSlime, fightBeast, goTown],
        text: 'You are in a dark cave. You can hear a monster growling.'
    }
];

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
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
    update(locations[1]);
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
        currentWeapon++;
        gold -= weapons[currentWeapon].price;
        text.innerText = `You bought a ${weapons[currentWeapon].name}.`;
        intentory.push(weapons[currentWeapon].name);
        text.innerText += ` Your inventory: ${intentory.join(', ')}.`;
        goldText.innerText = `Gold: ${gold}`;
    }else if (currentWeapon >= weapons.length - 1) {
        text.innerText = 'You already have the best weapon.';
    }else {
        text.innerText = 'You do not have enough gold to buy a weapon.';
    }
}

function fightSlime() {
    console.log('Fighting dragon');
}


function fightBeast() {
    console.log('Fighting dragon');
}


function fightDragon() {
    console.log('Fighting dragon');
}

