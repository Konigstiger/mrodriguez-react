import type { Profile } from "../shared/types";
// retrieve the url for the API (Azure Function) from environment variable on the SPA on Azure
import { API_BASE_URL } from "../config";


export async function getProfile(): Promise<Profile> {
  const url = `${API_BASE_URL}/api/profile`;
  //console.log("Fetching profile from:", url);

  try {
    //console.log(API_BASE_URL);

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
