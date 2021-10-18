import { addExpense, editExpense, removeExpense } from '../../actions/expenses'

test('should set up remove expense', () => {
  const action = removeExpense({ id: '123abc' })
  expect(action).toEqual({  // 'toBe' is like '===' and 'toEqual' is like '=='
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})

test('should edit the expense', () => {
  const action  = editExpense('123abc', {note: 'editedNote'})
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'editedNote'
    }
  })
})

test('should add expense', ()=> {
  const expenseData = {
    description: 'Water bill',
    amount: 5000,
    createdAt: 1000,
    note: 'testNote'
  }
  const action = addExpense(expenseData)
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  })
})