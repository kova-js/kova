export default async (ctx: any) => {
  const data = __isBrowser__
    ? await (await window.fetch(`/api/articles/${ctx.match.params.slug}`)).json()
    : ctx.pageProps

  return {
    article: data,
  }
}
