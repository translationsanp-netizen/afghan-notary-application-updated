export const versionedImage = (url?: string | null, version?: string | number | null) => {
  if (!url) return url ?? null;
  if (!version || url.startsWith("data:")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${encodeURIComponent(String(version))}`;
};

export const storagePathFromPublicUrl = (url?: string | null, bucket = "cms-media") => {
  if (!url) return null;
  const marker = `/storage/v1/object/public/${bucket}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length).split("?")[0]);
};