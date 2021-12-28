import * as React from 'react'
import PropTypes from 'prop-types'

export const Button = ({ text, onClick, classnames }) => (
  <button
    onClick={onClick}
    className={`
    bg-bluegray-100 text-bluegray-600 hover:bg-bluegray-700 hover:text-white focus:ring-bluegray-500
    dark:bg-bluegray-600 dark:text-white dark:hover:bg-bluegray-100 dark:hover:text-bluegray-600 dark:focus:ring-bluegray-500
    px-4 py-2 rounded-full font-semibold focus:ring-2 duration-100 ${classnames}`}
  >
    {text}
  </button>
)

export const Headline = ({ text }) => {
  return (
    <h1 className="text-xl px-4 py-2 rounded font-semibold focus:ring-2 bg-bluegray-100 text-bluegray-700 mb-1">
      {text}
    </h1>
  )
}

export const Checkbox = (props) => {
  const [checked, setChecked] = React.useState(props.checked)
  const handleClick = () => setChecked(!checked)

  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className={`form-checkbox duration-100 focus:ring-bluegray-200 border-coolgray-300 border-2 rounded p-2 text-${props.color}`}
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
