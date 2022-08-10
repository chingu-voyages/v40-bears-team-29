const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3002'

const helpers = {
  urlTo: (path) => {
    return `${API_ENDPOINT}${path}`
  }
}

module.exports = helpers
