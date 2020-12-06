const square = function(x){
    return x*x;
}

//const squareArrow = (x) => {
//    return x * x;
//};

const squareArrow = (x) => x * x;

console.log(squareArrow(8));

function getFirstName(name){
    return name.split(' ')[0];
}
const getFirstNameArrow = (name) => name.split(' ')[0];
console.log(getFirstNameArrow("first second"));