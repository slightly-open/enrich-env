import { exportVariable, setFailed, getInput } from '@actions/core'
import { context } from '@actions/github'
import { getBranch } from './branch'
import { getTag } from './tag'
import { getPR } from './pr'

process.on('unhandledRejection', handleError)
run().catch(handleError)

async function run() {
  const vars = new Map<string, string>([
    ...getBranch(context),
    ...getTag(context),
    ...getPR(context),
  ])
  const envPrefix = getInput('env-prefix')
  for (const [key, value] of vars) {
    exportVariable(`${envPrefix}${key}`, value)
  }
}

function handleError(err: any) {
  console.error(err)

  if (err && err.message) {
    setFailed(err.message)
  } else {
    setFailed(`Unhandled error: ${err}`)
  }
}
