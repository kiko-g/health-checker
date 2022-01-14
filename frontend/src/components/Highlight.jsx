import React from 'react'

export default function Highlight({ uri = 'uri', label = 'label', definition = '', headerClassnames, styling }) {
  return (
    <div className={`p-3 bg-white space-y-1 shadow rounded border-2 border-slate-300/60 ${styling}`}>
      <h3 className={`capitalize tracking-wide text-slate-700 dark:text-slate-700 ${headerClassnames}`}>{label}</h3>
      <p className="font-light text-sm text-gray-500 text-justify">{definition}</p>
    </div>
  )
}
