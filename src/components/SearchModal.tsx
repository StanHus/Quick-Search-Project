import React, { Fragment, useState } from 'react'
import { IResultEntry, shorten, transformAuthor } from './_utils'

export default function SearchModal(props: {
  data: IResultEntry[]
  noResults: boolean
  loading: boolean
  inputText: string
}) {
  const [avsSearchButtonText, setAvsSearchButtonText] = useState(
    'Perform an Advanced Search'
  )

  // not that this is the best way to hadle this, just a neat tool that I decided to use - don't judge too harshly :-) best way is css ::before
  const [showTip, setShowTip] = useState(true)
  document.querySelector('.modal-inner')?.addEventListener('scroll', () => {
    if (document.querySelector('.modal-inner')?.scrollTop !== 0) {
      setShowTip(false)
    } else {
      setShowTip(true)
    }
  })

  const runAdvancedSearch = () => {
    setAvsSearchButtonText('Searching ...')
    const performAVS = new CustomEvent('performAVS', {
      detail: props.inputText
    })
    document.dispatchEvent(performAVS)
  }

  // I make sure to make a reusable and independent component that inherits props and is written clearly

  return (
    <Fragment>
      {props.inputText !== '' && (
        <div className="modal">
          {showTip && <div className="tip"></div>}
          <div className="modal-inner">
            {props.data.map((entry: IResultEntry) => {
              // dynamically creating a link for the image (an entry may have 2 links, so I do it caveman style - first one I can grab
              const imageLink = `https://reststop.randomhouse.com/resources/titles/${
                entry.titles.isbn.length > 0
                  ? entry.titles.isbn[0].$
                  : entry.titles.isbn.$
              }`
              return (
                <div className="entry" key={entry.workid}>
                  <img src={imageLink} alt={entry.titleweb.concat(' Image')} />
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
            {props.data.length >= 4 && props.data.length < 30 && (
              <button className="run-avs" onClick={() => runAdvancedSearch()}>
                {avsSearchButtonText}
              </button>
            )}
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
