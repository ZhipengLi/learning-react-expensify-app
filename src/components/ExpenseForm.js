import React from 'react';
import moment, { calendarFormat } from 'moment';
import { SingleDatePicker } from 'react-dates';

//const date = new Date();
//const now = moment();
//console.log(now.format('MMM'));

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
        //console.log(props.expense);
        //console.log(props.expense.description, props.expense.amount);
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description}));
    }
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({note}));
    }
    onAmountChange = (e) => {
        const amount = e.target.value;
        console.log(amount);
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?/)) {
            this.setState(() => ({amount}));
        }
    }
    onDateChange = ( createdAt ) => {
        if( createdAt ) {
            this.setState( () => ({createdAt }));
        }
    }
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
      };
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
            // Set error state equal to 'Please provide description an amount';
            this.setState( ()=>({error: 'Please provide description or amount'}));
            //console.log('inside error', this.state.description, this.state,amount);
        }
        else {
            console.log(this.state);
            this.setState(()=> ({error: ''}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    }
    render() {
        return (
          <form className='form' onSubmit={this.onSubmit}>
            {this.state.error && <p className='form__error'>{this.state.error}</p> }
              <input 
                  type='text'
                  placeholder='Description'
                  autoFocus
                  className='text-input'
                  value={this.state.description}
                  onChange={this.onDescriptionChange}
              />
              <input 
                  type='number'
                  placeholder='amount'
                  className='text-input'
                  value={this.state.amount}
                  onChange={this.onAmountChange}
              />
              <SingleDatePicker 
                  date={this.state.createdAt}
                  onDateChange={this.onDateChange}
                  focused={this.state.calendarFocused}
                  onFocusChange={this.onFocusChange}
                  numberOfMonths={1}
                  isOutsideRange={(day) => false}
              />
              <textarea placeholder='Add a note for your expense.'
                className='textarea'
                value={this.state.note}
                onChange={this.onNoteChange}
              >
              </textarea>
              <div>
                <button>Save Expense</button>
              </div>
          </form>
        );
    }
}
