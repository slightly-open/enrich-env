import { exportVariable, setFailed, getInput } from '@actions/core'
import { context, GitHub } from '@actions/github'
import { getBranch } from './branch'
import { getTag } from './tag'
import { getPR, getPrNumber } from './pr'
import { check } from './check'

process.on('unhandledRejection', handleError)
run().catch(handleError)

async function run() {
  const envPrefix = getInput('env-prefix')
  const token = getInput('github-token')
  const github = new GitHub(token, {})
  const pr = await getPrNumber(context.repo, github)
  const vars = new Map<string, string>([
    ...getBranch(context),
    ...getTag(context),
    ...await getPR(pr, context.repo),
    ...await check(context, github),
  ])
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
