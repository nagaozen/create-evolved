import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

function factory (plop) {
  const interview = {
    description: 'Generate a .NET minimal API solution',
    prompts: [
      {
        type: 'input',
        name: 'svc',
        message: 'Service Name:'
      },
      {
        type: 'input',
        name: 'dir',
        message: 'Target Directory (default is `.`):',
        default: '.'
      }
    ],
    actions: [
      function scaffoldSolutionAndProjects (answers) {
        const { svc } = answers
        const dir = path.resolve(process.cwd(), answers.dir)

        // Ensure target directory exists
        if (dir !== '.' && !fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }

        const opts = { stdio: 'inherit', cwd: dir }

        // Create solution
        execSync(`dotnet new sln --name ${svc}.WebAPI`, opts)

        // Create webapi project
        execSync('dotnet new webapi -n WebAPI -o WebAPI', opts)

        // Add project to the solution
        execSync('dotnet sln add WebAPI/WebAPI.csproj', opts)

        // Add NuGet dependencies
        const packagesMap = [
          { proj: 'WebAPI', pkgs: [] }
        ]
        packagesMap.forEach(({ proj, pkgs }) => {
          pkgs.forEach(pkg => {
            execSync(`dotnet add ${proj}/${proj}.csproj package ${pkg}`, opts)
          })
        })

        return `Created “${svc}.WebAPI” @ “${dir}”.`
      }
    ]
  }
  return interview
}

export default factory
