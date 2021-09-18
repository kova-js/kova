export default async (ctx: any) => {
  let data = {}
  if (__isBrowser__) {
    data = await (await window.fetch(`/api/tags/${ctx.match.params.slug}`)).json()
  } else {
    data = ctx.pageProps
  }
  
  return {
    tag: data,
  }
}
