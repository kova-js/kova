export { render } from 'ssr-core-react'
import { promises as fs } from 'fs'
import { join, resolve } from 'path'
import { loadConfig } from 'ssr-server-utils'
import { sync as globSync } from 'glob'
import _ from 'lodash'

function getCwd() {
  return resolve(process.cwd(), process.env.APP_ROOT ?? '')
}

function getFeDir() {
  return resolve(getCwd(), process.env.FE_ROOT ?? 'web')
}

function getPagesDir() {
  return resolve(getFeDir(), 'pages')
}

const { dynamic, routerPriority, routerOptimize } = loadConfig()
// const pageDir = getPagesDir()
// let { prefix } = loadConfig()

// if (prefix && !prefix.startsWith('/')) {
//   prefix = `/${prefix}`
// }

async function accessFile(file: string) {
  return await fs
    .access(file)
    .then(() => true)
    .catch(() => false)
}

const parseFeRoutes = async () => {
  const viteMode = process.env.BUILD_TOOL === 'vite'
  if (viteMode && !dynamic) {
    console.log('vite模式禁止关闭 dynamic ')
    return
  }

  let routes: any
  const declaretiveRoutes = await accessFile(join(getFeDir(), './route.ts')) // 是否存在自定义路由
  if (!declaretiveRoutes) {
    // 根据目录结构生成前端路由表
    // const pathRecord = [''] // 路径记录
    // const route: any = {}
    let arr = globSync('**/render*.tsx', { cwd: getPagesDir() }).map((file) => {
      const paths = file.split('/')
      let lastPath = paths.pop()
      lastPath = lastPath === 'render.tsx' ? '' : getDynamicParam(lastPath)
      return {
        path: `/${[...paths, !lastPath ? '' : `:${lastPath}`]
          .filter((p) => p && p !== 'index')
          .join('/')}`,
        name: [...paths, lastPath].filter((p) => p).join('-'),
      }
    })
    if (routerPriority) {
      // 路由优先级排序
      arr.sort((a, b) => {
        // 没有显示指定的路由优先级统一为 0
        return (routerPriority![b.path] || 0) - (routerPriority![a.path] || 0)
      })
    }

    if (routerOptimize) {
      // 路由过滤
      if (routerOptimize.include && routerOptimize.exclude) {
        throw new Error('include and exclude cannot exist synchronal')
      }
      if (routerOptimize.include) {
        arr = arr.filter((route) => routerOptimize?.include?.includes(route.path))
      }
      if (routerOptimize.exclude) {
        arr = arr.filter((route) => !routerOptimize?.exclude?.includes(route.path))
      }
    }
    routes = arr
  } else {
    // 使用了声明式路由
    routes = (await fs.readFile(join(getFeDir(), './route.ts'))).toString()
  }
  return routes
}

const getDynamicParam = (url: string) => {
  return url
    .split('$')
    .filter((r) => r !== 'render' && r !== '')
    .map((r) => r.replace(/\.[\s\S]+/, '').replace('#', '?'))
    .join('/:')
}

export { parseFeRoutes }
