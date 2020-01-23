# Enrich env action

This action adds some useful environment variables

## Inputs

### `env-prefix`

**Required** Prefix for environment variables names. Default `"X_"`.

# Example usages

## Basic usage
```yaml
uses: actions/enrich-env@v1
```

## Use with custom prefix
```yaml
uses: actions/enrich-env@v1
with:
  prefix-env: MY_
```
