import React from 'react'
import PropTypes from 'prop-types'

const NumberInput = ({
  value,
  valueChangeHandler,
  incrementHandler,
  decrementHandler,
}) => {
  return (
    <div>
      <button
        className="troopers-per-task decrement"
        onClick={decrementHandler}
      >
        -
      </button>
      <input
        className="troopers-per-task input"
        value={value}
        onChange={valueChangeHandler}
      />
      <button
        className="troopers-per-task increment"
        onClick={incrementHandler}
      >
        +
      </button>
    </div>
  )
}

NumberInput.propTypes = {
  value: PropTypes.number.isRequired,
  valueChangeHandler: PropTypes.func.isRequired,
  incrementHandler: PropTypes.func.isRequired,
  decrementHandler: PropTypes.func.isRequired,
}

export default NumberInput
