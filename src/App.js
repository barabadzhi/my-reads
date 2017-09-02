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
    const { books, searchResults } = this.state
    const bookIdx = books.findIndex(({ id }) => id === book.id)
    const resultIdx = searchResults.findIndex(({ id }) => id === book.id)

    if (bookIdx === -1) {
      BooksAPI
        .update(book, shelf)
        .then(() =>
          BooksAPI
            .get(book.id))
        .then(book => {
          if (resultIdx === -1) {
            this.setState(({ books }) => ({
              books: books.concat([book]).sort(sortBy('title'))
            }))
          } else {
            this.setState(({ books, searchResults }) => ({
              books: books.concat([book]).sort(sortBy('title')),
              searchResults: update(searchResults, { [resultIdx]: { shelf: { $set: shelf } } })
            }))
          }
        })

      return
    }

    BooksAPI
      .update(book, shelf)
      .then(() => {
        if (resultIdx === -1) {
          this.setState(shelf === 'none'
            ? update(this.state, { books: { $splice: [[bookIdx, 1]] } })
            : update(this.state, { books: { [bookIdx]: { shelf: { $set: shelf } } } }))
        } else {
          this.setState(shelf === 'none'
            ? update(this.state, { books: { $splice: [[bookIdx, 1]] },
              searchResults: { [resultIdx]: { shelf: { $set: 'none' } } } })
            : update(this.state, { books: { [bookIdx]: { shelf: { $set: shelf } } },
              searchResults: { [resultIdx]: { shelf: { $set: shelf } } } }))
        }
      })
  }

  searchBook = (query, maxResults = 20) => {
    BooksAPI
      .search(query, maxResults)
      .then(searchResults => {
        const { books } = this.state

        searchResults = Array.isArray(searchResults) ? searchResults.map(result => {
          const book = books.find(({ id }) => id === result.id)

          if (book && result.shelf) {
            if (result.shelf === book.shelf) {
              return result
            }

            result.shelf = book.shelf

            return result
          }

          result.shelf = book ? book.shelf : 'none'

          return result
        }) : []

        this.setState({ searchResults })
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
            onUpdateBook={this.updateBook}
          />)}
        />
      </div>
    )
  }
}
