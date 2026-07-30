const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const monthName = (month) => MONTH_NAMES[month - 1] || "";

export const groupMessagesByMonth = (messages = []) => {
  const map = new Map();
  for (const m of messages) {
    const key = `${m.year}-${m.month}`;
    if (!map.has(key)) map.set(key, { year: m.year, month: m.month, items: [], thumbnail: null });
    const group = map.get(key);
    group.items.push(m);
    if (!group.thumbnail && m.images?.[0]?.url) group.thumbnail = m.images[0].url;
  }
  return [...map.values()].sort((a, b) => b.year - a.year || b.month - a.month);
};

export const groupPostsByMonth = (posts = []) => {
  const map = new Map();
  for (const p of posts) {
    const d = new Date(p.createdAt);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const key = `${year}-${month}`;
    if (!map.has(key)) map.set(key, { year, month, items: [], thumbnail: null });
    const group = map.get(key);
    group.items.push(p);
    if (!group.thumbnail && p.images?.[0]?.url) group.thumbnail = p.images[0].url;
  }
  return [...map.values()].sort((a, b) => b.year - a.year || b.month - a.month);
};
