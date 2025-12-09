import { useEffect, useState } from "react";

import { getProfile } from "../api/profile";
import type { Profile } from "../shared/types";
import BioCard from "./BioCard";
import SkillCard from "./SkillCard";
import WorkExperienceSection from "./WorkExperienceSection";

import LoadingPage from "./LoadingPage";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch((e) => {
        console.error(e);
        setError("Could not load profile data.");
      });
  }, []);

  if (error) {
    return (
      <main className="min-h-screen w-full bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-red-400 text-sm">{error}</p>
      </main>
    );
  }

  if (!profile) {
    return <LoadingPage />;
  }

  return (
    <main className="min-h-screen w-full bg-slate-950 text-slate-100">
      {/* Outer container: much tighter on mobile, same max width on desktop */}
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 xl:px-10 py-6 sm:py-10 overflow-x-hidden">
        {/* Frame: disabled on mobile, enabled from sm+ */}
        <div className="rounded-none sm:rounded-2xl sm:bg-slate-900/40 sm:p-4 xl:p-8">
          <div className="flex flex-col xl:flex-row items-start justify-center gap-6 md:gap-10">
            <div className="w-full xl:w-2/5">
              <BioCard profile={profile} />
            </div>

            <div className="w-full xl:w-3/5 self-start">
              {/* Inner card: softer padding on mobile */}
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-3 sm:p-4 xl:p-6 overflow-x-hidden">
                <SkillCard skills={profile.skills} />
                <WorkExperienceSection experience={profile.experience} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
