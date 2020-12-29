
import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
//import { ProgressPlugin } from 'webpack';
import { removeExpense } from '../actions/expenses';
import moment from 'moment';
import numeral from 'numeral';

export const ExpenseListItem = ({dispatch, id, description, amount, createdAt}) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <h1>{description}</h1>
        <p>{numeral(amount / 100).format('$0,0.00')}
        -
        {moment(createdAt).format('MMMM Do, YYYY')}</p>
    </div>
);

export default connect()(ExpenseListItem);
//export default ExpenseListItem;