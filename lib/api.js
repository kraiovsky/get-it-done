const got = require('got')
const { render } = require('prettyjson')
const ora = require('ora')

const apiUrl = 'https://get-it-done.rkrayovskyy.now.sh/api'
const spinner = ora('Randomising it for you...')

module.exports = async (tasks, troopers, troopersPerTask) => {
  try {
    spinner.start()
    const response = await got.post(apiUrl, {
      body: {
        tasks,
        troopers,
        troopersPerTask,
      },
      json: true,
    })
    spinner.succeed('All done, here you are:')
    console.info(render(response.body))
  } catch (error) {
    spinner.fail('Sorry, looks like I let you down this time...')
    console.error(render(error.response.body))
  }
}
