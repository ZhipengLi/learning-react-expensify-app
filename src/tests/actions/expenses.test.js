import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense( {id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', {note: 'some note'});
    expect(action).toEqual({
        type:'EDIT_EXPENSE',
        id: '123abc',
        updates: {note: 'some note'}
    });
});

test('should setup add expense action object with provided values', () => {
    const expenseDate = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'This was last months rent',
    };
    const action = addExpense(expenseDate);
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense: {
            ...expenseDate,
            id: expect.any(String)
        }
    });
});

test('should setup add expense action object with default value', () => {
    const expenseDate = {};
    const action = addExpense(expenseDate);
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense: {
            description: '',
            amount: 0,
            createdAt: 0,
            note: '',
            id: expect.any(String)
        }
    });
});