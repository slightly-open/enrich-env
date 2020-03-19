import { setFailed, getInput, setOutput } from '@actions/core'
import { context, GitHub } from '@actions/github'
import { getBranch } from './branch'
import { getTag } from './tag'
import { getPR, getPrNumber } from './pr'
import { check } from './check'

process.on('unhandledRejection', handleError)
run().catch(handleError)

async function run() {
  const token = getInput('github-token')
  const github = new GitHub(token, {})

  console.log(context);

}

function handleError(err: any) {
  console.error(err)

  if (err && err.message) {
    setFailed(err.message)
  } else {
    setFailed(`Unhandled error: ${err}`)
  }
}
