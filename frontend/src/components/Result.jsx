import React from 'react'

export default function Result({ uri = 'uri', label = 'label', definition = '', mode, classnames, styling }) {
  const [viewResult, setViewResult] = mode

  return (
    <div className={`p-3 shadow rounded-md bg-white space-y-1 ${styling}`}>
      <button
        type="button"
        onClick={() => setViewResult(true)}
        className={`capitalize tracking-wide text-bluegray-700 dark:text-white dark:hover:text-blue-200 duration-150 ${classnames}`}
      >
        {label}
      </button>
      <p className="font-light text-sm text-gray-500 text-justify">{definition}</p>
    </div>
  )
}
