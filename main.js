const STEPS = 2;
const PERSON_RADIUS = 10;
let winX = window.innerWidth;
let winY = window.innerHeight;
let peopleAmount = 1000;

let people = [];

function populatePeople(amount) {
    for (let i = 0; i < amount; i++) {
        let r_x = Math.round(Math.random()*winX);
        let r_y = Math.round(Math.random()*winY);
        people.push({infected: 0, x: r_x, y: r_y, dirX: 0, dirY: 0});
        // people.push({infected: 0, x: 350, y: 600, dirX: 1, dirY: 1});
    }
}

populatePeople(peopleAmount);


function setup() {
    createCanvas(winX, winY);
}

function draw() {
    // fill(100);
    clear();
    // rect(0,0,winX,winY);
    for (const person of people) {
        fill(255);
        if(person.infected == 1) {
            fill(50, 150, 50);
        }
        ellipse(person.x, person.y, PERSON_RADIUS*2, PERSON_RADIUS*2);
        fill(person.infected == 1 ? 255 : 0);
        text(person.infected, person.x-(PERSON_RADIUS*0.4), person.y+(PERSON_RADIUS*0.45));
    }
    process();
    show_info();
}

setInterval(() => {
    for (const key in people) {
        if(Math.random() > 0.8) {
            people[key].dirY = Math.round((Math.random()*2)-1);
            people[key].dirX = Math.round((Math.random()*2)-1);
        }
    }
}, 100);

function process() {
    for (const key in people) {
        people[key].x += people[key].dirX * STEPS;
        people[key].y += people[key].dirY * STEPS;

        if(people[key].x < 0) people[key].x = 0;
        else if (people[key].x > winX) people[key].x = winX;

        if(people[key].y < 0) people[key].y = 0;
        else if (people[key].y > winY) people[key].y = winY;

        if(people[key].infected == 1) {
            for (const p2_key in people) {
                if(people[p2_key].x > people[key].x-PERSON_RADIUS
                    && people[p2_key].x < people[key].x+PERSON_RADIUS
                    && people[p2_key].y > people[key].y-PERSON_RADIUS
                    && people[p2_key].y < people[key].y+PERSON_RADIUS) {
                    people[p2_key].infected = 1;
                }
            }
        }
    }
}

function mouseClicked() {
    people.shift();
    people.push({infected: 1, x: mouseX, y: mouseY, dirX: 0, dirY: 0});
}

function show_info() {
    document.querySelector('#txtPoblacionSana').innerHTML = people.filter(p => p.infected == 0).length;
    document.querySelector('#txtInfectados').innerHTML = people.filter(p => p.infected == 1).length;
    let risk = (people.filter(p => p.infected == 1).length / peopleAmount) * 100;
    document.querySelector('#txtRiesgo').innerHTML = risk.toFixed(2) + " %";
    if(risk >= 100) {
        document.querySelector('.mensaje_motivador').classList.add('show');
        document.querySelector('.info_menu').style.opacity = 0.8;
    } else {
        document.querySelector('.mensaje_motivador').classList.remove('show');
        document.querySelector('.info_menu').style.opacity = 1;
    }
}

let casos_covid = 1810000;
setInterval(() => {
    if(Math.random() > 0.5) {
        casos_covid++;
    }
    document.querySelector('.casos_covid').innerHTML = casos_covid;
}, 10);

document.querySelector('#btnVacunar').addEventListener('click', () => {
    setTimeout(() => {
        people = people.map(p => {
            p.infected = 0;
            return p;
        });
    }, 10);
})