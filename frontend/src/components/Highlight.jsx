import React from 'react'

export default function Highlight({ url, index, classnames }) {
  return (
    <div>
      <a
        href={encodeURI(url)}
        className={`p-0 text-bluegray-500 hover:bg-bluegray-500 hover:text-white duration-100 ${classnames}`}
      >
        {url.split('://')[1]}
      </a>
      <small className="text-rose-800">&nbsp;({index})</small>
    </div>
  )
}
