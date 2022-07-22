import React, { Fragment } from 'react'
import { IResultEntry } from './_utils'

export default function SearchModal(props: {
  data: IResultEntry[]
  show: boolean
  noResults: boolean
  loading: boolean
}) {
  // a couple of helper functions ( the only reason I didn't put them into something like _utils.ts is so that you have a look at all in one place)
  const transformAuthor = (author: string) => {
    return author
      .toLowerCase()
      .split(' ')
      .map((word) =>
        word[0] !== undefined
          ? (word = word[0].toUpperCase() + word.slice(1))
          : word
      )
      .join(' ')
  }

  const shorten = (text: string) => {
    return text.split(' ').length > 12
      ? text.split(' ').slice(0, 12).join(' ') + '...'
      : text
  }
  // I make sure to make a reusable and independent component that inherits props and is written clearly
  return (
    <Fragment>
      {props.show && (
        <div className="modal">
          <div className="tip"></div>
          <div>
            {props.data.map((entry: IResultEntry) => {
              // dynamically creating a link for the image (an entry may have 2 links, so I do it caveman style - first one I can grab
              const imageLink = `https://reststop.randomhouse.com/resources/titles/${
                entry.titles.isbn.length > 0
                  ? entry.titles.isbn[0].$
                  : entry.titles.isbn.$
              }`
              return (
                <div className="entry" key={entry.workid}>
                  <img src={imageLink} alt="image something" />
                  <div className="details">
                    <p className="title">{entry.titleweb}</p>
                    <div className="row">
                      <p className="author">
                        By {transformAuthor(entry.authorweb)}
                      </p>
                      <p className="author">
                        Sale Date: {entry.onsaledate.slice(0, 10)}
                      </p>
                    </div>
                    <p className="description">
                      <strong>Description: </strong>
                      {shorten(entry.titleSubtitleAuth)}
                    </p>
                    <a
                      className="external-link"
                      href={'https://www.amazon.co.uk/s?k=' + entry.titleweb}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Find on Amazon
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
          {props.loading && <div className="loading-spinner"></div>}
          {props.noResults && (
            <h2 className="no-results">
              Nothing found, try modifying your search
            </h2>
          )}
        </div>
      )}
    </Fragment>
  )
}
