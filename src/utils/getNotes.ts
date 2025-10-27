export default async function getNotes() {
  const res = await fetch("http://localhost:4000/api/notes");
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}