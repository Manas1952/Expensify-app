import moment from 'moment'
import filtersReducer from '../../reducers/filters'

test('should setup default values of filters', () => {
  const result = filtersReducer(undefined, { type: '@@INIT' })  // to see default values are getting by filters ot not. '@@INIT' is dispatch method, called when nothing is passed in arguments; reference: video(12-6)
  expect(result).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  })
})

test('should sort by amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' })
  expect(state.sortBy).toEqual('amount')
})

test('should sort by date', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  }
  const state = filtersReducer(currentState, { type: 'SORT_BY_DATE' })
  expect(state.sortBy).toEqual('date')
})

test('should set by text filter', () => {
  const action = {
    type: 'SET_TEXT_FILTER',
    text: 'manas'
  }
  const state = filtersReducer(undefined, action)
  expect(state.text).toEqual('manas')
})

test('should set start date', () => {
  const action = {
    type: 'SET_START_DATE',
    startDate: 1
  }
  const state = filtersReducer(undefined, action)
  expect(state.startDate).toEqual(1)
})

test('should set end date', () => {
  const action = {
    type: 'SET_END_DATE',
    endDate: 2
  }
  const state = filtersReducer(undefined, action)
  expect(state.endDate).toEqual(2)
})