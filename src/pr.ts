import { url } from './refUtils'
import { Context } from '@actions/github/lib/context'
import { GitHub } from '@actions/github'

const {
  GITHUB_REF,
  GITHUB_SHA,
} = process.env

const PR_PREFIX = 'refs/pull/'

export async function getPrNumber(
  repo: Context['repo'], gh: GitHub,
): Promise<string | null> {
  if (GITHUB_REF !== undefined && GITHUB_REF.startsWith(PR_PREFIX)) {
    const [, , prId,] = GITHUB_REF.split('/')
    return prId
  }
  const { data: [pr] } = await gh.repos.listPullRequestsAssociatedWithCommit({
    ...repo,
    commit_sha: GITHUB_SHA!,
  })
  return pr?.number?.toString() ?? null
}

export function getPR(
  prNumber: string | null, repo: Context['repo'],
): Map<string, string> {
  const names = new Map<string, string>()

  if (prNumber === null) {
    return name
  }

  const prSlag = `pr-${prNumber}`
  const prTreeUrl = url(prSlag, repo.owner, repo.repo)

  names.set('PR_SLAG', prSlag)
  names.set('PR_URL', prTreeUrl.replace('/tree', ''))

  return names
}
