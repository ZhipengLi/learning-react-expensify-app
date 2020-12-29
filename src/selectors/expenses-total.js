export default (expenses) => {
    if(!expenses || expenses.length<1){
        return 0;
    }
    return expenses.reduce((accu, exp) => {
        return accu+exp.amount;
    }, 0);
};