import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'
import assignTasks from '@get-it-done/task-assigner'
import classNames from 'classnames'
import { Grid, Cell } from '../components/Layout'
import Toggle from '../components/Toggle'
import NumberInput from '../components/NumberInput'
import { setPageTitle, toggleTheme } from '../store/actionCreators'

const pageTitle = 'Profile'

const Home = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const { theme } = state

  const { troopers: savedTroopers } = parseCookies()

  const [troopers, setTroopers] = useState(
    (savedTroopers && savedTroopers.split(',')) || [],
  )
  const [rememberTroopers, setRememberTroopers] = useState(false)
  const [tasks, setTasks] = useState([])
  const [troopersPerTask, setTroopersPerTask] = useState(1)
  const [result, setResult] = useState({})
  const [resultsMode, setResultsMode] = useState('json')
  const [error, setError] = useState(false)

  const resultPlainFormatClass = classNames({
    'result-format-toggle': true,
    active: resultsMode === 'plain',
  })
  const resultJsonFormatClass = classNames({
    'result-format-toggle': true,
    active: resultsMode === 'json',
  })

  useEffect(() => {
    dispatch(setPageTitle(pageTitle))
    if (savedTroopers?.length > 0) {
      setRememberTroopers(true)
    }
  }, [dispatch, savedTroopers])

  const handleToggleTheme = () => {
    dispatch(toggleTheme())
  }

  const handleTroopersListChange = (event) => {
    setTroopers(event.target.value.split('\n'))
  }
  const handleTasksListChange = (event) => {
    setTasks(event.target.value.split('\n'))
  }
  const handleRememberTroopersToggle = () => {
    setRememberTroopers(!rememberTroopers)
  }
  const handleTroopersPerTaskDecrement = () => {
    if (troopersPerTask > 1) {
      setTroopersPerTask(troopersPerTask - 1)
    }
  }
  const handleTroopersPerTaskIncrement = () => {
    setTroopersPerTask(troopersPerTask + 1)
  }
  const handleTroopersPerTaskChange = (event) => {
    const value = event.target.value
    if (value > 0) {
      setTroopersPerTask(value)
    }
  }
  const handleAssign = () => {
    const filteredTroopersList = troopers.filter((e) => e)
    if (filteredTroopersList.length === 0) {
      setError(
        'You need more people on the team, otherwise you will have to do all the work yourself...',
      )
      return
    }
    if (tasks.length === 0) {
      setError('Looks like there is no work for today, hurray!')
      return
    }
    if (rememberTroopers) {
      setCookie(null, 'troopers', filteredTroopersList, {
        maxAge: 12 * 30 * 24 * 60 * 60,
        path: '/',
      })
    } else {
      destroyCookie(null, 'troopers')
    }
    const assignment = assignTasks({
      tasks,
      troopers: filteredTroopersList,
      troopersPerTask,
    })
    if (assignment) {
      setError(false)
      setResult(assignment)
    } else {
      setError('Oops, something went wrong...')
    }
  }

  const renderPlainAssignment = () =>
    Object.keys(result).map((k, i) => {
      return (
        <div key={i}>
          <div>{k}:</div>
          {result[k].map((e) => {
            return (
              <div key={e} className="padded-left">
                - {e}
              </div>
            )
          })}
          <br />
        </div>
      )
    })

  const renderJsonAssignment = () => JSON.stringify(result, null, 2)

  return (
    <Grid columns={12} columns-s={6} className="landing" padded>
      <Cell span="5-8" span-s="row">
        <div className="h1">Get it done</div>
      </Cell>
      <Cell span="5-8" span-s="row">
        <div className="h2">Shuffle and assign tasks among your team</div>
        <p className="p2">
          Helpful to distribute PR reviews or any other job when you need to be
          a bit more assertive and random.
        </p>
      </Cell>
      <Cell span="5-8" span-s="row">
        <label htmlFor="troopers">Add your team members, one per line</label>
        <textarea
          id="troopers"
          value={Array.isArray(troopers) && troopers.join('\n')}
          rows="10"
          required
          onChange={handleTroopersListChange}
        />
        <div className="theme-toggle">
          <Grid columns="12" columns-s="6">
            <Cell span="8" span-s="4" className="v-center padded-left">
              Remember list if people &nbsp;
              <abbr title="uses cookies">
                <FontAwesomeIcon
                  icon={faCookieBite}
                  text-color="lowlight"
                  size="xs"
                />
              </abbr>
            </Cell>
            <Cell span="1" span-s="2">
              <Toggle
                condition={rememberTroopers}
                handler={handleRememberTroopersToggle}
              />
            </Cell>
          </Grid>
        </div>
      </Cell>
      <Cell span="5-8" span-s="row">
        <label htmlFor="tasks">Add tasks, one per line</label>
        <textarea
          id="tasks"
          rows="10"
          required
          onChange={handleTasksListChange}
        />
      </Cell>
      <Cell span="5-8" span-s="row">
        <Grid columns="6" columns-s="6">
          <Cell span="3" span-s="row" className="v-center">
            How many people per task do you need?
          </Cell>
          <Cell span="3" span-s="row">
            <NumberInput
              value={troopersPerTask}
              valueChangeHandler={handleTroopersPerTaskChange}
              incrementHandler={handleTroopersPerTaskIncrement}
              decrementHandler={handleTroopersPerTaskDecrement}
            />
          </Cell>
        </Grid>
      </Cell>
      <Cell span="5-8" span-s="row" center>
        <p>
          <button className="assign" onClick={handleAssign}>
            Shuffle tasks
          </button>
        </p>
      </Cell>
      <Cell span="5-8" span-s="row" className="p1">
        {(Object.keys(result).length > 0 && (
          <span>
            <button
              className={resultJsonFormatClass}
              onClick={() => setResultsMode('json')}
            >
              JSON
            </button>
            &nbsp;
            <button
              className={resultPlainFormatClass}
              onClick={() => setResultsMode('plain')}
            >
              Plain
            </button>
            <pre>{resultsMode === 'json' && renderJsonAssignment()}</pre>
            <pre>{resultsMode === 'plain' && renderPlainAssignment()}</pre>
          </span>
        )) || (
          <span className="center">
            <p>{(error && error) || 'waiting for input...'}</p>
            <img src="https://media.giphy.com/media/IcoMfdWwY26mBcX008/giphy.gif" />
          </span>
        )}
      </Cell>
      <Cell span="5-8" span-s="row">
        <div className="h2">About</div>
        <div className="theme-toggle">
          <Grid columns="4" columns-s="5">
            <Cell span="2" span-s="4" className="v-center">
              Toggle dark theme &nbsp;
              <abbr title="uses cookies">
                <FontAwesomeIcon
                  icon={faCookieBite}
                  text-color="lowlight"
                  size="xs"
                />
              </abbr>
            </Cell>
            <Cell span="1" span-s="1">
              <Toggle
                condition={theme === 'dark'}
                handler={handleToggleTheme}
              />
            </Cell>
          </Grid>
        </div>
      </Cell>
      <Cell span="5-8" span-s="row">
        <a alt="github" href="https://github.com/kraiovsky/get-it-done">
          GitHub
        </a>
        &nbsp;
        <a
          alt="cli"
          href="https://github.com/kraiovsky/get-it-done/tree/master/packages/cli"
        >
          CLI version
        </a>
      </Cell>
      <Cell span="5-8" span-s="row">
        <FontAwesomeIcon icon={faCookieBite} text-color="lowlight" size="lg" />
        &nbsp;&nbsp; We uses cookies to remember your theme preference and list
        of people
      </Cell>
      <Cell span="5-8" span-s="row">
        &copy; Roman Kraiovsky{' '}
        <a alt="homepage" href="https://kraiovsky.now.sh">
          https://kraiovsky.now.sh
        </a>
      </Cell>
      <Cell span="row" span-s="row" />
    </Grid>
  )
}

export default Home
