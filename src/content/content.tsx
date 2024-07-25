import { createRoot } from 'react-dom/client'
import { ContentApp } from './components/ContentApp'
import { chromeRuntimeMessenger } from './messenger/chrome-runtime-messenger'
import { postMessageMessenger } from './messenger/post-message-messenger'

const LINKEDIN_JOB_ANALYZER_ID = 'linkedin-job-analyzer'

function init() {
    const rootElement = document.createElement('div')
    rootElement.id = LINKEDIN_JOB_ANALYZER_ID
    document.body.appendChild(rootElement)
    const root = createRoot(document.getElementById(LINKEDIN_JOB_ANALYZER_ID))
    const messenger = chrome?.runtime?.sendMessage
        ? chromeRuntimeMessenger
        : postMessageMessenger
    root.render(<ContentApp messenger={messenger} />)
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}
