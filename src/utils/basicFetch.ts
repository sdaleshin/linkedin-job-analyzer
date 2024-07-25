export function basicFetch(url: string, options: {}) {
    return fetch(url, {
        ...options,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    })
}
