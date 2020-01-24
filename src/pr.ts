import { nameSanitized, url } from './refUtils';
import { Context } from '@actions/github/lib/context';
import { GitHub } from '@actions/github';

const {
  GITHUB_REF,
} = process.env

const PR_PREFIX = 'refs/pull/'

export async function getPR(
  { sha, repo }: Context, gh: GitHub,
): Promise<Map<string, string>> {
  if (GITHUB_REF !== undefined && GITHUB_REF.startsWith(PR_PREFIX)) {
    const [, , prId,] = GITHUB_REF.split('/')
    return buildVars(prId, repo)
  }
  const { data: [pr] } = await gh.repos.listPullRequestsAssociatedWithCommit({
    ...repo,
    commit_sha: sha,
  })

  if (pr !== undefined) {
    return buildVars(`${pr.number}`, repo)
  }

  return new Map<string, string>()
}

function buildVars(
  prNumber: string, repo: Context['repo'],
): Map<string, string> {
  const names = new Map<string, string>();
  const prSlag = `pr-${prNumber}`
  const prTreeUrl = url(prSlag, repo.owner, repo.repo)

  names.set('PR_SLAG', prSlag)
  names.set('PR_URL', prTreeUrl.replace('/tree', ''))

  return names
}
