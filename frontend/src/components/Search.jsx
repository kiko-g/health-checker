import * as React from "react"
import PropTypes from "prop-types"
import { SearchIcon } from "@heroicons/react/outline"

const axios = require("axios")
const instance = axios.create({
  timeout: 1000,
  baseURL: "http://localhost:3000",
  headers: { "Access-Control-Allow-Origin": "*" },
})

const request = () => {
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

export default function Search(props) {
  return (
    <div className={`w-full flex items-center justify-center ${props.class}`}>
      <form className="w-124 m-2">
        <div className="z-10 flex relative shadow-md rounded-xl bg-coolgray-100 border-gray-300">
          <input
            id="search-bar"
            type="search"
            name="search"
            className="w-full text-lg text-gray-700 px-5 py-3 bg-coolgray-100 focus:bg-coolgray-50 focus:ring-teal-500 focus:border-teal-500 border-0 rounded-l-xl"
            placeholder="Search"
          />
          <div className="p-3">
            <button
              onClick={request}
              className="bg-gradient-to-br from-green-400 to-blue-500 hover:opacity-80 duration-200 text-white p-3 rounded-full"
            >
              <SearchIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

Search.propTypes = {
  class: PropTypes.string,
}
