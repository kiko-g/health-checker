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
  const [limit, setLimit] = useState(12)
  const [mounted, setMounted] = useState(false)
  const [bioportal, setBioportal] = useState([])

  useEffect(() => {
    let requests = [
      axiosInstance.get(`/infectious/bioportal`),
      axiosInstance.get(`/infectious/bioportal/search/${query}`),
    ]
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          setBioportal(responses[1].data.results.bindings)
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
              .filter((item, index) => index < limit)
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
          </div>
          <div className="flex items-center justify-center">
            <Button text="Load more" onClick={() => setLimit(limit + 3)} classnames="mb-8" />
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </Layout>
  )
}
