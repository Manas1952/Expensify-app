import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

test('should set up remove expense', () => {
  console.log('1st Test case')
  const action = removeExpense({ id: '123abc' })
  expect(action).toEqual({  // 'toBe' is like '===' and 'toEqual' is like '=='
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})

test('should edit the expense', () => {
  const action = editExpense('123abc', { note: 'editedNote' })
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'editedNote'
    }
  })
})

test('should add expense', () => {
  const action = addExpense(expenses[2])
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  })
})

test('should add expense to database and store', (done) => {
  const store = createMockStore({})
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'abcd',
    createdAt: 1000
  }
  store.dispatch(startAddExpense(expenseData)).then(() => { 
    const actions = store.getActions()  // it would return array of dispatched actions(i.e. here startAddExpense(i.e. indirectly AddExpense))
    console.log(actions)
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    })
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData)
    done()
  })  // the goal is that expense should be added at firebase at first 
})

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({})
  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  }
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    })
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults)
    done()
  })
})