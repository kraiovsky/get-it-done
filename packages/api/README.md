# Get it done

Manage team assignments with ease:
- PR reviews
- buying Fika
- doing QA
- [your task]

Service takes an array of tasks, array of people, and a number of people needed per task. It will return randomly assigned people to tasks.

## Running
This service is available as API at https://get-it-done.rkrayovskyy.now.sh/

Request:
```
curl -X POST \
  https://get-it-done.rkrayovskyy.now.sh/api \
  -H 'Content-Type: application/json' \
  -H 'Host: get-it-done.rkrayovskyy.now.sh' \
  -d '{
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
}'
```
Response:

```
{
    "buy fika": ["superman","Odin"],
    "save the world": ["han solo","superman"]
}
```

## CLI tool
You can use CLI tool to do same job locally, check it out: https://github.com/rkrayovskyy/get-it-done/packages/cli

## Development
This project is built with Now and its Node.js builder https://zeit.co/docs/v2/advanced/builders/#node.js 

Run locally: `now dev`

Deploy to Zeit serverless: `now`