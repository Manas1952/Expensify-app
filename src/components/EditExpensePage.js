import React from 'react';
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { startEditExpense, startRemoveExpense } from '../actions/expenses'

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense)  // we by default get props by provider; // these are some default properties(like history, match...) it provide 
    this.props.history.push('/')
    // console.log('upadted', expense)
  }
  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id })
    this.props.history.push('/')
  }
  render() {
    return (
      <div>
        <div className='page-header' >
          <div className='content-container' >
            <h1 className='page-header__title' >Edit Expense</h1>
          </div>
        </div>
        <div className='content-container' >
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button className='button button-secondary' onClick={this.onRemove} >Remove Expense</button>
        </div>
      </div>  // so we can access dynamic part(i.e. id) of 'edit/id' by those default properties (props.match.params.id)
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)

// if you still don't get it watch 9.React router 8th video