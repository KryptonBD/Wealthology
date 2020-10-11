const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calWealthBtn = document.getElementById('calculate-wealth');

let data = [];
let tempData = 0;

getRandomUser();
getRandomUser();
getRandomUser();
/*
Fetching User and adding Money
*/
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const reData = await res.json();

    let user = reData.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 10000000)
    };

    console.log(newUser);
    addData(newUser);
}

//Double Everyone Money
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 }
    })

    updateDOM();
}


//Sort User by Richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();

}

//Show Millonaries
function showMillionaries() {
    data = data.filter(user => user.money >= 1000000);

    updateDOM();
}

//Calculate Total Wealth
function calculateWealth() {
    let wealth = data.reduce((acc, user) => (acc += user.money), 0);

    if (tempData != wealth) {
        tempData = wealth;
        const wealthEl = document.createElement('div');
        wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
        main.appendChild(wealthEl);
    }

}

//Add new User in Data
function addData(obj) {
    data.push(obj);

    updateDOM()
}

//Updating dom
function updateDOM(providedData = data) {
    //clearing existing data in HTML
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>
        ${formatMoney(
            item.money
        )}`;
        main.appendChild(element);
    })
}

//Formating Number as Money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionBtn.addEventListener('click', showMillionaries);
calWealthBtn.addEventListener('click', calculateWealth);