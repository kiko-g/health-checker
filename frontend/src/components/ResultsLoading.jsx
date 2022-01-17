import { InformationCircleIcon } from '@heroicons/react/outline'

export default function ResultsLoading() {
  const Spinner = ({ color }) => (
    <svg
      className={`animate-spin -ml-1 mr-3 h-6 w-6 text-${color} dark:text-white`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )

  return (
    <>
      <div className="flex items-center justify-between flex-wrap rounded bg-amber-50 border-2 border-amber-300/60 text-slate-700 mx-auto my-4 p-4">
        <div className="flex-1 flex items-center justify-between">
          <div className="flex">
            <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
            <p className="ml-3 font-medium truncate">
              <span>Expect some delay on the requests!</span>
            </p>
          </div>
        </div>
      </div>
      <div className="h-20 flex items-center justify-center mt-4">
        <span className="flex items-center justify-center px-4 py-2 font-semibold leading-6 text-xl rounded">
          <Spinner color="slate-700" />
          Loading...
        </span>
      </div>
    </>
  )
}
