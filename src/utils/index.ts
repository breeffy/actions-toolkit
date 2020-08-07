import { InputOptions } from "@actions/core"

export type EnvironmentVariableType = 'input' | 'output' | 'state'

/**
 * Gets the value of an input / output / state variable. The value is also trimmed.
 *
 * @param     type     type of the variable
 * @param     name     name of the variable
 * @param     options  optional. See InputOptions.
 * @returns   string | undefined
 */
export function getEnvironmentVariable(type: EnvironmentVariableType, name: string, options?: InputOptions): string | undefined {
  const prefix = type.toUpperCase();
  const upperCaseName = name.replace(/ /g, '_').toUpperCase();
  const value = process.env[`${prefix}_${upperCaseName}`]
  if (options?.required && value === undefined) {
    throw new Error(`Input required and not supplied: ${name}`);
  }

  return value?.trim()
}
