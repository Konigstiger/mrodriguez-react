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
      <div
        id="mainContainer"
        className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 xl:px-8 flex flex-col xl:flex-row items-start justify-center gap-10 xl:gap-12 py-8 bg-slate-950 bg-fixed bg-center"
      >
        <div className="w-full bg-slate-900/40 rounded-xl p-4 xl:p-6 flex flex-col xl:flex-row gap-8">
          {/* Left: Bio (we'll put CvDownload inside BioCard) */}
          <BioCard profile={profile} />

          {/* Right: Skills + Experience */}
          <div className="w-full xl:w-2/5 px-3 xl:px-4 mt-8 xl:mt-0 self-start">
            <div className="bg-slate-900/80 rounded-xl">
              <div className="flex flex-col gap-4 p-4 xl:p-6">
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
