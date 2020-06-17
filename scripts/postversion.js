require('dotenv')
const pkg = require('../package.json')
const child = require('child_process')

const version = pkg.version
child.execSync('git push origin master')
child.execSync(`git push origin ${version}`)

child.execSync(`sentry-cli releases new -p api -p web --finalize ${version}`)
child.execSync(`sentry-cli releases set-commits --auto ${version}`)
child.execSync(`sentry-cli releases deploys ${version} new -e production`)