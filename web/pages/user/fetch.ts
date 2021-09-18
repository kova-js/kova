export default async (ctx: any) => {
  const data = __isBrowser__
    ? await (await window.fetch(`/api/users/${ctx.match.params.slug}`)).json()
    : await ctx.pageProps

  return {
    user: data,
  }
}
