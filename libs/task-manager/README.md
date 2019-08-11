# Assign tasks to people

Primarily used by Get It Done CLI tool and API service from a parent project https://github.com/rkrayovskyy/get-it-done.

## Install
```
npm install @get-it-done/task-assigner
```
or
```
yarn add @get-it-done/task-assigner
```

## Use
```
const assignTasks = require('@get-it-done/task-assigner')

const props = {
	"tasks": [
		"buy fika",
		"save the world"
	],
	"troopers": [
		"Han Solo",
		"Superman",
		"Odin"
	],
	"troopersPerTask": 2
}
const assignments = assignTasks(props)
console.info(assignments)
```