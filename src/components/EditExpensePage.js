import React from 'react';
import { connect} from 'react-redux';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export class EditExpensePage extends React.Component {
    //constructor(props) {
    //    super();
    //    if(props.expense) {
    //        this.state= {expense: props.expense};
    //    }
    //}
    onSubmit = (expense) => {
        //console.log('onsubmit is called in EditExpensePage', expense);
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }
    onRemove = () => {
        //console.log('state expense', this.state.expense);
        this.props.removeExpense({id: this.props.expense.id});
        this.props.history.push('/');
    }
    render() {
        return (
          <div>
            <div className='page-header'>
              <div className='content-container'>
                <h1 className='page-header__title'>Edit Expense</h1>
              </div>
            </div>
            <div className='content-container'>
              <ExpenseForm 
              expense={this.props.expense}
              onSubmit={(expense) => {this.onSubmit(expense);}}
              />
              <button className='button button--secondary' onClick={() => {this.onRemove()}}>
              Remove Expense
              </button>  
            </div>
          </div>
        );
    }
};

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find( (exp) => {
            //console.log(`${exp.id} === ${props.match.params.id}`);
            return exp.id === props.match.params.id;
        })
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    editExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    removeExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);