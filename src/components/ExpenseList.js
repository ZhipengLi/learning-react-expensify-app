import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import SelectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div className='content-container'>
      <div className='list-header'>
        <div className='show-for-mobile'>Expenses</div>
        <div className='show-for-desktop'>Expense</div>
        <div className='show-for-desktop'>Amount</div>
      </div>
      <div className='list-body'>
        {
            props.expenses.length === 0 ? (
              <div className='list-item list-item--message'>
               <p>No expenses</p>
              </div>
            ) : (
                props.expenses.map( (exp) => {
                    return <div key = {exp.id}><ExpenseListItem {...exp} /></div>;
                }) 
            )
        }
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: SelectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);