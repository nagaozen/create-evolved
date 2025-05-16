import { exec } from 'node:child_process'

import dotnetServiceFactory from './factories/dotnet/service.mjs'
import dotnetWebApiFactory from './factories/dotnet/webapi.mjs'

// welcome message customizable at <https://patorjk.com/software/taag/#p=display&f=Elite&t=Evolved>
export default function (plop) {
  setup(plop)

  plop.setWelcomeMessage(`
  ▄▄▄ . ▌ ▐·      ▄▄▌   ▌ ▐·▄▄▄ .·▄▄▄▄  
  ▀▄.▀·▪█·█▌▪     ██•  ▪█·█▌▀▄.▀·██▪ ██ 
  ▐▀▀▪▄▐█▐█• ▄█▀▄ ██▪  ▐█▐█•▐▀▀▪▄▐█· ▐█▌
  ▐█▄▄▌ ███ ▐█▌.▐▌▐█▌▐▌ ███ ▐█▄▄▌██. ██ 
  ▀▀▀ . ▀   ▀█▄▀▪.▀▀▀ . ▀   ▀▀▀ ▀▀▀▀▀• 
  
  What are we creating today?
  `)

  plop.setGenerator('[dotnet] Service', dotnetServiceFactory(plop))
  plop.setGenerator('[dotnet] Web API', dotnetWebApiFactory(plop))
}

function setup (plop) {
  plop.setActionType('runCmd', function (ans, cfg, plop) {
    return new Promise((resolve, reject) => {
      exec(cfg.command, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error: ${err.message}`)
          reject(err)
        }
        if (stderr) {
          console.error(`StdError: ${stderr}`)
          reject(new Error(stderr))
        }
        resolve(stdout)
      })
    })
  })
}
