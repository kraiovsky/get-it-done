const buildProps = require('./lib/cli')
const callApi = require('./lib/api')

const { troopers, tasks, troopersPerTask } = buildProps()
callApi(tasks, troopers, troopersPerTask)
