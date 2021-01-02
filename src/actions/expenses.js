import uuid from 'uuid';
import database from '../firebase/firebase';


// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expensesData = {}) => {
    return (dispatch) => {
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0
        } = expensesData;
        const expense = {description, note, amount, createdAt };
        console.log(expense);
        return database.ref('expenses').push(expense).then(
            (ref)=> {
                //console.log('after expense is pushed to store', ref.key);
                dispatch(addExpense({
                    id: ref.key,
                    ...expense
                }))
                console.log('after expense is pushed to store', ref.key);
            }
        ).catch((e)=>{
            console.log('database error', e);
        });
    };
};
// REMOVE_EXPENSE
export const removeExpense = (
    { 
        id 
    } = {}) => (
    {
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({id}) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).remove().then(
            ()=> {
                //console.log('after expense is pushed to store', ref.key);
                dispatch(removeExpense({
                    id
                }))
            }
        ).catch((e)=>{
            console.log('database error', e);
        });
    };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) =>({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

//export const startSetExpenses;
export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref('expenses').once('value').then(
            (snapshot)=> {
//                console.log('whats is in expenses:', snapshot.val());
                const expenses = [];
                snapshot.forEach(element => {
                    expenses.push({
                        id: element.key,
                        ...element.val()
                    });
                });
                dispatch(setExpenses(expenses));
                console.log('after expense is set to store',expenses);
            }
        ).catch((e)=>{
            console.log('database error', e);
        });
    };
};

