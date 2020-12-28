
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import uuid from 'uuid';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

// store.dispatch(addExpense({ description: 'water bill', amount: 4500 }));
// store.dispatch(addExpense({ description: 'gas bill', createdAt: 1000 }));
// store.dispatch(addExpense({ description: 'rent', amount: 14500 }));

// const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
// console.log(visibleExpenses);

//console.log(store.getState());

const jsx = (
    <Provider store={store} >
        <AppRouter />    
    </Provider>
);
ReactDOM.render(jsx, document.getElementById('app'));
