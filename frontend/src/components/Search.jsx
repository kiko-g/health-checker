import * as React from 'react'
import PropTypes from 'prop-types'
import { SearchIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Search({ classnames, width = '2/3', alternate = false, setMounted }) {
  const [query, setQuery] = useState('')
  const [warning, setWarning] = useState(false)

  return (
    <div
      className={`w-full flex items-center justify-center ${
        alternate ? 'border border-slate-300/75' : 'shadow-md'
      } ${classnames}`}
    >
      <div className={`w-${width} ${alternate ? '' : 'shadow-md'}`}>
        <div className="w-full z-10 flex relative rounded bg-white p-1">
          <input
            id="search-bar"
            type="search"
            name="search"
            className="w-full text-lg text-gray-700 px-5 py-3 bg-white focus:bg-slate-50 focus:ring-0 border-0 rounded-l"
            placeholder={alternate ? 'Find something else...' : 'What are you looking for?'}
            onInput={(e) => setQuery(e.target.value)}
          />
          <div className={`self-center ${alternate ? '' : 'p-3'}`}>
            {query !== '' ? (
              <Link
                to={`/results/${query}`}
                onClick={() => {
                  if (alternate) setMounted(false)
                }}
              >
                <SearchButton alternate={alternate} />
              </Link>
            ) : (
              <SearchButton
                alternate={alternate}
                onClick={() => {
                  setWarning(true)
                  setTimeout(() => setWarning(false), 4000)
                }}
              />
            )}
          </div>
        </div>
        {warning ? <span className="ml-2 text-sm font-light text-red-400">Search query cannot be empty</span> : null}
      </div>
    </div>
  )
}

Search.propTypes = {
  classnames: PropTypes.string,
}

const SearchButton = ({ onClick, alternate = false }) => (
  <button
    type="submit"
    onClick={onClick}
    className={`bg-gradient-to-br from-teal-300 via-blue-300 to-purple-300 hover:opacity-80 duration-200 text-white rounded-full ${
      alternate ? 'p-1.5 m-2 ml-3' : 'p-3'
    }`}
  >
    <SearchIcon className="w-6 h-6" />
  </button>
)
