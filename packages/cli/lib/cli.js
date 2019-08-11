const Conf = require('conf')
const {
  actionPrompt,
  troopersPrompt,
  troopersSelectPrompt,
  tasksPrompt,
  troopersPerTaskPrompt,
} = require('./cli-prompts')
const confConfig = require('./conf-config')

const config = new Conf(confConfig)

module.exports = async () => {
  const troopersInitial = config.get('troopers') || []
  let troopers
  const action = troopersInitial.length > 0 ? await actionPrompt(troopersInitial) : 'reset'

  switch (action) {
    case 'use':
      troopers = troopersInitial
      break
    case 'select':
      troopers = await troopersSelectPrompt(troopersInitial)
      break
    case 'reset':
      troopers = await troopersPrompt()
      break
    default:
      console.error('Invalid input 💣')
      process.exit(1)
  }
  const tasks = await tasksPrompt()
  const troopersPerTask = await troopersPerTaskPrompt()
  return {
    troopers,
    tasks,
    troopersPerTask,
  }
}
