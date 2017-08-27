import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Bookshelf from './Bookshelf'

export default class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render () {
    const { books } = this.props

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
            />
            <Bookshelf
              title='Want to Read'
              books={books.filter(book => book.shelf === 'wantToRead')}
            />
            <Bookshelf
              title='Read'
              books={books.filter(book => book.shelf === 'read')}
            />
          </div>
        </div>
        <div className='open-search'>
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}
