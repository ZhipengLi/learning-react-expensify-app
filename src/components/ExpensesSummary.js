import React from 'react';
import { connect } from 'react-redux';
import SelectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export class ExpensesSummary extends React.Component{
    render(){
        return (<div>
            Viewing { this.props.expensesCount } expenses totaling { numeral(this.props.expensesTotal/100).format('$0, 0.00')}
        </div>);
    }
}

const mapStateToProps = (state, props) => {
    return {
        expensesCount: state.expenses ? state.expenses.length: 0,
        expensesTotal: SelectExpensesTotal(state.expenses)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);