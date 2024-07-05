export async function getInterfazColor(): Promise<string> {
  try {
    const res = await fetch(
      "https://api.aula-virtual-jbsf.com/api/interfazColor",
      { method: "GET", next: { revalidate: 0 } }
    );
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch interfazColor:", error);
  }
  return "#00FF6F";
}
