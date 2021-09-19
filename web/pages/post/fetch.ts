export default async (ctx: any) => {
  const data = __isBrowser__
    ? await (await window.fetch(`/api/posts/${ctx.match.params.slug}`)).json()
    : ctx.pageProps

  return {
    post: data,
  }
}
