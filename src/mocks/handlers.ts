import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/login', () => {
    sessionStorage.setItem('is-authenticated', 'true')
    return HttpResponse.json({ success: true }, { status: 200 })
  }),

  http.get('/user', () => {
    const isAuthenticated = sessionStorage.getItem('is-authenticated')

    if (!isAuthenticated) {
      return HttpResponse.json({ errorMessage: 'Not authorized' }, { status: 403 })
    }

    return HttpResponse.json({ username: 'admin' }, { status: 200 })
  }),
]
