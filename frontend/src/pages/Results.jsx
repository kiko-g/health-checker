import axios from 'axios'
import Layout from '../layout/Layout'
import Result from '../components/Result'
import Loading from '../components/Loading'
import QueryBanner from '../components/QueryBanner'
import Search from '../components/Search'
import { Button } from '../components/Utils'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Overview from './Overview'

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3000',
  headers: { 'Access-Control-Allow-Origin': '*' },
})

export default function Results() {
  const { query } = useParams()
  const [viewResult, setViewResult] = useState(false)
  const [others, setOthers] = useState(false)
  const [limit, setLimit] = useState(12)
  const [mounted, setMounted] = useState(false)
  const [bioportal, setBioportal] = useState([])

  useEffect(() => {
    let requests = [axiosInstance.get(`/infectious/bioportal/search/${query}`)]
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          console.log(responses[0])
          setBioportal(responses[0].data.results.bindings)
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
          {viewResult ? (
            <Overview mode={[viewResult, setViewResult]} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
              {bioportal
                .filter((item, index) => {
                  return index < limit && item.definition.value !== undefined
                })
                .map((item, index) => (
                  <Result
                    mode={[viewResult, setViewResult]}
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
                      <Result
                        mode={[viewResult, setViewResult]}
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
          )}
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
