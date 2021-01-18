import expenses from '../fixtures/expenses';
import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import SelectExpensesTotal from '../../selectors/expenses-total';
import numeral from 'numeral';

test(`should return 2 expenses`, () => {
    const exp = [expenses[0], expenses[1]];
    const count = exp.length, total = SelectExpensesTotal(exp);//numeral(SelectExpensesTotal(exp)/100).format('$0, 0.00');
    console.log('total:', total);
    const wrapper = shallow(<ExpensesSummary expensesCount={count} expensesTotal={total} />);
    expect(wrapper.find('h1').html()).toContain(`Viewing <span>${count}</span> expenses totaling <span>${numeral(total/100).format('$0, 0.00')}</span>`);
});

test(`should return 1 expenses`, () => {
    const exp = [expenses[0]];
    const count = exp.length, total = SelectExpensesTotal(exp);//numeral(SelectExpensesTotal(exp)/100).format('$0, 0.00');
    console.log('total:', total);
    const wrapper = shallow(<ExpensesSummary expensesCount={count} expensesTotal={total} />);
    expect(wrapper.find('h1').html()).toContain(`Viewing <span>${count}</span> expense totaling <span>${numeral(total/100).format('$0, 0.00')}</span>`);
});