import axios from 'axios'
import Layout from '../layout/Layout'
import Search from '../components/Search'
import Highlight from '../components/Highlight'
import QueryBanner from '../components/QueryBanner'
import ResultsLoading from '../components/ResultsLoading'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Disclosure, Transition } from '@headlessui/react'
import {
  ArrowLeftIcon,
  PlusIcon,
  MinusIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/outline'

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3000',
  headers: { 'Access-Control-Allow-Origin': '*' },
})

export default function Results() {
  const { query } = useParams()
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState([])
  const [limit, setLimit] = useState(9)
  const [results, setResults] = useState({ all: [], ordered: [], detailed: [], undetailed: [] })
  const [others, setOthers] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [overviewActive, setOverviewActive] = useState(false)

  const Result = ({ index, label = '', definition = '', detailed = true }) => (
    <div
      className="relative p-3 shadow rounded-md bg-white dark:bg-slate-500 space-y-1"
      key={`result-detailed-${index}`}
    >
      <Disclosure defaultOpen={index < 3}>
        {({ open }) => (
          <>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setOverviewActive(true)}
                className="capitalize font-medium text-sm tracking-wide duration-150
              text-slate-700 dark:text-white hover:text-blue-200 dark:hover:text-blue-100"
              >
                {label}
              </button>
              <div className="self-center flex items-center justify-center space-x-2">
                {detailed ? (
                  <Disclosure.Button className="flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-100 h-4 w-4 animate-pulse">
                    <ChevronUpIcon className={`${open ? 'transform rotate-180' : ''} w-4 h-4 text-slate-800`} />
                  </Disclosure.Button>
                ) : null}
                <span className={`rounded-full ${detailed ? 'bg-teal-400' : 'bg-amber-400'} h-4 w-4`}></span>
              </div>
            </div>
            {detailed ? (
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="text-sm font-light text-gray-600 dark:text-white">
                  {definition}
                </Disclosure.Panel>
              </Transition>
            ) : null}
          </>
        )}
      </Disclosure>
    </div>
  )

  useEffect(() => {
    let requests = [axiosInstance.get(`/infectious/bioportal/search/${query}`)]
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          let results = responses[0].data.results.bindings
          let details = results.filter((item) => item.definition.value !== undefined)
          let nodetails = results.filter((item) => item.definition.value === undefined)
          setResults({
            default: results,
            ordered: [...details, ...nodetails],
            detailed: details,
            undetailed: nodetails,
          })
          let pageArray = []
          for (let i = 0; i < results.length / limit; i++) pageArray.push(i + 1)
          setPages(pageArray)
        })
      )
      .catch((errors) => console.error(errors))
      .then(() => {
        setMounted(true)
      })
  }, [query, limit])

  return (
    <Layout>
      {mounted ? (
        overviewActive ? (
          <div className="space-y-5 mb-5">
            <div className="flex items-center justify-between space-x-2 ">
              <button
                type="button"
                onClick={() => setOverviewActive(false)}
                className="flex hover:bg-white/50 rounded-full p-2 duration-150"
              >
                <ArrowLeftIcon className="w-6 h-6 mr-1 p-0.5 text-slate-500 dark:text-slate-200" />
                <span className="self-center text-sm">Go back</span>
              </button>
              <h2 className="text-2xl text-sky-600 dark:text-sky-200 font-semibold tracking-wide">Disease Name</h2>
            </div>
            <Highlight
              styling={`border-2 shadow-md border-indigo-200 rounded-md`}
              label="Definition"
              definition="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor, lectus et euismod tristique, turpis arcu imperdiet arcu, at ullamcorper urna risus et lorem."
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-5 w-full">
              {[1, 2, 3, 4].map((item, index) => (
                <Highlight
                  styling={`border-2 shadow-md border-indigo-200 rounded-md`}
                  label="Symptoms"
                  definition="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor, lectus et euismod tristique, turpis arcu imperdiet arcu, at ullamcorper urna risus et lorem."
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="min-h-[calc(100vh-10rem)] flex flex-col justify-between mb-5">
            <div className="space-y-3 mb-5">
              <div className="flex space-x-4">
                <QueryBanner query={query} />
                <div className={`flex items-center bg-violet-100 text-slate-700 rounded mx-auto p-2 sm:px-4 lg:px-6`}>
                  <div className="flex items-center justify-between flex-wrap -space-x-px">
                    <button
                      type="button"
                      disabled={limit <= 3}
                      onClick={() => setLimit(limit - 3)}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md
                          border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50
                          disabled:cursor-not-allowed disabled:hover:bg-white"
                    >
                      <span className="sr-only">Previous</span>
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <span
                      type="button"
                      className="bg-white border-gray-300 text-gray-500
                        relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      {limit}
                    </span>
                    <button
                      type="button"
                      onClick={() => setLimit(limit + 3)}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md
                          border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50
                          disabled:cursor-not-allowed disabled:hover:bg-white"
                    >
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Search width="full" alternate={true} classnames="border-2 border-gray-100 rounded" />
              </div>

              <div>
                <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 w-full`}>
                  {others
                    ? results.ordered
                        .slice((page - 1) * limit, page * limit)
                        .map((item, index) => (
                          <Result
                            index={index}
                            label={item.label.value}
                            definition={item.definition.value}
                            detailed={item.definition.value !== undefined}
                          />
                        ))
                    : results.detailed
                        .slice((page - 1) * limit, page * limit)
                        .map((item, index) => (
                          <Result
                            index={index}
                            label={item.label.value}
                            definition={item.definition.value}
                            detailed={item.definition.value !== undefined}
                          />
                        ))}
                </div>
              </div>
            </div>

            <nav
              aria-label="Pagination"
              className="flex items-center justify-center relative z-0 rounded-md -space-x-px"
            >
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md
                border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50
                disabled:cursor-not-allowed disabled:hover:bg-white"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {page.length > 10
                ? pages.slice(page - 1, page + 9).map((item, index) => (
                    <button
                      type="button"
                      onClick={() => setPage(item)}
                      className={`${
                        item === page
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                    >
                      {item}
                    </button>
                  ))
                : pages.map((item, index) => (
                    <button
                      type="button"
                      onClick={() => setPage(item)}
                      className={`${
                        item === page
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                    >
                      {item}
                    </button>
                  ))}
              <button
                type="button"
                onClick={() => setPage(page + 1)}
                disabled={page > pages.length - 2}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md
                border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50
                disabled:cursor-not-allowed disabled:hover:bg-white"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        )
      ) : (
        <ResultsLoading />
      )}
    </Layout>
  )
}
