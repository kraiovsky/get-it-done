const readlineSync = require('readline-sync')

module.exports = () => {
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

  return {
    troopers,
    tasks,
    troopersPerTask,
  }
}
