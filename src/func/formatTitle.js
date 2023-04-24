export default function formatTitle(title) {
  const foramtedTitle = title.length > 7 ? title.slice(0, 8) + '...' : title;

  return foramtedTitle;
}
