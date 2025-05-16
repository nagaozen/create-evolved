<p align="center">
  <img src="https://github.com/nagaozen/create-evolved/blob/88160f7f30e9069402f5150a17c272b05edb65e2/hero.png" alt="create-evolved hero image" width="512" />
</p>

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-f7df1e.svg?style=for-the-badge&logo=standardjs)](https://standardjs.com)
[![Software Composition Analysis](https://img.shields.io/badge/sca_by-dependabot-025E8C.svg?style=for-the-badge&logo=dependabot)](https://github.com/features/security)
[![Static Application Security Test](https://img.shields.io/badge/sast_by-codeql-0f305f.svg?style=for-the-badge&logo=snyk)](https://codeql.github.com/)
[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-f05032.svg?style=for-the-badge&logo=git)](http://commitizen.github.io/cz-cli/)
[![Semantic Release](https://img.shields.io/badge/semantic-release-cb3837.svg?style=for-the-badge&logo=semantic-release)](https://semantic-release.gitbook.io/semantic-release/)

# About
`create-evolved` is a versatile project scaffolding CLI built with Plop.js and Node.js to accelerate the bootstrap of modern applications, services, and libraries by generating opinionated, best-practice project structures automatically. It combines interactive prompts, customizable Handlebars templates, and a plugin-style architecture to support a wide range of project types.

# Requirements
Before using `create-evolved`, ensure you have the following installed on your system:
* **git** -- A free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. 
* **dotnet** -- A cross-platform toolchain for developing, building, running, and publishing .NET applications; included with the .NET SDK.
* **pnpm** -- A fast, disk space efficient package manager for JavaScript and Node.js projects, providing strict package management and workspace support.

# Usage

1. **Generate a new project**

```sh
pnpm create evolved@latest
```

2. **Follow the interactive prompts**  
Answer questions about project name, author, license, and optional features

3. **Start coding**  
Navigate to your `directory` and run the usual commands (`pnpm i`, `dotnet restore`) as directed by your chosen template.

# Supported Templates

* **.NET Services (netstandard2.0)**  
Opinionated C# service solution with clean-code architecture.

* **.NET WebAPI (netstandard2.0)**  
Opinionated C# minimal api solution.

# Contributing

We welcome contributions! Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo, make changes and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

This GitHub repository adheres to the principles of [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow) as outlined in the official GitHub documentation. We ensure that all changes are made through branch-based workflows, enabling collaborative development and efficient code review before integration into the main branch.

```mermaid
gitGraph
    commit id:"fix(api): export endpoint should be consistent with output clause"
    branch feature/amazing
    checkout feature/amazing
    commit id:"feat(amazing): implement mvp"
    checkout main
    merge feature/amazing
    branch hotfix/cicd
    checkout hotfix/cicd
    commit id:"fix(cicd): automatic deployment"
    checkout main
    merge hotfix/cicd
    branch feature/incredible
    checkout feature/incredible
    commit id:"feat(incredible): implement mvp"
    checkout main
    merge feature/incredible
```

1. Fork the Project
1. Create your Feature Branch (`git checkout -b feature/amazing`)
1. Commit your Changes (`cz`)
1. Push to the Branch (`git push origin feature/amazing`)
1. Open a Pull Request