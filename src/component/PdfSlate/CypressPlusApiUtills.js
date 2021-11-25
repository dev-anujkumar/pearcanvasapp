import axios from 'axios'
export const fetch = (url, configs) => axios.get(url, configs)

export const post = (url, data, configs = {}) =>
  axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
      'PearsonSSOSession':'Mn0CHRort2OhMVwDcbl0leUMQzc.*AAJTSQACMDIAAlNLABx5S1p2R0ZYYzh3ZFR6V0FpeFRTR29wLzJNa0k9AAR0eXBlAANDVFMAAlMxAAIwNg..*'
      
    },
    ...configs
  })