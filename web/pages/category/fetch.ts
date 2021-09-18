export default async (ctx: any) => {
  let data = {}
  if (__isBrowser__) {
    data = await (await window.fetch(`/api/categories/${ctx.match.params.slug}`)).json()
  } else {
    data = ctx.pageProps
  }

  // const data = __isBrowser__
  //   ? await (await window.fetch(`/api/categories/${ctx.match.params.slug}`)).json()
  //   : await ctx.apiService.getCategoryBySlug(ctx.request.params.slug)

  return {
    category: data,
  }
}
