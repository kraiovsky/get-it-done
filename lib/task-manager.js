const shuffle = require('just-shuffle')
const { render } = require('prettyjson')
const { rotate } = require('./array-helpers')

const assignTroopersToTasks = ({ tasks, troopers, troopersPerTask }) => {
  let shuffledTroopers = shuffle(troopers)

  const assignments = {}
  tasks.forEach(task => {
    assignments[task] = shuffledTroopers.slice(0, troopersPerTask)
    shuffledTroopers = rotate(shuffledTroopers, troopersPerTask)
  })

  console.info('\nHere you are:\n', render(assignments))
}

module.exports = {
  assignTroopersToTasks,
}
