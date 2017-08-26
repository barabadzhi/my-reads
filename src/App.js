import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import ListBooks from './ListBooks'
import SearchBook from './SearchBook'

// import * as BooksAPI from './BooksAPI'
import './App.css'

export default class MyReads extends Component {
  state = {}

  render () {
    return (
      <div className='my-reads'>
        <Route
          exact
          path='/'
          component={ListBooks}
        />
        <Route
          path='/search'
          component={SearchBook}
        />
      </div>
    )
  }
}
