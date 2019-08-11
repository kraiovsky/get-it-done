# CLI tool to help you and your team get things done

## Install
```
npm -g install @get-it-done/cli
```
or
```
yarn global add @get-it-done/cli
```

## Use
```
> get-it-done
```

On the first run, you will be asked to enter names of your team, tasks to do, and amount  of people needed per task. Team names and people per task configuration will be saved.

![first run demo](/packages/cli/static/demo-1st-run.gif)

On the consequent runs, you will be prompted to either use current list, select people for this one run (w/o saving it), or reset the list.
People per task will be pre-populated from your config, which can be reset as well.

![next run demo](/packages/cli/static/demo-next-run.gif)

## More ways to get things done
This project has it's serverless API version, check it out: https://github.com/rkrayovskyy/get-it-done/packages/api
