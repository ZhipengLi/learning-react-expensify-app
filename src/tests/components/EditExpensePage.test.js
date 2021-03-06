import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
    editExpense = jest.fn();
    startRemoveExpense  =jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<EditExpensePage editExpense={editExpense} removeExpense = {startRemoveExpense} history={history} expense={expenses[1]} />);
});

test(`should render EditExpensePage correctly`, () => {
    expect(wrapper).toMatchSnapshot();
});

test(`should handle onSubmit`, () => {
    //console.log(wrapper.find('ExpenseForm'));
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[1].id,expenses[1]);
}); 

test(`should handle removeExpense`, () => {
    //console.log(wrapper.find('ExpenseForm'));
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenCalledWith('/');
    expect(startRemoveExpense).toHaveBeenCalledWith({id: expenses[1].id});
}); 