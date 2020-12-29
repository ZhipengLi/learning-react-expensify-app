import React from 'react';
import { connect } from 'react-redux';
import SelectExpenses from '../selectors/expenses';
import SelectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export class ExpensesSummary extends React.Component{
    render(){
        const expenseWord = this.props.expensesCount === 1 ? 'expense' : 'expenses';
        return (<div>
            Viewing { this.props.expensesCount } {expenseWord} totaling { numeral(this.props.expensesTotal/100).format('$0, 0.00')}
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