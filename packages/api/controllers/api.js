const assignTasks = require('@get-it-done/task-assigner')

module.exports = async (req, res) => {
  const { body } = req
  const assignments = assignTasks(body)
  res.status(200).json(assignments)
}
