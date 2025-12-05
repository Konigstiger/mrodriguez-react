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
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-red-400 text-sm">{error}</p>
      </main>
    );
  }

  if (!profile) {
    return <LoadingPage />;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">

      {/* Full-width layout, centered, with a generous max width */}
      <div className="w-full max-w-[1600px] mx-auto px-4 xl:px-10 py-10">

        {/* Unified background panel */}
        <div className="bg-slate-900/40 rounded-2xl p-4 xl:p-8">

          <div className="flex flex-col xl:flex-row items-start justify-center gap-10">

            {/* LEFT COLUMN (40%) */}
            <div className="w-full xl:w-2/5">
              <BioCard profile={profile} />
            </div>

            {/* RIGHT COLUMN (60%) */}
            <div className="w-full xl:w-3/5 self-start">
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 xl:p-6">
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
