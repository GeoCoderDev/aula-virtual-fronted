export async function getInterfazColor(): Promise<string> {
  try {
    const res = await fetch(
      "https://api.aula-virtual-jbsf.com/api/interfazColor",
      { method: "GET" }
    );
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch interfazColor:", error);
  }
  return "#00FF6F";
}
