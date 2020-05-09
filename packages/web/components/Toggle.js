import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'

const Toggle = ({ condition, handler }) => {
  return (
    <span role="button" tabIndex="0" onClick={handler} onKeyPress={handler}>
      {condition ? (
        <FontAwesomeIcon icon={faToggleOn} text-color="primary" size="2x" />
      ) : (
        <FontAwesomeIcon icon={faToggleOff} text-color="primary" size="2x" />
      )}
    </span>
  )
}

Toggle.propTypes = {
  condition: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired,
}

export default Toggle
