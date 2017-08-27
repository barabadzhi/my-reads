import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import ListBooks from './ListBooks'
import SearchBook from './SearchBook'

import * as BooksAPI from './BooksAPI'
import './App.css'

export default class MyReads extends Component {
  state = {
    books: []
  }

  componentDidMount () {
    BooksAPI
      .getAll()
      .then(books => {
        this.setState({ books })
      })
  }

  render () {
    return (
      <div className='my-reads'>
        <Route
          exact
          path='/'
          render={() => (<ListBooks
            books={this.state.books}
          />)}
        />
        <Route
          path='/search'
          component={SearchBook}
        />
      </div>
    )
  }
}
