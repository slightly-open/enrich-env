import { exportVariable, setFailed, getInput } from '@actions/core'
import { context } from '@actions/github'
import { getBranch } from './branch'

process.on('unhandledRejection', handleError)
run().catch(handleError)

async function run() {
  const vars = new Map<string, string>([
    ...getBranch(context),
  ])
}

function handleError(err: any) {
  console.error(err)

  if (err && err.message) {
    setFailed(err.message)
  } else {
    setFailed(`Unhandled error: ${err}`)
  }
}
