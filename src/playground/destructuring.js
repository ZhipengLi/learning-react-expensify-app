// const person  = {
//     name: 'Andrew',
//     age: 27,
//     location: {
//         city: 'Philadelphia',
//         temp: 92
//     }
// };

// const {name: firstName = 'Annoymous', age} = person;
// //const name = person.name;
// //const age = person.age;

// console.log(`${firstName} is ${age}.`);

// //console.log(`It's ${person.location.temp} in ${person.location.city}.`)
// const {city, temp: temperature } = person.location;

//     console.log(`It's ${city} in ${temperature}`);


// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const {name: publisherName = 'Self-Published'} = book.publisher;
// console.log(publisherName);

///////////////////////////////////////

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
//const address = [];
const [, , state = 'New York'] = address;

console.log(`You are in ${state}.`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [name, , mediumPrice] = item;
console.log(`A medium ${name} costs ${mediumPrice}`);