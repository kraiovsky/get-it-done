const shuffle = require('just-shuffle')
const { rotate } = require('./array-helpers')

module.exports = ({ tasks, troopers, troopersPerTask }) => {
  let shuffledTroopers = shuffle(troopers)

  const assignments = {}
  tasks.forEach(task => {
    assignments[task] = shuffledTroopers.slice(0, troopersPerTask)
    shuffledTroopers = rotate(shuffledTroopers, troopersPerTask)
  })
  return assignments
}
