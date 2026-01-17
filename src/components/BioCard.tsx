import type { Profile } from "../shared/types";
import CvDownload from "./CvDownload";
import ArticlesSection from "./ArticlesSection";

import { Link } from "react-router-dom";


interface BioCardProps {
  profile: Profile;
}

export default function BioCard({ profile }: BioCardProps) {
  const portraitSmall = "/images/mrodriguez-portrait-small.jpg";
  const portraitLarge = "/images/mrodriguez-large.jpg";

  return (
    <div className="w-full text-base xl:text-lg">
      <div className="w-full flex flex-col items-start">

        <div className="w-full rounded-2xl shadow-xl bg-slate-900/90 border border-slate-800 p-6 xl:p-8">

          {/* Mobile image */}
          <div
            className="block xl:hidden rounded-full shadow-xl mx-auto -mt-16 h-32 w-32 bg-cover bg-center border-2 border-slate-700"
            style={{ backgroundImage: `url(${portraitSmall})` }}
          ></div>

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
            <Link
              to="/articles"
              target="_blank"
              className="uppercase tracking-wide text-sky-400 hover:text-sky-300 hover:underline"
            >
              articles
            </Link>

          </div>

          {/* Name (one line, centered in space) */}
          <h1 className="text-4xl md:text-4xl xl:text-4xl font-bold mt-2 text-slate-50 font-sans">
            {profile.name}
          </h1>
          <div className="mt-3 border-b border-slate-600 opacity-60" />


          {/* Headline */}
          <h3 className="pt-3 text-slate-200 font-semibold text-xl">
            {profile.headline}
          </h3>

          <div className="mt-3 border-b border-slate-60text-xl md:text-2xl xl:text-2xl0 opacity-60" />




          {/* Short bio */}
          <p className="pt-4 text-slate-300 text-base xl:text-lg leading-relaxed">
            {profile.shortBio}
          </p>

          {/* Location */}
          <p className="pt-2 text-sm text-slate-400">{profile.location}</p>

          {/* Desktop portrait (max size to prevent overflow) */}
          <div className="hidden xl:block mt-6">
            <img
              src={portraitLarge}
              alt={profile.name}
              className="rounded-xl shadow-lg border border-slate-700 mx-auto max-w-xs object-cover"
            />
          </div>



          {/* CV */}
          <CvDownload />

          <hr className="border-slate-700 my-6" />

          {/* Here I could show the contents of the SkillCard component. It has props. */}


          {/* Behance Projects Section */}
          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-semibold text-slate-100">
              Featured Projects
            </h2>

            {/* Project 1 */}
            <div className="w-full flex justify-center">
              <iframe
                src="https://www.behance.net/embed/project/177926011?ilo0=1"
                className="rounded-lg border border-slate-700 shadow-lg w-full max-w-md h-80"
                allowFullScreen
                loading="lazy"
                frameBorder="0"
                allow="clipboard-write"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            {/* Project 2 */}
            <div className="w-full flex justify-center">
              <iframe
                src="https://www.behance.net/embed/project/174928575?ilo0=1"
                className="rounded-lg border border-slate-700 shadow-lg w-full max-w-md h-80"
                allowFullScreen
                loading="lazy"
                frameBorder="0"
                allow="clipboard-write"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            {/* Other Projects... */}

          </div>

          <hr className="border-slate-700 my-6" />

          <ArticlesSection />



        </div>
      </div>
    </div>
  );
}
