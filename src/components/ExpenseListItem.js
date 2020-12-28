
import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
//import { ProgressPlugin } from 'webpack';
import { removeExpense } from '../actions/expenses';

export const ExpenseListItem = ({dispatch, id, description, amount, createdAt}) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <h1>{description}</h1>
        <p>{amount} -- {createdAt}</p>
    </div>
);
//const stateToProps = (state) => {
//    return {};
//}
export default connect()(ExpenseListItem);
//export default ExpenseListItem;