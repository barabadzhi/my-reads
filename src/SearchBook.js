import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import debounce from 'debounce'

import Book from './Book'

export default class SearchBook extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = query => {
    this.setState({
      query: query.trim()
    })
  }

  render () {
    const { query } = this.state
    const { books, onSearch, onUpdateBook } = this.props

    if (query) {
      onSearch(query)
    }

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>
            Close
          </Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              value={query}
              autoFocus
              onChange={(event) => debounce(this.updateQuery(event.target.value), 260)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          {books.length ? (
            <ol className='books-grid'>
              {books.map(book => (
                <li key={book.id}>
                  <Book
                    id={book.id}
                    thumbnail={book.imageLinks ? book.imageLinks.smallThumbnail : ''}
                    title={book.title}
                    authors={book.authors ? book.authors : []}
                    shelfType={book.shelf}
                    onUpdate={onUpdateBook}
                  />
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </div>
    )
  }
}
