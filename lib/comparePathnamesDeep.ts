export function comparePathnames(firstLink: string, secondLink: string) {
  return getTruePathname(secondLink) === getTruePathname(firstLink);
}

export function getTruePathname(pathname: string) {
  return pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname;
}
