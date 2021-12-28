import React from 'react'

export default function Highlight({ url, index, classnames }) {
  return (
    <div>
      <a
        href={encodeURI(url)}
        className={`p-0 text-bluegray-500 dark:text-white hover:text-blue-400 dark:hover:text-blue-200 duration-150 ${classnames}`}
      >
        {url.split('://')[1]}
      </a>
      <small className="text-rose-800 dark:text-rose-300">&nbsp;({index})</small>
    </div>
  )
}
