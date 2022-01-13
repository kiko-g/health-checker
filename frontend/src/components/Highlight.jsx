import React from 'react'

export default function Highlight({ uri = 'uri', label = 'label', definition = '', classnames, styling }) {
  return (
    <div className={`p-3 shadow rounded-md bg-white space-y-1 ${styling}`}>
      <h3
        className={`capitalize tracking-wide text-slate-700 dark:text-white dark:hover:text-blue-200 duration-150 ${classnames}`}
      >
        {label}
      </h3>
      <p className="font-light text-sm text-gray-500 text-justify">{definition}</p>
    </div>
  )
}
