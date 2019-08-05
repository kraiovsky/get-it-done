const prompts = require('prompts')

module.exports = async () => {
  const troopers = []
  const tasks = []

  let repeat = true
  while (repeat) {
    const { trooper } = await prompts({
      type: 'text',
      name: 'trooper',
      message: 'Add a person:',
    })
    trooper !== '' ? troopers.push(trooper) : (repeat = false)
  }
  console.info('👩‍💻', troopers)

  repeat = true
  while (repeat) {
    const { task } = await prompts({
      type: 'text',
      name: 'task',
      message: 'Add a task:',
    })
    task !== '' ? tasks.push(task) : (repeat = false)
  }
  console.info('📝', tasks)

  const { troopersPerTask } = await prompts({
    type: 'number',
    name: 'troopersPerTask',
    message: 'How many people needed per task?',
  })

  return {
    troopers,
    tasks,
    troopersPerTask,
  }
}
