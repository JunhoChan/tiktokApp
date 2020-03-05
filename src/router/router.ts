import loadable from '@loadable/component'

export const basename = ''

export const routes = [
  {
    path: '/login',
    component: loadable(() => import('@/pages/login/login')),
    name: 'login',
    title: '登录'
  },
  {
    path: '/',
    component: loadable(() => import('@/pages/Index/Index')),
    name: 'home',
    title: 'Tik Tok',
    routes: [
      {
        path: '/home',
        exact: true,
        component: loadable(() => import('@/pages/home/home'))
      },
      {
        path: '/mine',
        exact: true,
        component: loadable(() => import('@/pages/mine/mine'))
      }
    ]
  }
  // {
  //   path: '*',
  //   exact: true,
  //   component: loadable(() => import('@/components/404/404')),
  //   name: '404',
  //   title: '404'
  // }
]
