export function formatMessageTime(date) {
  const messageDate = new Date(date);
  const now = new Date();

  const isToday = messageDate.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = messageDate.toDateString() === yesterday.toDateString();

  const time = messageDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  if (isToday) return `Today, ${time}`;
  if (isYesterday) return `Yesterday, ${time}`;

  const dateString = messageDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return `${dateString}, ${time}`;
}
