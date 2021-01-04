import uuid from 'uuid';
import database from '../firebase/firebase';


// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expensesData = {}) => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      const {
          description = '', 
          note = '', 
          amount = 0, 
          createdAt = 0
      } = expensesData;
      const expense = {description, note, amount, createdAt };
      console.log(expense);
      return database.ref(`users/${uid}/expenses`).push(expense).then(
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
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(
            ()=> {
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
export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(
          ()=> {
              //console.log('after expense is pushed to store', ref.key);
              dispatch(editExpense(id, updates));
          }
      ).catch((e)=>{
          console.log('database error', e);
      });
    };
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

//export const startSetExpenses;
export const startSetExpenses = () => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database.ref(`users/${uid}/expenses`).once('value').then(
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

