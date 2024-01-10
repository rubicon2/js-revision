// Prototypal inheritance
function Person(name = "Some Default Name", age = 0) {
    this.name = name;
    this.age = age;
}

Person.prototype.sayName = function() {
    console.log(`Hi, I'm ${this.name}`);
}

let dave = new Person("Dave", 27);
dave.sayName();

function Enemy(name = "Some Default Enemy Name", age = 0, weapon = "Some Default Weapon") {
    this.name = name;
    this.age = age;
    this.weapon = weapon;
}

Object.setPrototypeOf(Enemy.prototype, Person.prototype);

Enemy.prototype.attack = function(target) {
    console.log(`${this.name} is attacking ${target.name} with ${this.weapon}!`);
}

let bill = new Enemy("Bill", 32, "a mega laser");
bill.sayName();
bill.attack(dave);

console.log(Object.getPrototypeOf(Person.prototype));
console.log(Object.getPrototypeOf(Enemy.prototype));

// Function invocation, 'this' refers to window
function fnInvocation() {
    alert(this);
}
fnInvocation();

// Method invocation, 'this' refers to calling object
Enemy.prototype.methodInvocation = function() {
    console.log('Enemy details: ', this);
}
bill.methodInvocation();

// Create a new object with existing object as blueprint/template
let jimmy = Object.create(bill);
jimmy.name = "Jimmy";
jimmy.attack(dave);

// Factory functions
function factoryPerson(name, age) {
    // privateVar not available anywhere else except inside this object
    let privateVar = name.split('');
    return { 
        name, 
        age,
        sayName: () => console.log(`I am a factory person and my name is ${name}! I have a private variable that says: ${privateVar[0]}!`)
    };
}

// Object composition, i.e. factory inheritance
function factoryEnemy(name, age, weapon) {
    return Object.assign({
        weapon,
        attack: (target) => console.log(`${name} is attacking ${target.name} with ${weapon}!`)
    }, factoryPerson(name, age))
}

let sabrina = factoryPerson("Sabrina", 28)
let jonny = factoryEnemy("Jonny", 32, "a baguette");

sabrina.sayName();
jonny.sayName();
jonny.attack(sabrina);

// Immediately invoked function expressions - i.e. module pattern (from before js modules existed?)
const myModule = function() {
    const myPrivateMethod = function(someArg) {
        console.log(`Wow it's a private method on myModule! Called with an argument of: ${someArg}.`);
    };

    const myPublicMethod = function(someArg) {
        console.log(`Wow it's my public method, called with an argument of: ${someArg}.`);
        console.log(`But this module has a private method called myPrivateMethod which can't be called externally.`);
        myPrivateMethod(someArg);
    };

    return { myPublicMethod };
}();

myModule.myPublicMethod('BURGER PLUGS');

function factoryVector(x, y) {
    return { x, y };
}

let v1 = factoryVector(0, 0);
let v2 = factoryVector(2, 5);
console.log('v1: ', v1);
console.log('v2: ', v2);

// Destructuring assignment -  What a great way to swap the values of two (or more) variables! No temp variables required. 
[v1, v2] = [v2, v1];
console.log('v1: ', v1);
console.log('v2: ', v2);
