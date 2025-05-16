import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

function factory (plop) {
  const interview = {
    description: '.NET C# service using clean-code architecture and open-for-extension',
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
        execSync(`dotnet new sln --name ${svc}`, opts)

        // Create class libraries
        ;['Application', 'Application.Abstraction', 'Domain', 'Infra'].forEach(proj => {
          execSync(`dotnet new classlib --framework netstandard2.0 -n ${proj} -o ${proj}`, opts)
        })

        // Create mstest project
        execSync('dotnet new mstest -n Application.Tests -o Application.Tests', opts)

        // Add all projects to the solution
        ;['Application', 'Application.Abstraction', 'Domain', 'Infra', 'Application.Tests'].forEach(proj => {
          execSync(`dotnet sln add ${proj}/${proj}.csproj`, opts)
        })

        // Wire up Clean-Architecture references
        // - Application → Application.Abstraction, Domain
        execSync('dotnet add Application/Application.csproj reference Application.Abstraction/Application.Abstraction.csproj Domain/Domain.csproj', opts)
        // - Infra → Application.Abstraction, Domain
        execSync('dotnet add Infra/Infra.csproj reference Application.Abstraction/Application.Abstraction.csproj Domain/Domain.csproj', opts)
        // - Application.Abstraction → Domain
        execSync('dotnet add Application.Abstraction/Application.Abstraction.csproj reference Domain/Domain.csproj', opts)
        // - Application.Tests → Application, Infra
        execSync('dotnet add Application.Tests/Application.Tests.csproj reference Application/Application.csproj Infra/Infra.csproj', opts)

        // 6. Add NuGet dependencies
        const packagesMap = [
          {
            proj: 'Application',
            pkgs: [
              'Casbin.NET',
              'Looplex.OpenForExtension',
              'MediatR'
            ]
          },
          { proj: 'Application.Abstraction', pkgs: [] },
          { proj: 'Domain', pkgs: ['PropertyChanged.Fody'] },
          { proj: 'Infra', pkgs: [] },
          { proj: 'Application.Tests', pkgs: [] }
        ]
        packagesMap.forEach(({ proj, pkgs }) => {
          pkgs.forEach(pkg => {
            execSync(`dotnet add ${proj}/${proj}.csproj package ${pkg}`, opts)
          })
        })

        return `Created “${svc}” @ “${dir}”.`
      }
    ]
  }
  return interview
}

export default factory
