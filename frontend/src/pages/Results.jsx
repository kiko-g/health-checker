import axios from 'axios'
import Layout from '../layout/Layout'
import ResultsLoading from '../components/ResultsLoading'
import QueryBanner from '../components/QueryBanner'
import Search from '../components/Search'
import { Button } from '../components/Utils'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Overview from './Overview'
import ReactTextCollapse from 'react-text-collapse'

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3000',
  headers: { 'Access-Control-Allow-Origin': '*' },
})

export default function Results() {
  const { query } = useParams()
  const [limit, setLimit] = useState(9)
  const [results, setResults] = useState({ all: [], detailed: [], undetailed: [] })
  const [others, setOthers] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [overviewActive, setOverviewActive] = useState(false)

  const DetailedResult = ({ index, label = '', definition = '' }) => (
    <div
      className="relative p-3 shadow rounded-md bg-white dark:bg-slate-500 space-y-1"
      key={`result-detailed-${index}`}
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOverviewActive(true)}
          className="capitalize font-medium text-base tracking-wide duration-150
        text-slate-700 dark:text-white hover:text-blue-200 dark:hover:text-blue-100"
        >
          {label}
        </button>
        <span className="self-start rounded-full bg-teal-400 h-3 w-3 animate-pulse"></span>
      </div>
      <p className="font-light text-sm text-gray-600 dark:text-white text-justify">{definition}</p>
    </div>
  )

  const UndetailedResult = ({ index, label = '' }) => (
    <div className="p-3 shadow rounded-md bg-white dark:bg-slate-500 space-y-1" key={`result-detailed-${index}`}>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOverviewActive(true)}
          className="capitalize font-medium text-base tracking-wide duration-150
        text-slate-700 dark:text-white hover:text-blue-200 dark:hover:text-blue-100"
        >
          {label}
        </button>
        <span className="self-start rounded-full bg-teal-400 h-3 w-3 animate-pulse"></span>
      </div>
    </div>
  )

  useEffect(() => {
    let requests = [axiosInstance.get(`/infectious/bioportal/search/${query}`)]
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          let results = responses[0].data.results.bindings
          setResults({
            all: results,
            detailed: results.filter((item, index) => {
              return item.definition.value !== undefined
            }),
            undetailed: results.filter((item, index) => {
              return item.definition.value === undefined
            }),
          })
        })
      )
      .catch((errors) => console.error(errors))
      .then(() => {
        setMounted(true)
      })
  }, [query])

  return (
    <Layout>
      {mounted ? (
        <section className="space-y-5">
          <div className="flex justify-between">
            <Search width="full" alternate={true} />
          </div>
          <QueryBanner query={query} />
          {overviewActive ? (
            <Overview mode={[overviewActive, setOverviewActive]} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
              {results.detailed
                .filter((item, index) => {
                  return index < limit && item.definition.value !== undefined
                })
                .map((item, index) => (
                  <DetailedResult index={index} label={item.label.value} definition={item.definition.value} />
                ))}
              {others
                ? results.undetailed
                    .filter((item, index) => {
                      return index < limit && item.definition.value === undefined
                    })
                    .map((item, index) => (
                      <UndetailedResult index={index} label={item.label.value} definition={item.definition.value} />
                    ))
                : null}
            </div>
          )}
          <div className="flex items-center justify-center space-x-4">
            <Button text="Load more" onClick={() => setLimit(limit + 3)} classnames="mb-8" />
            <Button text="Others" onClick={() => setOthers(!others)} classnames="mb-8" />
          </div>
        </section>
      ) : (
        <ResultsLoading />
      )}
    </Layout>
  )
}
