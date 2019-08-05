const buildProps = require('./lib/cli')
const callApi = require('./lib/api')

const run = async () => {
  const { troopers, tasks, troopersPerTask } = await buildProps()
  await callApi(tasks, troopers, troopersPerTask)
}
run()
