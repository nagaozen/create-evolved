import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

function factory (plop) {
  const interview = {
    description: 'Generate a .NET console app solution',
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

        // Create .gitignore and .editorconfig
        execSync('dotnet new gitignore', opts)
        execSync('dotnet new editorconfig', opts)

        // Create solution
        execSync(`dotnet new sln --name ${svc}.CLIApp`, opts)

        // Create console project
        execSync('dotnet new console -n Console -o Console', opts)

        // Add project to the solution
        execSync('dotnet sln add Console/Console.csproj', opts)

        // Add NuGet dependencies
        const packagesMap = [
          { proj: 'Console', pkgs: [] }
        ]
        packagesMap.forEach(({ proj, pkgs }) => {
          pkgs.forEach(pkg => {
            execSync(`dotnet add ${proj}/${proj}.csproj package ${pkg}`, opts)
          })
        })

        return `Created “${svc}.CLIApp @ “${dir}”.`
      }
    ]
  }
  return interview
}

export default factory
