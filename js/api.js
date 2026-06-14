export async function verifyWithServer() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
