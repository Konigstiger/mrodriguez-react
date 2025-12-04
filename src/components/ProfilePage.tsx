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
        className="flex flex-col xl:flex-row items-start justify-center xl:h-screen bg-slate-950 bg-fixed bg-center"
      >
        {/* Left: Bio (we'll put CvDownload inside BioCard) */}
        <BioCard profile={profile} />

        {/* Right: Skills + Experience */}
        <div className="w-full xl:w-3/5 px-4 xl:px-12 mt-4 xl:mt-0">
          <div className="bg-slate-900/80 rounded-xl">
            <div className="flex flex-col gap-4 p-4 xl:p-6">
              <SkillCard skills={profile.skills} />
              <WorkExperienceSection experience={profile.experience} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
