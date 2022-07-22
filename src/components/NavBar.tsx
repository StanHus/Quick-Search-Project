import React, { Fragment, useState } from 'react'
import SearchModal from './SearchModal'

export default function NavBar() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [noResults, setNoResults] = useState(false)
  const [searchingText, setSearchingText] = useState('')

  // a fetch for a Quick Search
  const runQuickSearch = async (searchTerm: string) => {
    try {
      const response = await fetch(
        `https://reststop.randomhouse.com/resources/works/?start=0&max=10&expandLevel=1&search=${searchTerm}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        }
      )
      const result = await response.json()
      if (result.work !== undefined) {
        setResults(result.work)
        setNoResults(false)
      } else {
        setResults([])
        setNoResults(true)
      }
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  // Making Sure to reset the defaults to avoid unnecessary and redundant items flashing
  const handleInputChange = (text: string) => {
    setSearchingText(text)
    setNoResults(false)
    setResults([])
    if (text !== '') {
      setLoading(true)
      runQuickSearch(text.replace(/[^a-z]+/gi, ''))
    }
  }

  return (
    <Fragment>
      <div className="quick-seach">
        <input
          type="text"
          placeholder="Start typing the Title"
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>
      {
        <SearchModal
          data={results}
          show={searchingText !== ''}
          noResults={noResults}
          loading={loading}
        />
      }
    </Fragment>
  )
}
