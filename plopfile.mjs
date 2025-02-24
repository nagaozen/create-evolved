// import applicationFactory from './plop/application.mjs'

// welcome message customizable at <https://patorjk.com/software/taag/#p=display&f=Elite&t=Evolved>
export default function (plop) {
  plop.setWelcomeMessage(`
  ▄▄▄ . ▌ ▐·      ▄▄▌   ▌ ▐·▄▄▄ .·▄▄▄▄  
  ▀▄.▀·▪█·█▌▪     ██•  ▪█·█▌▀▄.▀·██▪ ██ 
  ▐▀▀▪▄▐█▐█• ▄█▀▄ ██▪  ▐█▐█•▐▀▀▪▄▐█· ▐█▌
  ▐█▄▄▌ ███ ▐█▌.▐▌▐█▌▐▌ ███ ▐█▄▄▌██. ██ 
  ▀▀▀ . ▀   ▀█▄▀▪.▀▀▀ . ▀   ▀▀▀ ▀▀▀▀▀• 

  What are you going to create?
  `)

  // plop.setGenerator('application', applicationFactory(plop))
  plop.setGenerator('dotnet', {
    description: 'dotnet factory',
    prompts: [
      { type: 'input', name: 'name', message: 'application name please' }
    ],
    actions: []
  })

  plop.setGenerator('nodejs', {
    description: 'nodejs factory',
    prompts: [
      { type: 'input', name: 'name', message: 'application name please' }
    ],
    actions: []
  })
}
