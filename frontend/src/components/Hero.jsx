import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { features } from './data/features'

export default function Hero({ classnames }) {
  return (
    <div
      className={`
        bg-gradient-to-bl from-teal-200 via-blue-100 to-violet-200
        dark:bg-gradient-to-bl dark:from-slate-700 dark:via-slate-700 dark:to-slate-700
       dark:text-white flex flex-col items-center justify-center min-h-full ${classnames}`}
    >
      <Headlines />
      <Navigation />
      <Description />
    </div>
  )
}

Hero.propTypes = {
  classnames: PropTypes.string,
}

const Headlines = () => (
  <div className="text-center">
    <h2 className="text-3xl text-sky-600 dark:text-sky-200 font-semibold tracking-widest uppercase">Health Checker</h2>
    <h3 className="text-2xl text-slate-700 dark:text-sky-100 font-semibold leading-8">
      A better way to consult health information
    </h3>
    <p className="max-w-2xl text-md text-slate-600 dark:text-white lg:mx-auto">
      Quickly learn about any disease and its context and surroundings
    </p>
  </div>
)

const Navigation = () => {
  const links = ['about', 'faq', 'contact']
  return (
    <div className="mt-6 z-20 space-x-6">
      {links.map((location, index) => (
        <Link to={`/${location}`} key={`location-${index}`}>
          <button
            type="button"
            className="text-slate-500 dark:text-white hover:bg-opacity-50 hover:bg-slate-400 hover:text-white
            font-semibold uppercase tracking-wider px-2 py-1 rounded duration-200"
          >
            {location}
          </button>
        </Link>
      ))}
    </div>
  )
}

const Description = () => {
  const colors = ['bg-rose-400', 'bg-teal-400', 'bg-purple-400', 'bg-blue-400']
  return (
    <div className="mt-12 w-full">
      <dl className="grid md:grid-cols-2 gap-12">
        {features.map((feature, index) => (
          <div key={feature.name} className="relative">
            <dt>
              <div
                className={`absolute flex items-center justify-center h-12 w-12 rounded ${colors[index]} text-white`}
              >
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 text-lg leading-6 font-semibold text-slate-800 dark:text-white">{feature.name}</p>
            </dt>
            <dd className="mt-1 ml-16 font-normal text-justify text-sm text-slate-500 dark:text-slate-200">
              {feature.description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
