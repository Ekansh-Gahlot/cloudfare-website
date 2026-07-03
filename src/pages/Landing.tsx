import { Link } from "react-router-dom";

export function Landing() {
  return (
    <div className="landing">
      <section className="landing__hero">
        <h1>Vuln Harness, explained without the jargon</h1>
        <p>
          Vuln Harness is a tool that reads through a codebase, hunts for real security bugs, double-checks
          every one it finds, and only then tells you about it — with proof.
        </p>
        <Link className="landing__cta" to="/walkthrough">
          Walk through the pipeline
        </Link>
      </section>
      <section className="landing__cards">
        <article className="landing__card">
          <h2>Discover</h2>
          <p>
            Multiple searchers look through the code for specific categories of security risk, then a
            validator confirms or rejects each one they find.
          </p>
        </article>
        <article className="landing__card">
          <h2>Validate</h2>
          <p>
            Every confirmed finding is sorted by real-world risk: is this reachable from the internet, only
            from inside, or not really a risk at all?
          </p>
        </article>
        <article className="landing__card">
          <h2>Fix</h2>
          <p>
            For fixable issues, the tool writes a patch, proves it works in a sandbox, and hands a human a
            draft pull request to review.
          </p>
        </article>
      </section>
    </div>
  );
}
