export const settoken = (value, key = 'token') => {
  localStorage.setItem(key, value)
}

export const deltoken = (key = 'token') => {
  localStorage.removeItem(key)
}

export const gettoken = (key = 'token') => {
  return localStorage.getItem(key)
}
