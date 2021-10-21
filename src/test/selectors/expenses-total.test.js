import getExpensesTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'

test('should give total expenses', () => {
  const res = getExpensesTotal([])
  expect(res).toBe(0)
})

test('should correctly add up a single expense', () => {
  const res = getExpensesTotal([expenses[0]])
  expect(res).toBe(195)
})

test('should correctly add up multiple expense', () => {
  const res = getExpensesTotal(expenses)
  expect(res).toBe(195195)
})