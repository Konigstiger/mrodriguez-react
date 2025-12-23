
export default function Articles() {
  return (
    <>
      <h2 className="text-xl font-semibold text-slate-100">
        Featured Articles
      </h2>

      <div className="mt-6 rounded-lg border border-slate-700/70 bg-slate-900/70 p-4">
        <ul>
          <li>
            <a href="https://medium.com/@merodriguez81/startingup-with-aspnetcore-docker-entity-framework-core-41b365647fe6">Starting up with ASP.Net Core + Docker</a>
            <h6 className="text-slate-400">
              Introduction, first steps and configuration, with screenshots. I use Entity Framework, db-first approach.
            </h6>
          </li>

          {/* Other Articles in the future */}
          </ul>
      </div>
    </>
  );
}
