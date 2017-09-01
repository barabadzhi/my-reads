import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

export default class Bookshelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render () {
    const { title, books, onUpdateBook } = this.props

    return (
      <div className='bookshelf'>
        {books.length ? (
          <div>
            <h2 className='bookshelf-title'>{title}</h2>
            <div className='bookshelf-books'>
              <ol className='books-grid'>
                {books.map(book => (
                  <li key={book.id}>
                    <Book
                      id={book.id}
                      thumbnail={book.imageLinks.smallThumbnail}
                      title={book.title}
                      authors={book.authors}
                      shelf={book.shelf}
                      onUpdate={onUpdateBook}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
