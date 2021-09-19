export default async (ctx: any) => {
  const data = __isBrowser__ ? await (await window.fetch(`/api/posts`)).json() : await ctx.pageProps

  return {
    posts: data,
  }
}
