import type { Profile } from "../shared/types";

const API_BASE =
  "https://func-mrodriguez-portfolio-fsc6fyhqfbgxafdc.brazilsouth-01.azurewebsites.net";

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
