const got = require('got')
const { render } = require('prettyjson')

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
    console.info(render(response.body))
  } catch (error) {
    console.error(render(error.response.body))
  }
}
