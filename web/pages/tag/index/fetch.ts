export default async (ctx: any) => {
  const data = __isBrowser__
    ? await (await window.fetch(`/api/tags`)).json()
    : await ctx.pageProps

  return {
    tags: data,
  }
}
