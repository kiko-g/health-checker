import React, { useState } from "react"
import PropTypes from "prop-types"

export default function Checkbox(props) {
  const [checked, setChecked] = useState(props.checked)
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
  color: "red-400",
  label: "Checkbox Label",
  checked: true,
}
