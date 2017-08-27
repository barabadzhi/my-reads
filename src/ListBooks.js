import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

import Book from './Book'

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
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>Currently Reading</h2>
              <div className='bookshelf-books'>
                <ol className='books-grid'>
                  {books
                    .filter(book => book.shelf === 'currentlyReading')
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
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>Want to Read</h2>
              <div className='bookshelf-books'>
                <ol className='books-grid'>
                  {books
                    .filter(book => book.shelf === 'wantToRead')
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
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>Read</h2>
              <div className='bookshelf-books'>
                <ol className='books-grid'>
                  {books
                    .filter(book => book.shelf === 'read')
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
          </div>
        </div>
        <div className='open-search'>
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}
