import { GitHub } from '@actions/github';
import { Context } from '@actions/github/lib/context';

const {
  GITHUB_REF,
} = process.env

export async function check(
  { repo }: Context,
  gh: GitHub
): Promise<Map<string, string>> {
  const { data: suites } = await gh.checks.listSuitesForRef({
    ...repo,
    ref: GITHUB_REF!,
  })
  const { data: checks } = await gh.checks.listForRef({
    ...repo,
    ref: GITHUB_REF!,
  })

  console.log(suites, checks)

  const names = new Map<string, string>()
  return names
}
