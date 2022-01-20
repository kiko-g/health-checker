import React from 'react'
import Layout from '../layout/Layout'

export default function Faq() {
  return (
    <Layout>
      <ul className="text-xl list-disc text-gray-700 dark:text-white space-y-2 px-8 py-4 font-normal">
        <li>
          What are the sources of{' '}
          <span className="font-bold underline decoration-2 decoration-blue-500/50">information</span>?
        </li>
        <li className="list-inside list-none text-gray-400">
          Data sources are the DBPedia and Bioportal semantic web datasets and the team worked on linking the data using
          SPARQL queries that are executed in real time as the user navigates through the website.
        </li>
      </ul>
      <ul className="text-xl list-disc text-gray-700 dark:text-white space-y-2 px-8 py-4 font-normal">
        <li>
          Can the information on this website be{' '}
          <span className="font-bold underline decoration-2 decoration-teal-500/50">trusted</span>?
        </li>
        <li className="list-inside list-none text-gray-400">
          The data from Bioportal is medically approved, but often somewhat overly technical. Linking concepts from that
          dataset to the DBPedia was challenging but also proved effective in quality and consistency of information.
        </li>
      </ul>
      <ul className="text-xl list-disc text-gray-700 dark:text-white space-y-2 px-8 py-4 font-normal">
        <li>
          Will this platform <span className="font-bold underline decoration-2 decoration-teal-500/50">evolve</span>with
          time?
        </li>
        <li className="list-inside list-none text-gray-400">
          Maybe. The next steps to improve this platform would be to incorporate more data sources and possibly adding a
          machine learning layer that links concepts more accuretly and adds richness to the information found on the
          website.
        </li>
      </ul>
    </Layout>
  )
}
