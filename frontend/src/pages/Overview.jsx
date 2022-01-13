import React from 'react'
import Highlight from '../components/Highlight'
import { ArrowLeftIcon } from '@heroicons/react/outline'

export default function Overview({ mode }) {
  const [viewResult, setViewResult] = mode

  return (
    <>
      <button type="button" onClick={() => setViewResult(false)} className="">
        <ArrowLeftIcon className="w-6 h-6" />
      </button>
      <h2 className="my-5 text-2xl text-sky-600 font-semibold tracking-widest">Disease Name</h2>
      <Highlight
        styling={`border-2 shadow-md border-indigo-200 rounded-md`}
        classnames={`text-white`}
        label="Definition"
        definition="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor, lectus et euismod tristique, turpis arcu imperdiet arcu, at ullamcorper urna risus et lorem."
      />
      <div className="grid grid-cols-1 my-5 md:grid-cols-2 xl:grid-cols-2 gap-5 w-full">
        <Highlight
          styling={`border-2 shadow-md border-indigo-200 rounded-md`}
          classnames={`text-white`}
          label="Symptoms"
          definition="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor, lectus et euismod tristique, turpis arcu imperdiet arcu, at ullamcorper urna risus et lorem."
        />
        <Highlight
          styling={`border-2 shadow-md border-indigo-200 rounded-md`}
          classnames={`text-white`}
          label="Complications"
          definition="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor, lectus et euismod tristique, turpis arcu imperdiet arcu, at ullamcorper urna risus et lorem."
        />
        <Highlight
          styling={`border-2 shadow-md border-indigo-200 rounded-md`}
          classnames={`text-white`}
          label="Treatment"
          definition="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor, lectus et euismod tristique, turpis arcu imperdiet arcu, at ullamcorper urna risus et lorem."
        />
        <Highlight
          styling={`border-2 shadow-md border-indigo-200 rounded-md`}
          classnames={`text-white`}
          label="Causes"
          definition="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor, lectus et euismod tristique, turpis arcu imperdiet arcu, at ullamcorper urna risus et lorem."
        />
      </div>
    </>
  )
}
