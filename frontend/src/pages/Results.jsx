import axios from "axios"
import Header from "../components/Header"
import { useParams } from "react-router-dom"

export default function Results() {
  let { query } = useParams()
  console.log(query)
  console.log(request)

  return (
    <div className="homepage min-h-screen bg-coolgray-300 dark:bg-bluegray-700 dark:text-gray-100 font-inter">
      <Header siteTitle="Health Checker" />
      <div className="min-h-adjusted mx-auto p-4">
        <h3>Query: {query}</h3>
      </div>
    </div>
  )
}

const request = () => {
  let instance = axios.create({
    baseURL: process.env.baseURL || "http://localhost:3000",
    headers: { "Access-Control-Allow-Origin": "*" },
  })

  instance
    .get("/infectious/dbpedia")
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
    .then(function () {
      // always executed
    })
}
