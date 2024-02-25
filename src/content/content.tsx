import { createRoot } from 'react-dom/client'
import { ContentApp } from './components/ContentApp'

const LINKEDIN_JOB_ANALYZER_ID = 'linkedin-job-analyzer'

function init() {
    const rootElement = document.createElement('div')
    rootElement.id = LINKEDIN_JOB_ANALYZER_ID
    document.body.appendChild(rootElement)
    const root = createRoot(
        document.getElementById(LINKEDIN_JOB_ANALYZER_ID),
    )
    root.render(<ContentApp />)
}
if (document.readyState === 'loading') {
    document.addEventListener('load', init)
} else {
    init()
}
