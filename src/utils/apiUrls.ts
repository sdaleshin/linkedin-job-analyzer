// const baseApiUrl = 'https://api.choodic.com/'
const baseApiUrl = 'http://localhost:3000/'

export function getAnalyzeJobDescriptionUrb() {
    return baseApiUrl + 'job-analyzer/analyze'
}

export function getAuthInExtensionUrl() {
    return baseApiUrl + 'auth/auth-in-extension'
}

export function getRefreshTokenUrl() {
    return baseApiUrl + 'auth/refresh-token'
}
