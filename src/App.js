import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import update from 'immutability-helper'
import sortBy from 'sort-by'

import ListBooks from './ListBooks'
import SearchBook from './SearchBook'

import * as BooksAPI from './BooksAPI'
import './App.css'

export default class MyReads extends Component {
  state = {
    books: [],
    searchResults: []
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
    const { books } = this.state
    const bookIdx = books.findIndex(({ id }) => id === book.id)

    const bookOnShelf = update(books[bookIdx], {
      shelf: { $set: shelf }
    })

    BooksAPI
      .update(book, shelf)
      .then(() => {
        this.setState(shelf === 'none'
          ? update(this.state, { books: { $splice: [[bookIdx, 1]] } })
          : { books: update(books, { [bookIdx]: { $set: bookOnShelf } }) })
      })
  }

  searchBook = (query, maxResults = 20) => {
    BooksAPI
      .search(query, maxResults)
      .then(searchResults => {
        this.setState({
          searchResults: Array.isArray(searchResults) ? searchResults : []
        })
      })
  }

  render () {
    const { books, searchResults } = this.state

    return (
      <div className='my-reads'>
        <Route
          exact
          path='/'
          render={() => (<ListBooks
            books={books}
            onUpdateBook={this.updateBook}
          />)}
        />
        <Route
          path='/search'
          render={() => (<SearchBook
            books={searchResults}
            onSearch={this.searchBook}
            onUpdateBook={this.updateBook} // TODO: Improve method to handle not in state { books } books
          />)}
        />
      </div>
    )
  }
}
