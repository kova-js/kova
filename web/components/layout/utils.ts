export function siteName(title: string | undefined, name: string) {
  return title ? `${title} | ${name}` : name
}
