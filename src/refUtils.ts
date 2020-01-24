const DELIMITER = '-'
const BASE_GITHUB_URL = 'https://github.com'

export function nameSanitized(rawName: string): string {
  return rawName.replace(/[\W_\/]+/g, DELIMITER).toLowerCase()
}

export function url(ref: string, repo: string): string
export function url(ref: string, owner: string, repoName: string): string
export function url(ref: string, ownerOrRepo: string, repoName?: string): string {
  const repo = typeof repoName === 'string'
    ? `${ownerOrRepo}/${repoName}`
    : ownerOrRepo
  return `${BASE_GITHUB_URL}/${repo}/tree/${ref}`
}
