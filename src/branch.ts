import { nameSanitized, url } from './refUtils';
import { Context } from '@actions/github/lib/context';

const {
  GITHUB_REF,
} = process.env

const BRANCH_PREFIX = 'refs/heads/'

export function getBranch({ repo }: Context): Map<string, string> {
  const names = new Map<string, string>();
  if (GITHUB_REF === undefined || !GITHUB_REF.startsWith(BRANCH_PREFIX)) {
    return names
  }
  const branchRaw = GITHUB_REF.slice(BRANCH_PREFIX.length)
  const branch = nameSanitized(branchRaw)
  const branchTreeUrl = url(branch, repo.owner, repo.repo)

  names.set('BRANCH_RAW', branchRaw)
  names.set('BRANCH', branch)
  names.set('BRANCH_TREE_URL', branchTreeUrl)

  return names
}
