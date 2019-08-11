const rotate = (array, shiftCount) => {
  while (shiftCount--) {
    const [first, ...rest] = array
    array = [...rest, first]
  }
  return array
}

module.exports = {
  rotate,
}
