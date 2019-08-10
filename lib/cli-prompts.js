const prompts = require('prompts')
const Conf = require('conf')
const k = require('kleur')
const confConfig = require('./conf-config')

const config = new Conf(confConfig)

const repeatablePrompt = async question => {
  const response = []
  let prompt = true
  while (prompt) {
    await prompts(question, {
      onSubmit: (_, value) => {
        if (value === '') {
          prompt = false
          return true
        } else {
          response.push(value)
        }
      },
      onCancel: () => {
        prompt = false
      },
    })
  }
  return response
}

const actionPrompt = async troopers => {
  const { value } = await prompts({
    type: 'select',
    name: 'value',
    message: `I have found the following list of people:\n${k.bold().green(troopers.join(', '))}`,
    choices: [
      { title: 'Use this full list', value: 'use' },
      { title: 'Select from the list', value: 'select' },
      { title: 'Reset the list', value: 'reset' },
    ],
  })
  return value
}

const troopersPrompt = async () => {
  const question = {
    type: 'text',
    name: 'value',
    message: `Add a person ${k.grey('or <enter> to continue')}`,
  }
  const response = await repeatablePrompt(question)
  config.set('troopers', response)
  return response
}

const troopersSelectPrompt = async troopers => {
  const { value } = await prompts({
    type: 'multiselect',
    name: 'value',
    message: 'Select a person:',
    min: 1,
    choices: troopers.map(trooper => ({ title: trooper, value: trooper })),
  })
  return value
}

const tasksPrompt = async () => {
  const question = {
    type: 'text',
    name: 'value',
    message: `Add a task ${k.grey('or <enter> to continue')}`,
  }
  return await repeatablePrompt(question)
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
