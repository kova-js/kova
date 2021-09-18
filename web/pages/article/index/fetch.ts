export default async (ctx: any) => {
  const data = __isBrowser__ ? await (await window.fetch(`/api/articles`)).json() : await ctx.pageProps

  return {
    articles: data,
  }
}
