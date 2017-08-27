import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Book extends Component {
  static propTypes = {
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired
  }

  render () {
    const { thumbnail, title, authors } = this.props

    return (
      <div className='book'>
        <div className='book-top'>
          <div className='book-cover' style={{ backgroundImage: `url(${thumbnail})` }} />
          <div className='book-shelf-changer'>
            <select>
              <option value='none' disabled>Move to...</option>
              <option value='currentlyReading'>Currently Reading</option>
              <option value='wantToRead'>Want to Read</option>
              <option value='read'>Read</option>
              <option value='none'>None</option>
            </select>
          </div>
        </div>
        <div className='book-title'>{title}</div>
        <div className='book-authors'>{authors.sort().join(', ')}</div>
      </div>
    )
  }
}
