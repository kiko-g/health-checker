import * as React from 'react'
import PropTypes from 'prop-types'
import { SearchIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Search(props) {
  const [query, setQuery] = useState('')

  return (
    <div className={`dark:bg-bluegray-400 w-full flex items-center justify-center ${props.class}`}>
      <form className="w-124 m-2">
        <div className="z-10 flex relative shadow-md rounded-xl bg-coolgray-100 border-gray-300">
          <input
            id="search-bar"
            type="search"
            name="search"
            className="w-full text-lg text-gray-700 px-5 py-3 bg-coolgray-100 focus:bg-coolgray-50 focus:ring-teal-500 focus:border-teal-500 border-0 rounded-l-xl"
            placeholder="Search"
            onInput={(e) => setQuery(e.target.value)}
          />
          <div className="p-3">
            <Link to={`/results/${query}`}>
              <button className="bg-gradient-to-br from-teal-300 via-blue-300 to-purple-300 hover:opacity-80 duration-200 text-white p-3 rounded-full">
                <SearchIcon className="w-6 h-6" />
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

Search.propTypes = {
  class: PropTypes.string,
}
