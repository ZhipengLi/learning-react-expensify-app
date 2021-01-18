import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SelectExpenses from '../selectors/expenses';
import SelectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export class ExpensesSummary extends React.Component{
    render(){
        const expenseWord = this.props.expensesCount === 1 ? 'expense' : 'expenses';
        return (<div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>
              Viewing <span>{ this.props.expensesCount }</span> {expenseWord} totaling <span>{ numeral(this.props.expensesTotal/100).format('$0, 0.00')}</span>
            </h1>  
            <div className='page-header__actions'>
              <Link className='button' to='/create'>Add Expense</Link>
            </div>
          </div>
        </div>);
    }
}

const mapStateToProps = (state, props) => {
    const visibleExpenses = SelectExpenses(state.expenses, state.filters);
    return {
        expensesCount: visibleExpenses ? visibleExpenses.length: 0,
        expensesTotal: SelectExpensesTotal(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);