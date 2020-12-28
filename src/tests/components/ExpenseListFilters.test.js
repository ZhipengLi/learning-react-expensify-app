import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters  } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import { start } from 'live-server';
import moment, { calendarFormat } from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(()=> {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters 
            filters = {filters}
            setTextFilter = {setTextFilter}
            sortByDate = {sortByDate}
            sortByAmount = {sortByAmount}
            setStartDate = {setStartDate}
            setEndDate = {setEndDate}
        />
    );
});

test(`should render ExpenseListFilters correctly`, () => {
    expect(wrapper).toMatchSnapshot();
});

test(`should render ExpenseListFilters with alt data correctly`, () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test(`should handle text change`, () => {
    const e = {target:{value:'test text'}};
    wrapper.find('input').prop('onChange')(e);
    expect(setTextFilter).toHaveBeenCalledWith(e.target.value);
}); 

test(`should handle sort by date`, () => {
    const value = 'date';
    wrapper.find('select').simulate('change',value);
    expect(sortByDate).toHaveBeenCalled();
});

test(`should handle sort by amount`, () => {
    wrapper.find('select').simulate('change', 'amount');
    expect(sortByAmount).toHaveBeenCalled();
});

test(`should handle date change`, () => {
    const startDate = moment(0), endDate = moment(1);
    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate});
    expect(setStartDate).toHaveBeenCalledWith(startDate);
    expect(setEndDate).toHaveBeenCalledWith(endDate);
});

test(`should handle date focus change`, () => {
    const calendarFocused = true;
    const e = {calendarFocused};
    wrapper.find('DateRangePicker').prop('onFocusChange')(e);
    expect(wrapper.state('calendarFocused')).toEqual(e);
});