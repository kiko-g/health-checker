import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { features } from './data/features'

export default function Hero(props) {
  const classnames = props.classnames || ''

  return (
    <div className={`hero flex flex-col items-center justify-center min-h-full ${classnames}`}>
      <Headlines />
      <Navigation />
      <Description />
    </div>
  )
}

const Headlines = () => (
  <div className="text-center">
    <h2 className="text-2xl text-sky-600 font-semibold tracking-widest uppercase">Health Checker</h2>
    <h3 className="text-2xl text-bluegray-700 font-semibold leading-8">A better way to consult health information</h3>
    <p className="max-w-2xl text-md text-bluegray-600 lg:mx-auto">
      Quickly learn about any disease and its context and surroundings
    </p>
  </div>
)

const Navigation = () => (
  <div className="mt-5 z-20 space-x-4">
    <Link to={`/about`}>
      <button className="text-bluegray-500 hover:bg-opacity-50 hover:bg-bluegray-400 hover:text-white font-semibold uppercase tracking-wider px-2 py-1 rounded-sm duration-200">
        About
      </button>
    </Link>
    <Link to={`/about`}>
      <button className="text-bluegray-500 hover:bg-opacity-50 hover:bg-bluegray-400 hover:text-white font-semibold uppercase tracking-wider px-2 py-1 rounded-sm duration-200">
        Contact us
      </button>
    </Link>
    <Link to={`/about`}>
      <button className="text-bluegray-500 hover:bg-opacity-50 hover:bg-bluegray-400 hover:text-white font-semibold uppercase tracking-wider px-2 py-1 rounded-sm duration-200">
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
                className={`absolute flex items-center justify-center h-12 w-12 rounded-md bg-${colors[index]} text-white`}
              >
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-coolgray-800">{feature.name}</p>
            </dt>
            <dd className="mt-1 ml-16 text-sm text-coolgray-500">{feature.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

Hero.propTypes = {
  class: PropTypes.string,
}
