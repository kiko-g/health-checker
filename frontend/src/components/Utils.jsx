import * as React from 'react'
import PropTypes from 'prop-types'

export const Button = ({ text, onClick, classnames }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
    bg-slate-100 text-slate-600 hover:bg-slate-700 hover:text-white focus:ring-slate-500
    dark:bg-slate-600 dark:text-white dark:hover:bg-slate-100 dark:hover:text-slate-600 dark:focus:ring-slate-500
    border-2 border-slate-200/50 px-4 py-2 rounded font-semibold focus:ring-2 duration-100 ${classnames}`}
  >
    {text}
  </button>
)

export const Headline = ({ text }) => {
  return (
    <h1 className="text-xl px-4 py-2 rounded font-semibold focus:ring-2 bg-slate-100 text-slate-700 mb-1">{text}</h1>
  )
}

export const Checkbox = (props) => {
  const [checked, setChecked] = React.useState(props.checked)
  const handleClick = () => setChecked(!checked)

  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className={`form-checkbox duration-100 focus:ring-slate-200 border-gray-300 border-2 rounded p-2 text-${props.color}`}
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
