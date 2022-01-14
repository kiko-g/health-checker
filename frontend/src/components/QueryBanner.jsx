import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline'

export default function QueryBanner({ query }) {
  const [dismiss, setDismiss] = useState(false)

  return (
    <div className={`flex-1 bg-blue-100 border-2 border-blue-300/50 text-slate-700 rounded ${dismiss ? 'hidden' : ''}`}>
      <div className="mx-auto p-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded">
              <SpeakerphoneIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="ml-3 truncate">
              Showing results for <strong>{query}</strong>
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <Link to={`/`}>
              <button className="flex items-center justify-center px-4 py-2 border border-transparent rounded shadow-sm text-sm font-medium bg-white hover:bg-slate-50 duration-100">
                Go back home
              </button>
            </Link>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              onClick={() => setDismiss(true)}
              className="flex p-2 rounded bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2 duration-200"
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
