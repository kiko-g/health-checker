import axios from 'axios'
import Layout from '../layout/Layout'
import Search from '../components/Search'
import Highlight from '../components/Highlight'
import QueryBanner from '../components/QueryBanner'
import ResultsLoading from '../components/ResultsLoading'
import Settings from '../components/Settings'
import Result from '../components/Result'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Disclosure, Transition } from '@headlessui/react'
import { ArrowLeftIcon, ChevronUpIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

export default function Results() {
  const { query } = useParams()
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState([])
  const [limit, setLimit] = useState(12)
  const [others, setOthers] = useState(true)
  const [ordered, setOrdered] = useState(true)
  const [activeView, setActiveView] = useState('main')

  const [mounted, setMounted] = useState(false)
  const [synonyms, setSynonyms] = useState([])
  const [subclasses, setSubclasses] = useState([])
  const [seeAlsoSynonyms, setSeeAlsoSynonyms] = useState([])
  const [seeAlsoSubclasses, setSeeAlsoSubclasses] = useState([])
  const [results, setResults] = useState({ all: [], ordered: [], detailed: [], undetailed: [] })

  const [seeAlsoMounted, setSeeAlsoMounted] = useState(false)
  const [seeAlsoActiveItem, setSeeAlsoActiveItem] = useState(null)
  const [seeAlsoDisplayItem, setSeeAlsoDisplayItem] = useState({
    abstract: '',
    causes: '',
    symptoms: '',
    treatment: '',
    complications: '',
  })

  const [overviewActiveItem, setOverviewActiveItem] = useState(null)
  const [overviewMounted, setOverviewMounted] = useState(false)
  const [overviewDisplayItem, setOverviewDisplayItem] = useState({
    abstract: '',
    causes: '',
    symptoms: '',
    treatment: '',
    complications: '',
  })

  useEffect(() => {
    const requests = [axiosInstance.get(`/bioportal/search/${query}`)]
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          let results = []
          let raw = responses[0].data.results.bindings
          let exact = raw.find((entry) => entry.label.value.toLowerCase() === query.toLowerCase())
          if (exact) {
            raw.splice(raw.indexOf(exact), 1)
            results = [exact].concat(raw)
          } else results = raw

          let details = results.filter((item) => item.definition.value !== undefined)
          let nodetails = results.filter((item) => item.definition.value === undefined)

          setResults({
            default: results,
            ordered: ordered ? [...details, ...nodetails] : results,
            detailed: details,
            undetailed: nodetails,
          })

          let pageArray = []
          if (others) {
            for (let i = 0; i < results.length / limit; i++) pageArray.push(i + 1)
          } else for (let i = 0; i < details.length / limit; i++) pageArray.push(i + 1)
          setPages(pageArray)
        })
      )
      .catch((errors) => console.error(errors))
      .then(() => setMounted(true))
  }, [query, limit, others, ordered])

  useEffect(() => {
    if (overviewActiveItem === null) return null
    const label = overviewActiveItem.label.value
    const uri = overviewActiveItem.uri.value
    const doid = uri.split('DOID_')[1]
    const requests = [
      axiosInstance.get(`/dbpedia/getAbstract/${label}`),
      axiosInstance.get(`/bioportal/getSynonyms/${doid}`),
      axiosInstance.get(`/bioportal/getSubClasses/${doid}`),
    ]

    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          let results = responses[0].data.results.bindings
          let abstract = 'No abstract found'
          let causes = 'No causes found'
          let symptoms = 'No symptoms found'
          let treatment = 'No treatment found'
          let complications = 'No complications found'

          if (results.length !== 0) {
            let exact = results.find((entry) => entry.label.value.toLowerCase() === label.toLowerCase())
            if (exact) {
              if (exact.abstract) abstract = exact.abstract.value
              if (exact.causes) causes = exact.causes.value
              if (exact.symptoms) symptoms = exact.symptoms.value
              if (exact.treatment) treatment = exact.treatment.value
              if (exact.complications) complications = exact.complications.value
            } else {
              if (results[0].abstract) abstract = results[0].abstract.value
              if (results[0].causes) causes = results[0].causes.value
              if (results[0].symptoms) symptoms = results[0].symptoms.value
              if (results[0].treatment) treatment = results[0].treatment.value
              if (results[0].complications) complications = results[0].complications.value
            }
          }

          let synonymsParsed = []
          let synonymsResultsArray = responses[1].data.results.bindings
          synonymsResultsArray.forEach((synonym, index) => {
            synonymsParsed.push(synonym.synonym.value)
          })

          let subclassesParsed = []
          let subclassesResultsArray = responses[2].data.results.bindings
          subclassesResultsArray.forEach((subclass, index) => {
            subclassesParsed.push({ value: subclass.subclass_label.value, uri: subclass.subclass_uri.value })
          })

          setOverviewDisplayItem({
            abstract: abstract,
            causes: causes,
            symptoms: symptoms,
            treatment: treatment,
            complications: complications,
          })
          setSynonyms(synonymsParsed)
          setSubclasses(subclassesParsed)
        })
      )
      .catch((errors) => console.error(errors))
      .then(() => setOverviewMounted(true))
  }, [overviewActiveItem])

  useEffect(() => {
    if (seeAlsoActiveItem === null) return null
    const label = seeAlsoActiveItem.label.value
    const doid = seeAlsoActiveItem.doid
    const requests = [
      axiosInstance.get(`/dbpedia/getAbstract/${label}`),
      axiosInstance.get(`/bioportal/getSynonyms/${doid}`),
      axiosInstance.get(`/bioportal/getSubClasses/${doid}`),
    ]

    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          let results = responses[0].data.results.bindings
          let abstract = 'No abstract found'
          let causes = 'No causes found'
          let symptoms = 'No symptoms found'
          let treatment = 'No treatment found'
          let complications = 'No complications found'

          if (results.length !== 0) {
            if (results[0].abstract) abstract = results[0].abstract.value
            if (results[0].causes) causes = results[0].causes.value
            if (results[0].symptoms) symptoms = results[0].symptoms.value
            if (results[0].treatment) treatment = results[0].treatment.value
            if (results[0].complications) complications = results[0].complications.value
          }

          let synonymsParsed = []
          let synonymsResultsArray = responses[1].data.results.bindings
          synonymsResultsArray.forEach((synonym, index) => {
            synonymsParsed.push(synonym.synonym.value)
          })

          let subclassesParsed = []
          let subclassesResultsArray = responses[2].data.results.bindings
          subclassesResultsArray.forEach((subclass, index) => {
            subclassesParsed.push({ value: subclass.subclass_label.value, uri: subclass.subclass_uri.value })
          })

          setSeeAlsoDisplayItem({
            abstract: abstract,
            causes: causes,
            symptoms: symptoms,
            treatment: treatment,
            complications: complications,
          })
          setSeeAlsoSynonyms(synonymsParsed)
          setSeeAlsoSubclasses(subclassesParsed)
        })
      )
      .catch((errors) => console.error(errors))
      .then(() => setSeeAlsoMounted(true))
  }, [seeAlsoActiveItem])

  const calculatePageLimits = () => {
    if (page < 3 || pages.length < 5) return { start: 0, end: 5 }
    else return { start: page - 2, end: page + 3 }
  }

  return (
    <Layout>
      {activeView === 'main' ? (
        mounted ? (
          <div className="min-h-[calc(100vh-10rem)] flex flex-col justify-between mb-5">
            <div className="space-y-3 mb-5">
              <div className="grid grid-cols-12 gap-2">
                <QueryBanner query={query} classnames="col-span-12 xl:col-span-6 2xl:col-span-8" />
                <Settings
                  limitHook={[limit, setLimit]}
                  othersHook={[others, setOthers]}
                  orderedHook={[ordered, setOrdered]}
                />
              </div>

              <div className="flex justify-between">
                <Search
                  width="full"
                  alternate={true}
                  setMounted={setMounted}
                  classnames="border-2 border-gray-100 rounded"
                />
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 w-full`}>
                {others
                  ? results.ordered
                      .slice((page - 1) * limit, page * limit)
                      .map((item, index) => (
                        <Result
                          key={`results-all-${index}`}
                          index={index}
                          label={item.label.value}
                          definition={item.definition.value}
                          detailed={item.definition.value !== undefined}
                          exact={item.label.value.toLowerCase() === query.toLowerCase()}
                          results={results}
                          setOverviewActiveItem={setOverviewActiveItem}
                          setActiveView={setActiveView}
                          others={others}
                        />
                      ))
                  : results.detailed
                      .slice((page - 1) * limit, page * limit)
                      .map((item, index) => (
                        <Result
                          key={`results-defined-${index}`}
                          index={index}
                          label={item.label.value}
                          definition={item.definition.value}
                          detailed={item.definition.value !== undefined}
                          exact={item.label.value.toLowerCase() === query.toLowerCase()}
                          results={results}
                          setOverviewActiveItem={setOverviewActiveItem}
                          setActiveView={setActiveView}
                          others={others}
                        />
                      ))}
              </div>
            </div>

            <nav
              aria-label="Pagination"
              className="flex items-center justify-center relative z-0 rounded-md -space-x-px"
            >
              <button
                type="button"
                key={`page-button-previous`}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md
                border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50
                disabled:cursor-not-allowed disabled:hover:bg-white"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {pages.slice(calculatePageLimits().start, calculatePageLimits().end).map((item, index) => (
                <button
                  key={`page-button-${item}`}
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
                key={`page-button-next`}
                onClick={() => setPage(page + 1)}
                disabled={page > pages.length - 1}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md
                border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50
                disabled:cursor-not-allowed disabled:hover:bg-white"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        ) : (
          <ResultsLoading />
        )
      ) : null}

      {activeView === 'overview' ? (
        overviewMounted ? (
          <div className="space-y-3 mb-5">
            {/* First line */}
            <div className="flex items-center justify-between space-x-2">
              <button
                type="button"
                onClick={() => {
                  setActiveView('main')
                  setOverviewMounted(false)
                  setOverviewActiveItem(null)
                }}
                className="h-12 flex items-center justify-center p-3 px-2 rounded duration-150 border-2 go-back"
              >
                <ArrowLeftIcon className="w-6 h-6 pr-2 py-1" />
                <span className="self-center font-medium px-1">Go back</span>
              </button>

              <div className="h-12 flex-1 flex items-center justify-start space-x-2 px-3 py-2 bg-blue-100 border-2 border-blue-300/50 rounded">
                <h2 className="text-xxs sm:text-xs md:text-base lg:text-lg 2xl:text-xl text-slate-700 capitalize">
                  {overviewActiveItem.label.value}
                </h2>
              </div>

              {overviewActiveItem.superclass_label.value ? (
                <div className="h-12 flex items-center justify-start space-x-2 px-3 py-2 bg-purple-100 border-2 border-purple-300/50 rounded">
                  <h2 className="text-xxs sm:text-xs md:text-base lg:text-lg 2xl:text-xl text-purple-900">
                    Belongs to&nbsp;
                    <span className="font-bold capitalize">{overviewActiveItem.superclass_label.value}</span>
                  </h2>
                </div>
              ) : null}
            </div>

            {/* Bioportal Definition */}
            <Highlight
              header="Definition"
              text={overviewActiveItem.definition.value || 'No definition found'}
              aka={synonyms}
              verified={true}
            />

            {/* DB Pedia Information */}
            <Highlight header="Abstract" text={overviewDisplayItem.abstract || 'No abstract found'} />
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-3 w-full">
              {Object.keys(overviewDisplayItem)
                .filter((spec) => spec !== 'abstract')
                .map((spec, specIdx) => (
                  <Highlight
                    header={spec}
                    key={`${overviewActiveItem.label.value}-${spec}-${specIdx}`}
                    text={overviewDisplayItem[spec] || `No ${spec} found`}
                  />
                ))}
            </div>

            {/* See Also (subclasses) */}
            <div className={`px-4 py-3 bg-white space-y-1 shadow rounded border-2 border-slate-300/60`}>
              <Disclosure defaultOpen={true}>
                {({ open }) => (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className={`capitalize tracking-wide text-slate-700 dark:text-slate-700`}>See Also</h3>
                      <div className="self-center flex items-center justify-center space-x-2">
                        <Disclosure.Button
                          className={`h-5 w-5 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-100 hover:opacity-80 duration-150`}
                        >
                          <ChevronUpIcon className={`w-4 h-4 text-slate-800 ${open ? 'transform rotate-180' : ''}`} />
                        </Disclosure.Button>
                        <span
                          className={`rounded-full ${subclasses.length !== 0 ? 'bg-blue-400' : 'bg-rose-400'} h-5 w-5`}
                        ></span>
                      </div>
                    </div>
                    <Transition
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="text-justify font-light text-gray-600 py-2 dark:text-white">
                        {subclasses.length !== 0 ? (
                          <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                            {subclasses.map((subclass, index) => (
                              <button
                                className="w-full px-1.5 py-0.5 rounded-xl 
                                  text-center font-medium capitalize
                                  bg-slate-100 border-2 border-slate-300/60 text-slate-700 hover:bg-slate-100/50"
                                key={`subclass-${index}`}
                                type="button"
                                onClick={() => {
                                  const doid = subclass.uri.split('DOID_')[1]
                                  const requests = [axiosInstance.get(`/bioportal/getClass/${doid}`)]

                                  axios
                                    .all(requests)
                                    .then(
                                      axios.spread((...responses) => {
                                        console.log(responses[0].data.results.bindings)
                                        let result = responses[0].data.results.bindings[0]
                                        result.doid = doid
                                        setActiveView('seeAlso')
                                        setSeeAlsoActiveItem(result)
                                      })
                                    )
                                    .catch((errors) => console.error(errors))
                                }}
                              >
                                {subclass.value}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span>{console.log(seeAlsoSubclasses)}No related diseases found</span>
                        )}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        ) : (
          <ResultsLoading />
        )
      ) : null}

      {activeView === 'seeAlso' ? (
        seeAlsoMounted ? (
          <div className="space-y-3 mb-5">
            {/* First line */}
            <div className="flex items-center justify-between space-x-2">
              <button
                type="button"
                onClick={() => {
                  setActiveView('overview')
                  setSeeAlsoMounted(false)
                  setSeeAlsoActiveItem(null)
                }}
                className="h-12 flex items-center justify-center p-3 px-2 rounded duration-150 border-2 go-back"
              >
                <ArrowLeftIcon className="w-6 h-6 pr-2 py-1" />
                <span className="self-center font-medium px-1">Go back</span>
              </button>

              <div className="h-12 flex-1 flex items-center justify-start space-x-2 px-3 py-2 bg-blue-100 border-2 border-blue-300/50 rounded">
                <h2 className="text-xxs sm:text-xs md:text-base lg:text-lg 2xl:text-xl text-slate-700 capitalize">
                  {seeAlsoActiveItem.label.value}
                </h2>
              </div>

              {seeAlsoActiveItem.superclass_label.value ? (
                <div className="h-12 flex items-center justify-start space-x-2 px-3 py-2 bg-purple-100 border-2 border-purple-300/50 rounded">
                  <h2 className="text-xxs sm:text-xs md:text-base lg:text-lg 2xl:text-xl text-purple-900">
                    Belongs to&nbsp;
                    <span className="font-bold capitalize">{seeAlsoActiveItem.superclass_label.value}</span>
                  </h2>
                </div>
              ) : null}
            </div>

            {/* Bioportal Definition */}
            <Highlight
              header="Definition"
              text={seeAlsoActiveItem.definition.value || 'No definition found'}
              aka={seeAlsoSynonyms}
              verified={true}
            />

            {/* DB Pedia Information */}
            <Highlight header="Abstract" text={seeAlsoDisplayItem.abstract || 'No abstract found'} />
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-3 w-full">
              {Object.keys(seeAlsoDisplayItem)
                .filter((spec) => spec !== 'abstract')
                .map((spec, specIdx) => (
                  <Highlight
                    header={spec}
                    key={`${overviewActiveItem.label.value}-${spec}-${specIdx}`}
                    text={seeAlsoDisplayItem[spec] || `No ${spec} found`}
                  />
                ))}
            </div>

            {/* See also (subclasses of subclasses) */}
            <div className={`px-4 py-3 bg-white space-y-1 shadow rounded border-2 border-slate-300/60`}>
              <Disclosure defaultOpen={true}>
                {({ open }) => (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className={`capitalize tracking-wide text-slate-700 dark:text-slate-700`}>See Also</h3>
                      <div className="self-center flex items-center justify-center space-x-2">
                        <Disclosure.Button
                          className={`h-5 w-5 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-100 hover:opacity-80 duration-150`}
                        >
                          <ChevronUpIcon className={`w-4 h-4 text-slate-800 ${open ? 'transform rotate-180' : ''}`} />
                        </Disclosure.Button>
                        <span
                          className={`rounded-full ${
                            seeAlsoSubclasses.length !== 0 ? 'bg-blue-400' : 'bg-rose-400'
                          } h-5 w-5`}
                        ></span>
                      </div>
                    </div>
                    <Transition
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="text-justify font-light text-gray-600 py-2 dark:text-white">
                        {seeAlsoSubclasses.length !== 0 ? (
                          <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                            {seeAlsoSubclasses.map((subclass, index) => (
                              <button
                                className="w-full px-1.5 py-0.5 rounded-xl 
                                  text-center font-medium capitalize
                                  bg-slate-100 border-2 border-slate-300/60 text-slate-700 hover:bg-slate-100/50"
                                key={`subclass-${index}`}
                                type="button"
                                onClick={() => {
                                  const doid = subclass.uri.split('DOID_')[1]
                                  const requests = [axiosInstance.get(`/bioportal/getClass/${doid}`)]

                                  axios
                                    .all(requests)
                                    .then(
                                      axios.spread((...responses) => {
                                        let result = responses[0].data.results.bindings[0]
                                        result.doid = doid
                                        setActiveView('seeAlso')
                                        setSeeAlsoActiveItem(result)
                                        setSeeAlsoMounted(false)
                                      })
                                    )
                                    .catch((errors) => console.error(errors))
                                }}
                              >
                                {subclass.value}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span>{console.log(seeAlsoSubclasses)}No related diseases found</span>
                        )}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        ) : (
          <ResultsLoading />
        )
      ) : null}
    </Layout>
  )
}
