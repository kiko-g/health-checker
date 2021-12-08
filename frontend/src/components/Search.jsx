import * as React from "react"
import Checkbox from "./utilities/Checkbox"
import { SearchIcon } from "@heroicons/react/outline"

export default function Search() {
  return (
    <div className="w-full min-h-half flex items-center justify-center">
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
              type="submit"
              className="bg-gradient-to-br from-green-400 to-blue-500 hover:opacity-80  duration-200 text-white p-3 rounded-full"
            >
              <SearchIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="flex w-4/5 relative shadow-md mx-auto rounded-b-xl bg-coolgray-100 border-gray-300">
          <div className="mx-auto space-x-8 p-2">
            <Checkbox color="blue-400" label="Diseases" />
            <Checkbox color="teal-500" label="Vaccines" />
            <Checkbox color="violet-400" label="Something" checked={true} />
          </div>
        </div>
      </form>
    </div>
  )
}
