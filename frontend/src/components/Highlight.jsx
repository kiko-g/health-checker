import React from 'react'

export default function Highlight({ url, index }) {
  return (
    <div>
      <a className="p-1 text-bluegray-500 hover:bg-bluegray-500 hover:text-white duration-100" href={encodeURI(url)}>
        {url.split('://')[1]}
      </a>
      <span className="p-1 text-rose-800">({index})</span>
    </div>
  )
}
