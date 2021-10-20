export const isDev = process.env.NODE_ENV !== 'production'
export async function promiseTimeout(ms: number, throwOnTimeout = false, reason = 'Timeout') {
  return await new Promise((resolve, reject) => {
    if (throwOnTimeout) {
      setTimeout(() => reject(reason), ms)
    } else {
      setTimeout(resolve, ms)
    }
  })
}

export function siteName(title: string | undefined, name: string) {
  return title ? `${title} | ${name}` : name
}

export function trim(str: string, c = ' ') {
  //删除左右两端的空格
  const reg = new RegExp(`(^[${c}]*)|([${c}]*$)`, 'gi')
  return str.replace(reg, '')
}

export function ltrim(str: string, c = ' '): string {
  //删除左边的空格
  const reg = new RegExp(`(^[${c}]*)`, 'gi')
  return str.replace(reg, '')
}

export function rtrim(str: string, c = ' ') {
  //删除右边的空格
  const reg = new RegExp(`([${c}]*$)`, 'gi')
  return str.replace(reg, '')
}
