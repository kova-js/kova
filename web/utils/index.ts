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
