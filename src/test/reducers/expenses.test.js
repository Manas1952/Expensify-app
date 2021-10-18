import expensesReducers from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('should test default state', () => {
  const state = expensesReducers(undefined, { type: '@@INIT' })
  expect(state).toEqual([])
})

test('should add expense', () => {
  const expense = {
    id: 4,
    description: 'manas',
    note: 'new note',
    amount: 1952,
    createdAt: 7
  }
  const action = {
    type: 'ADD_EXPENSE',
    expense
  }
  const state = expensesReducers(expenses, action)
  expect(state).toEqual([...expenses, expense])
})

test('should remove expense', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducers(expenses, action)
  expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expense with wrong id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  }
  const state = expensesReducers(expenses, action)
  expect(state).toEqual(expenses)
})

test('should edit expense', () => {
  const amount = 1950
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: {
      amount
    }
  }
  const state = expensesReducers(expenses, action)
  expect(state[0].amount).toEqual(amount)
})

test('should not edit expense if expense not found', () => {
  const amount = 1950
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      amount
    }
  }
  const state = expensesReducers(expenses, action)
  expect(state).toEqual(expenses)
})