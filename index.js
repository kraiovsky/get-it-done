const buildProps = require('./lib/cli')
const callApi = require('./lib/api')

const run = async () => {
  try {
    const { troopers, tasks, troopersPerTask } = await buildProps()
    await callApi(tasks, troopers, troopersPerTask)
  } catch {
    console.error(`Not sure what's happenned. Here's a unicorn for you: 🦄`)
  }
}
run()
