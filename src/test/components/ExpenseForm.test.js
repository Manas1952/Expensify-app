import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

test('should render ExpenseForm component(when we add expense)', () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot() // when component is rendered, no error is generated, but when form is submitted error is generated, so no error here
})

test('should render ExpenseForm with expense data(when we edit expense)', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />)
  expect(wrapper).toMatchSnapshot()
})

test('should render error when form is not filled properly', () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot()
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}  //means form is submitted and because in 'e.preventDefault()' (in ExpenseForm) is not understand by 'shallow', so we make it as blanked(mocked)
  })
  expect(wrapper.state('error').length).toBeGreaterThan(0)  // means error is there as error='please enter description and ....', whose length is '37'
  expect(wrapper).toMatchSnapshot()
})

test('should set description on change', () => {
  const value = 'New Description'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('input').at(0).simulate('change', {
    target: { value } // 'value' should be named as 'value' only, it shouldn't be changed
  })
  expect(wrapper.state('description')).toBe(value)
})

test('should set note on change', () => {
  const value = 'New Note'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('textarea').simulate('change', {
    target: { value }
  })
  expect(wrapper.state('note')).toBe(value)
})

test('should set amount on change if valid', () => {
  const value = '12.12'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  })
  expect(wrapper.state('amount')).toBe(value)
})

test('should not set amount if invalid', () => {
  const value = '12.123'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  })
  expect(wrapper.state('amount')).toBe('')
})

test('should call onSubmit prop valid form submission', () => {
  const onSubmitSpy = jest.fn()
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy
  } />)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })
  expect(wrapper.state('error')).toBe('')
  expect(onSubmitSpy).toHaveBeenLastCalledWith({  // this will check onSubmitSpy is called or not, when 'submit' event is handled(in upper to upper line)
    description: expenses[0].description,
    note: expenses[0].note,
    amount: expenses[0].amount,
    createdAt: expenses[0].createdAt
  })
})

test('should set new date on change', () => {
  const now = moment()
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('SingleDatePicker').prop('onDateChange')(now)  // this sets date to moment(0) (as we created a mocked one)
  expect(wrapper.state('createdAt')).toEqual(now)
})

test('should set calendar focused on change', () => {
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused: true })
  expect(wrapper.state('calendarFocused')).toBe(true)
})