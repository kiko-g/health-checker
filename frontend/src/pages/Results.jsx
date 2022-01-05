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
  const [limit, setLimit] = useState(10)
  const [mounted, setMounted] = useState(false)
  const [dbpedia, setDbpedia] = useState([])
  const [bioportal, setBioportal] = useState([])
  const doid = 'http://purl.obolibrary.org/obo/DOID_8514'.split('DOID_')[1]

  useEffect(() => {
    let requests = [
      axiosInstance.get('/infectious/dbpedia'),
      axiosInstance.get('/infectious/bioportal'),
      axiosInstance.get(`/infectious/bioportal/search/${query}`),
      axiosInstance.get(`/infectious/bioportal/getClass/${doid}`),
      axiosInstance.get(`/infectious/bioportal/getSynonyms/${doid}`),
      axiosInstance.get(`/infectious/bioportal/getSubClasses/${doid}`),
      axiosInstance.get(`/infectious/dbpedia/getAbstract/${query}`),
    ]
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          setDbpedia(responses[0].data.results.bindings)
          setBioportal(responses[1].data.results.bindings)
          console.log(responses[2])
          console.log(responses[3])
          console.log(responses[4])
          console.log(responses[5])
          console.log(responses[6])
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
          <div className="flex space-x-4 my-4">
            <div>
              <Headline text="DB Pedia" />
              <div className="px-2">
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
            </div>
            <div>
              <Headline text="Bioportal" />
              <div className="px-2">
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
          </div>
          <div className="flex items-center justify-center">
            <Button text="Load more" onClick={() => setLimit(limit + 10)} classnames="mb-8" />
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </Layout>
  )
}
