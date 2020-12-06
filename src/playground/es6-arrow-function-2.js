//const { multiply } = require("lodash");

const add = (a,b)=>{
    return a+b;
};

console.log(add(55,1,1001));

const user = {
    name:'Andrew',
    cities:['Philadelphia', 'New York', 'Dublin'],
    printPlacesLived(){
        var cityMessages = this.cities.map(
            (city)=>{
                return this.name + ' has live in '+city;
            }
        );
        return cityMessages;
    }
};
console.log(user.printPlacesLived());

const multiplier = {
    numbers:[1,2,3],
    multiplyBy:2,
    multiply(){
        return this.numbers.map((num)=>num*this.multiplyBy);
    }
};
console.log(multiplier.multiply());