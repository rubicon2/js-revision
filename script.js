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

// How scope works in JS
// var is function scoped. If declared outside a function, will be 'global'
// const, let are block scoped, i.e. accessible until the { block } they are declared in is closed. If declared outside of any blocks, will be 'global'

// What are closures?
// TO DO: try to explain the entirely of closures and their usefulness
// objects 'enclosed' by a function and not returned can be used like private variables, methods, etc. 

// Problems with constructors
// People forgetting the 'new' keyword. Strange syntax (it's just a normal function but when you invoke it, you have to use the 'new' keyword). 
// If functions declared on individual objects and not prototype, uses a lot more memory. 
// instanceof does not work properly, prototype of an object can be changed after it has been created
// also returns true for any prototypes in chain, not just the last one i.e. the function used to create said object
console.log(bill instanceof Person);
// Enemy type inherits from Person
console.log(bill instanceof Enemy);
// Person type inherits from Object
console.log(bill instanceof Object);

// Describe private variables in factory functions and how they can be useful
// Create variables in factory function and then do not return as part of the object. Closure! The unreturned variables are 'enclosed' by the function that created the object.
// Stop polluting global namespace, encapsulate data for object and expose only what needs to be exposed.
// I.e. any variables used for the implementation of that object but not relevant to rest of code - encapsulate and hide away.

// Describe how we can implement prototypal inheritance with factory functions
// As above, use factory functions and Object.assign, i.e. object composition
// So one factory function will call another factory function, and then sellotape on some extra stuff, basically. 

// Describe immediately invoked function expressions (IIFEs)
// Used to implement module pattern. Using closure, hide away any variables/methods that aren't properties on the returned object.

// Explain the concept of namespacing and how factory functions help with encapsulation
// Namespacing, i.e. keeping groups of functions in separate and logical groups to avoid conflicts between similarly named functions.
// E.g. a math module that keeps functions like random
// How about a character module that creates characters and also has a function called random?
// Without namespacing, a call to random calls whichever was declared last. 
// With functions defined in various files, the result may not be as predictable as below. Possibly down to import order? 
function noNamespace() {
    return 0;
}

function noNamespace() {
    return 1;
}

alert(noNamespace());
