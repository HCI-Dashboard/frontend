import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/v1/menus', () => {
    return HttpResponse.json([
      {
        key: '1',
        label: 'nav 1',
        children: [
          { key: '1-1', label: 'sub-nav 1-1' },
          { key: '1-2', label: 'sub-nav 1-2' },
        ],
      },
      {
        key: '2',
        label: 'nav 2',
        children: [
          { key: '2-1', label: 'sub-nav 2-1' },
          { key: '2-2', label: 'sub-nav 2-2' },
        ],
      },
      {
        key: '3',
        label: 'nav 3',
        children: [
          { key: '3-1', label: 'sub-nav 3-1' },
          { key: '3-2', label: 'sub-nav 3-2' },
        ],
      },
    ])
  }),
]
