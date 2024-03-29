# Farm Entry

## Setup

1. Install node 12 and mongodb 4.2.
1. Clone the repo.
1. Run `npm i`

## Development

1. Run `npm run web` and `npm run api` in two separate shells.
1. Visit `localhost:8080` to view the app.
1. Visit `localhost:3001` to view the GraphQL playground.

> When you commit, changed code is linted and tests are run.
> You won't be able to commit until those pass.

### Other useful development commands
* Run `npm run test` to run tests on both the web and api projects.
* Run `npm run generate` to update typings after changing the GraphQL schema.

## Release
When you have a batch of PRs merged to master:
1. In master run `npm version [major|minor|patch]
1. Push new commit and tag
1. Add release in GitHub with description of changes and links to merged PRs

## Architecture

```
 |       React
Web        |
 |    Apollo Client
           |
 |    Apollo Server
API     /     \
 |    NAV   MongoDB
```
 


