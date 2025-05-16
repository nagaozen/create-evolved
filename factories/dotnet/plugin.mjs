import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

function factory (plop) {
  const interview = {
    description: '.NET C# open-for-extension plug-in',
    prompts: [
      {
        type: 'input',
        name: 'plg',
        message: 'Plug-in Name:'
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
        const { plg } = answers
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
        execSync(`dotnet new sln --name ${plg}`, opts)

        // Create plugin class libraries
        execSync('dotnet new classlib -n Plugin -o Plugin', opts)

        // Add project projects to the solution
        execSync('dotnet sln add Plugin/Plugin.csproj', opts)

        // Add NuGet dependencies
        const packagesMap = [
          { proj: 'Plugin', pkgs: ['Looplex.OpenForExtension'] }
        ]
        packagesMap.forEach(({ proj, pkgs }) => {
          pkgs.forEach(pkg => {
            execSync(`dotnet add Plugin/Plugin.csproj package ${pkg}`, opts)
          })
        })

        return `Created “${plg}” @ “${dir}”.`
      }
    ]
  }
  return interview
}

export default factory
