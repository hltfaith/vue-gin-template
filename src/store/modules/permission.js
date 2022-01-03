import { constantRoutes } from '@/router'
import { getRoutes } from '@/api/role' // 获取路由的接口方法
import Layout from '@/layout'


// 映射路由表
const componentsMap = {
  '/views/dashboard/index': () => import('@/views/dashboard/index'),
  '/views/permission/role': () => import('@/views/permission/role'),
  '/views/permission/user': () => import('@/views/permission/user'),
};

/**
 * 把后台返回菜单组装成routes要求的格式
 * @param {*} routes
 */
export function getAsyncRoutes(routes) {
  const res = []
  const keys = ['path', 'name', 'children', 'redirect', 'alwaysShow', 'meta', 'hidden']
  routes.forEach(item => {
    const newItem = {}
    if (item.component) {
      if (item.component == 'Layout') {
        newItem.component = Layout
      }else {
        newItem['component'] = componentsMap[item.component]
      }
    }

    for (const key in item) {
      if (keys.includes(key)) {
        newItem[key] = item[key]
      }
    }

    if (newItem.children) {
      newItem.children = getAsyncRoutes(item.children)
    }
    res.push(newItem)
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes // 路由访问
    state.routes = constantRoutes.concat(routes) // 菜单显示
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(async resolve => {
      const routes = await getRoutes() // 获取到后台路由
      const asyncRoutes = getAsyncRoutes(routes.data) // 对路由格式进行处理
      commit('SET_ROUTES', asyncRoutes)
      resolve(asyncRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
