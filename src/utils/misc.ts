export const isLocalhost = () => window.location.href.indexOf("localhost") > -1;

export const now = () => new Date().getTime();

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
