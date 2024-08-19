interface Answer {
    id: string
    answer: string
}

export function extractAnswersFromJson(obj: any): Answer[] {
    let result: Answer[] = []

    function recursiveSearch(obj: any) {
        if (obj !== null && typeof obj === 'object') {
            if (Array.isArray(obj)) {
                for (const item of obj) {
                    recursiveSearch(item)
                }
            } else {
                if ('id' in obj) {
                    result.push(obj)
                }

                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        recursiveSearch(obj[key])
                    }
                }
            }
        }
    }

    recursiveSearch(obj)
    return result
}
