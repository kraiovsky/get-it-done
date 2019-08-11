#!/usr/bin/env node
const { render } = require('prettyjson')
const buildProps = require('./lib/cli')
const assignTasks = require('@get-it-done/task-assigner')

const run = async () => {
  try {
    const props = await buildProps()
    const assignments = await assignTasks(props)
    console.info('\nHere you are:\n', render(assignments))
  } catch {
    console.error(`Not sure what's happenned. Here's a unicorn for you: 🦄`)
  }
}
run()
