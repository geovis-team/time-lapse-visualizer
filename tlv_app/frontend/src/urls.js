//Backend Url
export const baseApiUrl = () => {
  return `http://127.0.0.1:8000/api/`
}

export const getTokenUrl = () => {
  return `${baseApiUrl()}token/`
}

export const refreshTokenUrl = () => {
  return `${baseApiUrl()}token/refresh/`
}

export const userCreateUrl = () => {
  return `${baseApiUrl()}register/`
}

export const getUserUrl = () => {
  return `${baseApiUrl()}current_user/`
}

export const getFiltersUrl = () => {
  return `${baseApiUrl()}visualization/get_filters/`
}

export const filterDataUrl = () => {
  return `${baseApiUrl()}visualization/filter_data`
}

export const revokeTokenUrl = () => {
  return `${baseApiUrl()}revoke_token/`
}
