import axios from 'axios'
import Layout from '../layout/Layout'
import Highlight from '../components/Highlight'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ax = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3000',
  headers: { 'Access-Control-Allow-Origin': '*' },
})

export default function Results() {
  let { query } = useParams()
  const [data, setData] = useState([])

  useEffect(() => {
    ax.get('/infectious/dbpedia')
      .then((response) => {
        setData(response.data.results.bindings)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <Layout>
      <div className="text-2xl bg-bluegray-400 text-white rounded-lg p-4">
        QUERY&nbsp;&middot;&nbsp;<span className="text-amber-400 uppercase font-bold">{query}</span>
      </div>
      <div className="grid grid-cols-4 gap-2 my-4">
        {data.map((item, index) => (
          <Highlight key={`concept-${index}`} url={item['Concept'].value} index={index} />
        ))}
      </div>
    </Layout>
  )
}
