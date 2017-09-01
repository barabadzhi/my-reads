import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Bookshelf from './Bookshelf'

export default class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render () {
    const { books, onUpdateBook } = this.props

    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            <Bookshelf
              title='Currently Reading'
              books={books.filter(book => book.shelf === 'currentlyReading')}
              onUpdateBook={onUpdateBook}
            />
            <Bookshelf
              title='Want to Read'
              books={books.filter(book => book.shelf === 'wantToRead')}
              onUpdateBook={onUpdateBook}
            />
            <Bookshelf
              title='Read'
              books={books.filter(book => book.shelf === 'read')}
              onUpdateBook={onUpdateBook}
            />
          </div>
        </div>
        <div className='open-search'>
          <Link to='/search'>
            Add a book
          </Link>
        </div>
      </div>
    )
  }
}
