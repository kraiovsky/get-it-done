const buildProps = require('./lib/cli')
const { assignTroopersToTasks } = require('./lib/task-manager')

const run = async () => {
  try {
    const props = await buildProps()
    await assignTroopersToTasks(props)
  } catch {
    console.error(`Not sure what's happenned. Here's a unicorn for you: 🦄`)
  }
}
run()
