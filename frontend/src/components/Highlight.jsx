import React from 'react'
import { Link } from 'react-router-dom'

export default function Highlight({ uri = 'uri', label = 'label', definition = '', index, classnames, styling }) {
  return (
    <div className={`p-3 shadow rounded-md bg-white space-y-1 ${styling}`}>
      <Link to={`/overview`}>
        <h3
          className={`capitalize tracking-wide text-bluegray-700 dark:text-white dark:hover:text-blue-200 duration-150 ${classnames}`}
        >
          {label}
        </h3>
      </Link>
      <p className="font-light text-sm text-gray-500 text-justify">{definition}</p>
    </div>
  )
}
