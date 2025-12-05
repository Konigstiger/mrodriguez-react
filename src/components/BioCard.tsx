import type { Profile } from "../shared/types";
import CvDownload from "./CvDownload";

interface BioCardProps {
  profile: Profile;
}

export default function BioCard({ profile }: BioCardProps) {
  const portraitSmall = "/images/mrodriguez-portrait-small.jpg";
  const portraitLarge = "/images/mrodriguez-large.jpg";

  return (
    <div className="w-full xl:w-3/5 flex justify-center xl:justify-start px-2 text-base xl:text-lg">
      <div className="w-full flex items-start h-auto xl:h-screen flex-wrap xl:my-0 my-10">
        <div className="w-full rounded-lg shadow-2xl bg-slate-900/90 border border-slate-700 p-6 xl:p-8">
          {/* Mobile image */}
          <div
            className="block xl:hidden rounded-full shadow-xl mx-auto -mt-16 h-32 w-32 bg-cover bg-center border-2 border-slate-700"
            style={{ backgroundImage: `url(${portraitSmall})` }}
          ></div>

          {/* Name */}
          <h1 className="text-3xl sm:text-4xl xl:text-4xl whitespace-nowrap font-bold mt-6 xl:mt-2 text-slate-50 font-sans">
            {profile.name}
          </h1>

          <div className="mx-auto xl:mx-0 mt-3 border-b border-slate-600 opacity-60" />

          {/* Headline */}
          <h3 className="pt-3 text-slate-200 font-semibold text-xl">
            {profile.headline}
          </h3>

          <div className="mx-auto xl:mx-0 mt-3 border-b border-slate-600 opacity-60" />

          {/* Social links */}
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            {Object.entries(profile.links).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="uppercase tracking-wide text-sky-400 hover:text-sky-300 hover:underline"
              >
                {key}
              </a>
            ))}
          </div>

          {/* Short bio */}
          <p className="pt-4 text-slate-300 text-base xl:text-lg leading-relaxed">
            {profile.shortBio}
          </p>

          {/* Location */}
          <p className="pt-2 text-sm text-slate-400">{profile.location}</p>

          {/* Large image on desktop */}
          <div className="hidden xl:block mt-4">
            <img
              src={portraitLarge}
              alt={profile.name}
              className="rounded-lg shadow-lg border border-slate-700"
            />
          </div>


          {/* CV download panel */}
          <CvDownload />

        </div>

      </div>


    </div>
  );
}
