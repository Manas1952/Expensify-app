import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses'

export const ExpenseList = (props) => (  // here component gets re-rendered automatically as store changes, by react-redux
  <div className='content-container' >
    <div className='list-header' >
      <div className='show-for-mobile' >Expenses</div>
      <div className='show-for-desktop' >Expense</div>
      <div className='show-for-desktop' >Amount</div>
    </div>
    <div className='list-body' >
      {
        props.expenses.length == 0 ? (
          <div className='list-item list-item--message' >
            <span>No Expenses</span>
          </div>
        ) : (
          props.expenses.map((expense) => {
            return <ExpenseListItem key={expense.id} {...expense} />
          })
        )
      }
    </div>
  </div>
)

const mapStateToProps = (state) => {  // as store changes, this is also automatically going to change
  return {
    expenses: selectExpenses(state.expenses, state.filters) // this will give sorted and filtered array. Earlier we wrote 'expenses: state.expenses' which would provide static data.
  }
}

export default connect(mapStateToProps)(ExpenseList)