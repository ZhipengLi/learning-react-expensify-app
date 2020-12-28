import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import uuid from 'uuid';
import moment from 'moment';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT'});
    expect(state).toEqual([]);
});

test(`should remove expense by id`, () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test(`should not remove expense by id`, () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
});

test(`should add expense`, () => {
    const newExpense = {
        description: 'new description',
        note: 'new note',
        amount: 0,
        createdAt: moment(0), 
        id:'4'
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense: newExpense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, newExpense]);
});

test(`should edit expense`, () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id:'1',
        updates: {
            note: '1'
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([{...expenses[0], note: '1'}, expenses[1], expenses[2]]);
});

test(`should note edit expense`, () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id:'5',
        updates: {
            note: '5'
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});
