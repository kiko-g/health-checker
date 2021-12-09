import {
  GlobeIcon,
  HeartIcon,
  LightBulbIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline"
import PropTypes from "prop-types"
import "./css/hero.css"

const features = [
  {
    name: "Globe",
    description: "Globe mock text. ",
    icon: GlobeIcon,
  },
  {
    name: "Heart",
    description: "Heart mock text. ",
    icon: HeartIcon,
  },
  {
    name: "Idea",
    description: "Idea mock text. ",
    icon: LightBulbIcon,
  },
  {
    name: "Information",
    description: "Information mock text. ",
    icon: InformationCircleIcon,
  },
]

export default function Hero(props) {
  return (
    <div className={`flex flex-col items-center justify-center ${props.class}`}>
      <div className="hero-animated absolute inset-0 max-w-full xl:max-w-half min-h-screen"></div>
      <div className="lg:text-center">
        <h2 className="text-xl text-coolgray-700 font-semibold tracking-wide uppercase">
          Health Checker
        </h2>
        <h3 className="text-2xl text-coolgray-800 leading-8 font-extrabold tracking-tight">
          A better way to consult health information
        </h3>
        <p className="max-w-2xl text-md text-gray-600 lg:mx-auto">
          Quickly learn about any disease and its context and surroundings
        </p>
      </div>

      <div className="mt-10">
        <dl className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-coolgray-800">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-1 ml-16 text-sm text-coolgray-500">
                {feature.description}
                {feature.description}
                {feature.description}
                {feature.description}
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

Hero.propTypes = {
  class: PropTypes.string,
}
