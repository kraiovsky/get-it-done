const prompts = require('prompts')
const Conf = require('conf')

const config = new Conf()

const actionPrompt = async troopers => {
  const { value } = await prompts({
    type: 'select',
    name: 'value',
    message: `We have found the following list of people: ${troopers}. Do you want to use it?`,
    choices: [
      { title: 'Use this list', value: 'use' },
      { title: 'Select from the list', value: 'select' },
      { title: 'Reset the list', value: 'reset' },
    ],
  })
  return value
}

const troopersPrompt = async () => {
  const troopers = []
  let prompt = true
  while (prompt) {
    const { value } = await prompts({
      type: 'text',
      name: 'value',
      message: 'Add a person:',
    })
    value !== '' ? troopers.push(value) : (prompt = false)
  }
  config.set('troopers', troopers)
  return troopers
}

const troopersSelectPrompt = async troopers => {
  const { value } = await prompts({
    type: 'multiselect',
    name: 'value',
    message: 'Select a person:',
    choices: troopers.map(trooper => ({ title: trooper, value: trooper })),
  })
  return value
}

const tasksPrompt = async () => {
  const tasks = []
  let prompt = true
  while (prompt) {
    const { value } = await prompts({
      type: 'text',
      name: 'value',
      message: 'Add a task:',
    })
    value !== '' ? tasks.push(value) : (prompt = false)
  }
  return tasks
}

const troopersPerTaskPrompt = async () => {
  const initial = config.get('troopersPerTask')
  const { value } = await prompts({
    type: 'number',
    name: 'value',
    message: 'How many people needed per task?',
    initial,
  })
  config.set('troopersPerTask', value)
  return value
}

module.exports = {
  actionPrompt,
  troopersPrompt,
  troopersSelectPrompt,
  tasksPrompt,
  troopersPerTaskPrompt,
}
