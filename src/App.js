import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import sortBy from 'sort-by'

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
        books.sort(sortBy('title'))
        this.setState({ books })
      })
  }

  updateBook = (book, shelf) => {
    const bookOnShelf = { ...this.state.books
      .filter(({ id }) => id === book.id)
      .pop()
    }

    bookOnShelf.shelf = shelf

    BooksAPI
      .update(book, shelf)
      .then(() => {
        this.setState(state => ({
          books: shelf === 'none'
            ? state.books
              .filter(({ id }) => id !== book.id)
            : state.books
              .filter(({ id }) => id !== book.id)
              .concat([ bookOnShelf ])
              .sort(sortBy('title'))
        }))
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
            onUpdateBook={this.updateBook}
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
