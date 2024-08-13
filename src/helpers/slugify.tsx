export const slugify = (value?: string): string => {
  if (!value) return "";

  return value
    .toLowerCase()
    .trim()
    .replaceAll(" ", "-")
    .replace(/[^\w\s-]/g, "") // remove non-word characters (except for spaces and hyphens)
    .replace(/[s-]+/g, "-") // replace spaces and consecutive hyphens with a single hyphen
    .replace(/^-+|-+$/g, "") // remove any leading or trailing hyphens
};
