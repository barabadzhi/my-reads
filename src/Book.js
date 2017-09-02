import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Book extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    shelf: PropTypes.string,
    onUpdate: PropTypes.func
  }

  render () {
    const { id, thumbnail, title, authors, shelf, onUpdate } = this.props

    return (
      <div className='book'>
        <div className='book-top'>
          <div className='book-cover' style={{ backgroundImage: `url(${thumbnail})` }} />
          {shelf && onUpdate && (
            <div className='book-shelf-changer'>
              <select value={shelf} onChange={(event) => { onUpdate({ id }, event.target.value) }}>
                <option disabled>Move to...</option>
                <option value='currentlyReading'>Currently Reading</option>
                <option value='wantToRead'>Want to Read</option>
                <option value='read'>Read</option>
                <option value='none'>None</option>
              </select>
            </div>
          )}
        </div>
        <div className='book-title'>{title}</div>
        <div className='book-authors'>{authors ? authors.sort().join(', ') : ''}</div>
      </div>
    )
  }
}
