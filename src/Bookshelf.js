import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

import Book from './Book'

export default class Bookshelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired
  }

  render () {
    const { title, books } = this.props

    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{title}</h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            {books
              .sort(sortBy('title'))
              .map(book => (
                <li key={book.id}>
                  <Book
                    thumbnail={book.imageLinks.smallThumbnail}
                    title={book.title}
                    authors={book.authors}
                  />
                </li>
              ))}
          </ol>
        </div>
      </div>
    )
  }
}
