const readlineSync = require('readline-sync')
const got = require('got')

const callApi = async (tasks, troopers, troopersPerTask) => {
  try {
    const response = await got.post('https://get-it-done.rkrayovskyy.now.sh/api', {
      body: {
        tasks,
        troopers,
        troopersPerTask,
      },
      json: true,
    })
    console.log(response.body)
  } catch (error) {
    console.log(error.response.body)
  }
}

const troopers = []
const tasks = []
let repeat = true

while (repeat) {
  const input = readlineSync.question('Troopers? ')
  input !== '' ? troopers.push(input) : (repeat = false)
}
console.log(troopers)
repeat = true
while (repeat) {
  const input = readlineSync.question('Tasks? ')
  input !== '' ? tasks.push(input) : (repeat = false)
}
console.log(tasks)

const troopersPerTask = readlineSync.question('Troopers per task? ')

callApi(tasks, troopers, troopersPerTask)
