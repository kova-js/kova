export default async (ctx: any) => {
  const data = __isBrowser__ ? await (await window.fetch(`/api/categories`)).json() : await ctx.pageProps

  return {
    categories: data,
  }
}
