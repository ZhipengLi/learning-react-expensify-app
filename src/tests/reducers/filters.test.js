import filtersReducer from '../../reducers/filters';
import moment from 'moment';
import filters from '../../reducers/filters';

test(`should setup default filter value`, () => {
    const state = filtersReducer(undefined, { type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test(`should set sort by to amount`, () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});


test(`should set sort by to date`, () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = { type: 'SORT_BY_DATE'};
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});


test(`should set text filter`, () => {
    const currentState = {
        text: 'a',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = { type: 'SET_TEXT_FILTER', text: 'e'};
    const state = filtersReducer(currentState, action);
    expect(state.text).toBe('e');
});


test(`should set text filter`, () => {
    const currentState = {
        text: 'a',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = { type: 'SET_TEXT_FILTER', text: 'e'};
    const state = filtersReducer(currentState, action);
    expect(state.text).toBe('e');
});

test(`should set startDate filter`, () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = { type: 'SET_START_DATE', startDate: moment().startOf('month')};
    const state = filtersReducer(currentState, action);
    expect(state.startDate).toEqual(moment().startOf('month'));
});

test(`should set endDate filter`, () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = { type: 'SET_END_DATE', endDate: moment().endOf('month')};
    const state = filtersReducer(currentState, action);
    expect(state.endDate).toEqual(moment().endOf('month'));
});