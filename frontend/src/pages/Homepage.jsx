import * as React from "react"
import Hero from "../components/Hero"
import Search from "../components/Search"

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bluegray-100 via-bluegray-200 to-bluegray-300 dark:bg-bluegray-700 font-inter">
      <div className="grid grid-cols-1 xl:grid-cols-2 mx-auto">
        <Hero class="min-h-screen px-20" />
        <Search class="min-h-screen px-20" />
      </div>
    </div>
  )
}