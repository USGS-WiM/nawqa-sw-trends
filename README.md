# nawqa-sw-trends

## Developer Instructions

run npm install AND bower install to get dependencies after first cloning

gulp watch to run in browser with watch for debugging

gulp build to build project

NOTE: You MUST run the gulp build before committing and pushing to repo

#### Semver versioning/release tags

Advance the version when adding features, fixing bugs or making minor enhancement. Follow semver principles. To add tag in git, type git tag v{major}.{minor}.{patch}. Example: git tag v2.0.5

First push tags to origin: git push origin --tags then, after pull request, upstream: git push upstream --tags Note that your alias for the upstream repo may differ