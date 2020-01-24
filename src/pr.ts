import { nameSanitized, url } from './refUtils';
import { Context } from '@actions/github/lib/context';

const {
  GITHUB_REF,
} = process.env

const PR_PREFIX = 'refs/pull/'

export function getPR({ repo }: Context): Map<string, string> {
  const names = new Map<string, string>();
  if (GITHUB_REF === undefined || !GITHUB_REF.startsWith(PR_PREFIX)) {
    return names
  }
  const [,,prId,] = GITHUB_REF.split('/')
  const pr = `pull/${prId}`
  const prSlag = nameSanitized(pr)
  const prTreeUrl = url(prSlag, repo.owner, repo.repo)

  names.set('PR', pr)
  names.set('PR_SLAG', prSlag)
  names.set('PR_URL', prTreeUrl.replace('/tree', ''))

  return names
}
