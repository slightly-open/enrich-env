import { nameSanitized, url } from './refUtils';
import { Context } from '@actions/github/lib/context';

const {
  GITHUB_REF,
} = process.env

const TAG_PREFIX = 'refs/tags/'

export function getTag({ repo }: Context): Map<string, string> {
  const names = new Map<string, string>();
  if (GITHUB_REF === undefined || !GITHUB_REF.startsWith(TAG_PREFIX)) {
    return names
  }
  const tag = GITHUB_REF.slice(TAG_PREFIX.length)
  const tagSlag = nameSanitized(tag)
  const tagTreeUrl = url(tagSlag, repo.owner, repo.repo)

  names.set('TAG', tag)
  names.set('TAG_SLAG', tagSlag)
  names.set('TAG_TREE_URL', tagTreeUrl)

  return names
}
