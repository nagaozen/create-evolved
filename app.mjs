#!/usr/bin/env node
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import minimist from 'minimist'
import { Plop, run } from 'plop'

const args = process.argv.slice(2)
const argv = minimist(args)

const __dirname = dirname(fileURLToPath(import.meta.url))

Plop.prepare({
  cwd: argv.cwd,
  configPath: path.join(__dirname, 'plopfile.mjs'),
  preload: argv.preload || [],
  completion: argv.completion
}, env => Plop.execute(env, run))
