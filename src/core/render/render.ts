export { render } from 'ssr-core-react'
import { promises as fs } from 'fs'
import { join, resolve } from 'path'
import { ParseFeRouteItem } from 'ssr-types'
import { loadConfig } from 'ssr-server-utils'

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
const pageDir = getPagesDir()
let { prefix } = loadConfig()

if (prefix && !prefix.startsWith('/')) {
  prefix = `/${prefix}`
}

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
    const pathRecord = [''] // 路径记录
    const route: any = {}
    console.time('renderRoutes')
    let arr = await renderRoutes(pageDir, pathRecord, route)
    console.timeEnd('renderRoutes')
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

const renderRoutes = async (
  pageDir: string,
  pathRecord: string[],
  route: ParseFeRouteItem,
): Promise<ParseFeRouteItem[]> => {
  let arr: ParseFeRouteItem[] = []
  const pagesFolders = await fs.readdir(pageDir)
  const prefixPath = pathRecord.join('/')
  const aliasPath = `@/pages${prefixPath}`
  const routeArr: ParseFeRouteItem[] = []
  const fetchExactMatch = pagesFolders.filter((p) => p.includes('fetch'))
  for (const pageFiles of pagesFolders) {
    const abFolder = join(pageDir, pageFiles)
    const isDirectory = (await fs.stat(abFolder)).isDirectory()
    if (isDirectory) {
      // 如果是文件夹则递归下去, 记录路径
      pathRecord.push(pageFiles)
      const childArr = await renderRoutes(abFolder, pathRecord, Object.assign({}, route))
      pathRecord.pop() // 回溯
      arr = arr.concat(childArr)
    } else {
      // 遍历一个文件夹下面的所有文件
      if (!pageFiles.includes('render')) {
        continue
      }
      // 拿到具体的文件
      if (pageFiles.includes('render$')) {
        /* /news/:id */
        route.path = `${prefixPath}/:${getDynamicParam(pageFiles)}`
        route.component = `${aliasPath}/${pageFiles}`
        let webpackChunkName = pathRecord.join('-')
        if (webpackChunkName.startsWith('-')) {
          webpackChunkName = webpackChunkName.replace('-', '')
        }
        route.webpackChunkName = `${webpackChunkName}-${getDynamicParam(pageFiles)
          .replace(/\/:\??/, '-')
          .replace('?', '-optional')}`
      } else if (pageFiles.includes('render')) {
        /* /news */
        route.path = `${prefixPath}`
        route.component = `${aliasPath}/${pageFiles}`
        let webpackChunkName = pathRecord.join('-')
        if (webpackChunkName.startsWith('-')) {
          webpackChunkName = webpackChunkName.replace('-', '')
        }
        route.webpackChunkName = webpackChunkName
      }

      if (fetchExactMatch.length >= 2) {
        // fetch文件数量 >=2 启用完全匹配策略 render$id => fetch$id, render => fetch
        const fetchPageFiles = `${pageFiles.replace('render', 'fetch').split('.')[0]}.ts`
        if (fetchExactMatch.includes(fetchPageFiles)) {
          route.fetch = `${aliasPath}/${fetchPageFiles}`
        }
      } else if (fetchExactMatch.includes('fetch.ts')) {
        // 单 fetch 文件的情况 所有类型的 render 都对应该 fetch
        route.fetch = `${aliasPath}/fetch.ts`
      }
      routeArr.push({ ...route })
    }
  }
  routeArr.forEach((r) => {
    if (r.path?.includes('index')) {
      // /index 映射为 /
      if (r.path.split('/').length >= 3) {
        r.path = r.path.replace('/index', '')
      } else {
        r.path = r.path.replace('index', '')
      }
    }

    r.path && arr.push(r)
  })

  return arr
}

const getDynamicParam = (url: string) => {
  return url
    .split('$')
    .filter((r) => r !== 'render' && r !== '')
    .map((r) => r.replace(/\.[\s\S]+/, '').replace('#', '?'))
    .join('/:')
}

export { parseFeRoutes }
