import type { Profile } from "../shared/types";

// retrieve the url for the API (Azure Function) from environment variable on the SPA on Azure
const API_BASE =
  import.meta.env.API_BASE_URL ??
  "https://func-mrodriguez-a2byetd5gefdd3b5.canadacentral-01.azurewebsites.net";


export async function getProfile(): Promise<Profile> {
  const url = `${API_BASE}/api/profile`;
  console.log("Fetching profile from:", url);

  try {
    const res = await fetch(url);
    console.log("Profile response status:", res.status);

    if (!res.ok) {
      const text = await res.text();
      console.error("Profile fetch failed body:", text);
      throw new Error(`Failed to load profile: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (e) {
    console.error("Profile fetch error:", e);
    throw e;
  }
}
