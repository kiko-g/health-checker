import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { features } from './data/features'

export default function Hero({ classnames }) {
  return (
    <div
      className={`
        bg-gradient-to-bl from-blue-200 via-teal-100 to-violet-200
        dark:bg-gradient-to-bl dark:from-bluegray-700 dark:via-bluegray-700 dark:to-bluegray-700
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
    <h3 className="text-2xl text-bluegray-700 dark:text-sky-100 font-semibold leading-8">
      A better way to consult health information
    </h3>
    <p className="max-w-2xl text-md text-bluegray-600 dark:text-white lg:mx-auto">
      Quickly learn about any disease and its context and surroundings
    </p>
  </div>
)

const Navigation = () => (
  <div className="mt-5 z-20 space-x-4">
    <Link to={`/about`}>
      <button className="text-bluegray-500 hover:bg-opacity-50 hover:bg-bluegray-400 hover:text-white font-semibold uppercase tracking-wider px-2 py-1 rounded duration-200">
        About
      </button>
    </Link>
    <Link to={`/about`}>
      <button className="text-bluegray-500 hover:bg-opacity-50 hover:bg-bluegray-400 hover:text-white font-semibold uppercase tracking-wider px-2 py-1 rounded duration-200">
        Contact us
      </button>
    </Link>
    <Link to={`/about`}>
      <button className="text-bluegray-500 hover:bg-opacity-50 hover:bg-bluegray-400 hover:text-white font-semibold uppercase tracking-wider px-2 py-1 rounded duration-200">
        FAQ
      </button>
    </Link>
  </div>
)

const Description = () => {
  const colors = ['rose-400', 'teal-400', 'purple-400', 'blue-400']
  return (
    <div className="mt-10 w-full">
      <dl className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div key={feature.name} className="relative">
            <dt>
              <div
                className={`absolute flex items-center justify-center h-12 w-12 rounded bg-${colors[index]} text-white`}
              >
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 text-lg leading-6 font-semibold text-coolgray-800">{feature.name}</p>
            </dt>
            <dd className="mt-2 ml-16 font-medium text-justify text-sm text-coolgray-500">{feature.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
