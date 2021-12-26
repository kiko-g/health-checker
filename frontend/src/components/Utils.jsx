import * as React from 'react'
import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import PropTypes from 'prop-types'
import useDarkMode from '../hooks/useDarkMode'

export const PulseLoader = () => (
  <div className="border border-gray-100 shadow-lg rounded-md p-4 max-w-4xl w-full mx-auto">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-gray-200 h-10 w-10"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-gray-200 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-gray-200 rounded col-span-2"></div>
            <div className="h-2 bg-gray-200 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
)

export const Button = (onClick) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-lg font-semibold focus:ring-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 focus:ring-indigo-600 dark:bg-bluegray-700 dark:text-bluegray-100 dark:hover:bg-bluegray-600 dark:hover:text-white dark:focus:ring-bluegray-500 mt-2"
  >
    Load more
  </button>
)

export const Headline = ({ text }) => {
  return <h1 className="text-3xl font-bold text-indigo-400 dark:text-indigo-300 mb-1">{text}</h1>
}

export const DarkModeSwitch = () => {
  const [darkTheme, setDarkTheme] = useDarkMode()
  const handleMode = () => setDarkTheme(!darkTheme)

  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label passive className="mr-2">
          {darkTheme ? (
            <MoonIcon className="block h-6 w-6 transition duration-200 ease text-bluegray-400" aria-hidden="true" />
          ) : (
            <SunIcon className="block h-6 w-6 transition duration-200 ease text-orange-300" aria-hidden="true" />
          )}
        </Switch.Label>
        <Switch
          checked={darkTheme}
          onChange={handleMode}
          className={`${
            darkTheme ? 'bg-blue-300' : 'bg-bluegray-400'
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
        >
          <span
            className={`${
              darkTheme ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  )
}

export const Checkbox = (props) => {
  const [checked, setChecked] = React.useState(props.checked)
  const handleClick = () => setChecked(!checked)

  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className={`form-checkbox duration-100 focus:ring-blue-200 border-coolgray-300 border-2 rounded-sm p-2 text-${props.color}`}
        checked={checked}
        onChange={handleClick}
      />
      <span className="ml-2">{props.label}</span>
    </label>
  )
}

Checkbox.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
}

Checkbox.defaultProps = {
  color: 'red-400',
  label: 'Checkbox Label',
  checked: true,
}
