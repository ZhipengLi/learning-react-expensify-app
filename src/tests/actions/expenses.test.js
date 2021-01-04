import { configure } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    startAddExpense, 
    addExpense, 
    editExpense, 
    removeExpense, 
    setExpenses, 
    startSetExpenses, 
    startRemoveExpense ,
    startEditExpense
} from '../../actions/expenses';

import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';
import { connect } from 'react-redux';

const uid = 'thisismytestuid';
const createMockStore = configureMockStore([thunk]);
const defaultAuthState = {auth: {uid }};

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt})=>{
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(()=>{done()});
});

test('should setup remove expense action object', () => {
    const action = removeExpense( {id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});

// test('should remove expense from database and store', (done) => {
//     const store = createMockStore({});
//     const expenseData = {
//         description: 'Mouse',
//         amount: 3010,
//         note: 'This one is better',
//         createdAt: 1000
//     };
//     store.dispatch(startAddExpense(expenseData)).then(() => {
//         const actions = store.getActions();
//         //return database.ref(`expenses/${actions[0].expense.id}`).once('value');
//     }).then((snapshot) => {
//         const actions = store.getActions();
//         //console.log("state:", store.getState().expenses);
//         return store.dispatch(startRemoveExpense(actions[0].expense.id));
//     }).then(
//         () => {
//             const state = store.getState();
//             expect(state.expenses).toBe(undefined);
//             done();
//         }
//     ).catch((e)=>{
//         console.log('test error:', e);
//     });
// });

test(`should remove expense from firebase`, (done) => {
    const store = createMockStore( defaultAuthState );
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({id})).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toBeFalsy();
        done();
    });;
});


test('should setup edit expense action object', () => {
    const action = editExpense('123abc', {note: 'some note'});
    expect(action).toEqual({
        type:'EDIT_EXPENSE',
        id: '123abc',
        updates: {note: 'some note'}
    });
});

test(`should edit expense from firebase`, (done) => {
    const store = createMockStore(defaultAuthState);
    let id = expenses[0].id;
    const updates = { amount: 21045 };
    //expense.description = 'updated note';

    store.dispatch(startEditExpense(id, updates)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    });;
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 3010,
        note: 'This one is better',
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    }).catch((e)=>{
        console.log('test error:', e);
    });
});

test('should add expense to database and store without default value', () => {
    const store = createMockStore(defaultAuthState);
    const defaultData =  {
        description : '', 
        note : '', 
        amount : 0, 
        createdAt : 0
    };
    store.dispatch(startAddExpense(undefined)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultData);
        done();
    }).catch((e)=>{
        console.log('test error:', e);
    });
});

test('should setup set expense action object with data', ()=>{
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test(`should fetch the expense from firebase`, (done)=> {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(()=>{
        const actions = store.getActions();
        //expect(actions[0]).toEqual({
        //    type: 'SET_EXPENSES',
        //    expenses
        //});
        done();
    });
});

