import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline'

export default function QueryBanner({ query }) {
  const [closed, setClosed] = useState(false)

  return (
    <div className={`bg-blue-300 ${closed ? 'hidden' : ''}`}>
      <div className="mx-auto py-3 px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-blue-200">
              <SpeakerphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span>Showing results for &apos;{query}&apos;</span>
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <Link to={`/`}>
              <button className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-300 bg-white hover:bg-blue-50">
                Go back home
              </button>
            </Link>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              onClick={() => setClosed(true)}
              className="-mr-1 flex p-2 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
