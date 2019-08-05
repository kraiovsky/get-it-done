const got = require('got')

const apiUrl = 'https://get-it-done.rkrayovskyy.now.sh/api'

module.exports = async (tasks, troopers, troopersPerTask) => {
  try {
    const response = await got.post(apiUrl, {
      body: {
        tasks,
        troopers,
        troopersPerTask,
      },
      json: true,
    })
    console.info(JSON.stringify(response.body, null, 4))
  } catch (error) {
    console.error(JSON.stringify(error.response.body, null, 4))
  }
}
