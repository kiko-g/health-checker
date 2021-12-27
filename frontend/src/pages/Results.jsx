import axios from 'axios'
import Layout from '../layout/Layout'
import Highlight from '../components/Highlight'
import Loading from '../components/Loading'
import QueryBanner from '../components/QueryBanner'
import { Headline, Button } from '../components/Utils'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3000',
  headers: { 'Access-Control-Allow-Origin': '*' },
})

export default function Results() {
  const { query } = useParams()
  const [limit, setLimit] = useState(20)
  const [mounted, setMounted] = useState(false)
  const [dbpedia, setDbpedia] = useState([])
  const [bioportal, setBioportal] = useState([])

  useEffect(() => {
    let requests = [axiosInstance.get('/infectious/dbpedia'), axiosInstance.get('/infectious/bioportal')]
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          setDbpedia(responses[0].data.results.bindings)
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
        <section>
          <QueryBanner query={query} />
          <div className="flex space-x-4 p-4">
            <div className="p-3 rounded-md">
              <Headline text="DB Pedia" />
              {dbpedia
                .filter((item, index) => index < limit)
                .map((item, index) => (
                  <Highlight
                    classnames={`text-white`}
                    key={`concept-dbpedia-${index}`}
                    url={item['Concept'].value}
                    index={index}
                  />
                ))}
            </div>
            <div className="p-3 rounded-md">
              <Headline text="Bioportal" />
              {bioportal
                .filter((item, index) => index < limit)
                .map((item, index) => (
                  <Highlight
                    classnames={`text-white`}
                    key={`entry-bioportal-${index}`}
                    url={item.ont.value}
                    index={index}
                  />
                ))}
            </div>
          </div>
          <div className="flex mb-4 items-center justify-center">
            <Button onClick={() => setLimit(limit + 20)} />
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </Layout>
  )
}
