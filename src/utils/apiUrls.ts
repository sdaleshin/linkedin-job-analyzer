const baseApiUrl = 'https://api.choodic.com/'
// const baseApiUrl = 'http://localhost:3000/'

export function getAnalyzeJobDescriptionUrl() {
    return baseApiUrl + 'job-analyzer/analyze'
}

export function getSelectorsUrl() {
    return baseApiUrl + 'job-analyzer/selectors'
}
