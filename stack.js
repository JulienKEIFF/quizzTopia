let BASE 
BASE = "quizztopia"

const stack = [
  {
    label: 'quizztopia-server',
    spawnCmd: 'npm',
    spawnArgs: ['run', 'server'],
    spawnOptions: {
      cwd:  __dirname,
      env: Object.assign({
        PORT: '4215',
        mongoDbURL:`mongodb://root:123456@localhost:27017/${BASE}?authSource=admin`
      }, process.env)
    }
  },
  {
    label: 'quizztopia-front',
    spawnCmd: 'npm',
    spawnArgs: ['run', 'front'],
    spawnOptions: {
      cwd: __dirname,
      env: Object.assign({
        VUE_APP_SERVER_URL: 'http://localhost',
        VUE_APP_SERVER_PORT: 4215,
        VUE_APP_VERSION: 'v0.0.0'
      }, process.env)
    }
  },
]

module.exports = stack
