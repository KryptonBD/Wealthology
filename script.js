const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calWealthBtn = document.getElementById('calculate-wealth');

let data = [];

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

//Add new User in Data
function addData(obj){
    data.push(obj);

    updateDOM()
}

//Updating dom
function updateDOM(providedData = data) {
    //clearing existing data in HTML
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

    providedData.forEach(item =>{
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
function formatMoney(number){
    return '$'+ number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event Listeners
addUserBtn.addEventListener('click', getRandomUser);