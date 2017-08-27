import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Book extends Component {
  static propTypes = {
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    shelfType: PropTypes.string
  }

  render () {
    const { thumbnail, title, authors, shelfType } = this.props

    return (
      <div className='book'>
        <div className='book-top'>
          <div className='book-cover' style={{ backgroundImage: `url(${thumbnail})` }} />
          {shelfType && (
            <div className='book-shelf-changer'>
              <select>
                <option value='none' disabled>Move to...</option>
                {[
                  { value: 'currentlyReading', text: 'Currently Reading' },
                  { value: 'wantToRead', text: 'Want to Read' },
                  { value: 'read', text: 'Read' },
                  { value: 'none', text: 'None' }
                ].filter(option => option.value !== shelfType).map(option => (
                  <option key={option.value} value={option.value}>{option.text}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className='book-title'>{title}</div>
        <div className='book-authors'>{authors.sort().join(', ')}</div>
      </div>
    )
  }
}
