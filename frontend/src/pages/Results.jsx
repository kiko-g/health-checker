import axios from 'axios'
import Layout from '../layout/Layout'
import Highlight from '../components/Highlight'
import Loading from '../components/Loading'
import QueryBanner from '../components/QueryBanner'
import Search from '../components/Search'
import { Button } from '../components/Utils'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3000',
  headers: { 'Access-Control-Allow-Origin': '*' },
})

export default function Results() {
  const { query } = useParams()
  const [others, setOthers] = useState(false)
  const [limit, setLimit] = useState(12)
  const [mounted, setMounted] = useState(false)
  const [bioportal, setBioportal] = useState([])

  const doid = 'http://purl.obolibrary.org/obo/DOID_8514'.split('DOID_')[1]
  const requests = {
    dbpedia: '/infectious/dbpedia',
    bioportal: '/infectious/bioportal',
    bioportalSearch: `/infectious/bioportal/search/${query}`,
    bioportalClass: `/infectious/bioportal/getClass/${doid}`,
    bioportalSynonym: `/infectious/bioportal/getSynonyms/${doid}`,
    bioportalSubclass: `/infectious/bioportal/getSubClasses/${doid}`,
    dbpediaAbstract: `/infectious/dbpedia/getAbstract/${query}`,
  }

  useEffect(() => {
    let requests = [
      axiosInstance.get(`/infectious/dbpedia`),
      axiosInstance.get(`/infectious/bioportal`),
      axiosInstance.get(`/infectious/bioportal/search/${query}`),
    ]
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          console.log(responses[0])
          console.log(responses[1])
          setBioportal(responses[2].data.results.bindings)
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
          <QueryBanner query={query} />
          <Search></Search>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
            {bioportal
              .filter((item, index) => {
                return index < limit && item.definition.value !== undefined
              })
              .map((item, index) => (
                <Highlight
                  index={index}
                  classnames={`text-white hover:text-blue-400`}
                  key={`entry-bioportal-${index}`}
                  uri={item.uri.value}
                  label={item.label.value}
                  definition={item.definition.value}
                />
              ))}
            {others
              ? bioportal
                  .filter((item, index) => {
                    return index < limit && item.definition.value === undefined
                  })
                  .map((item, index) => (
                    <Highlight
                      index={index}
                      classnames={`text-white hover:text-blue-400`}
                      key={`entry-bioportal-${index}`}
                      uri={item.uri.value}
                      label={item.label.value}
                      definition={item.definition.value}
                    />
                  ))
              : null}
          </div>
          <div className="flex items-center justify-center">
            <Button text="Load more" onClick={() => setLimit(limit + 3)} classnames="mb-8" />
            <Button text="Others" onClick={() => setOthers(!others)} classnames="mb-8" />
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </Layout>
  )
}
