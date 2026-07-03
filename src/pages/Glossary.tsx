import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GLOSSARY } from "../data/glossary";
import { PIPELINE_STAGES } from "../data/pipeline";

export function Glossary() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GLOSSARY;
    return GLOSSARY.filter(
      (term) => term.term.toLowerCase().includes(q) || term.definition.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="glossary">
      <h1>Glossary</h1>
      <input
        type="search"
        placeholder="Search terms..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search glossary"
      />
      <dl>
        {filtered.map((term) => (
          <div key={term.id} className="glossary__entry">
            <dt>{term.term}</dt>
            <dd>
              {term.definition}
              <div className="glossary__links">
                {term.linkedStageIds.map((stageId) => {
                  const stage = PIPELINE_STAGES.find((s) => s.id === stageId);
                  if (!stage) return null;
                  return (
                    <Link key={stageId} to={`/walkthrough?stage=${stageId}`}>
                      See in walkthrough: {stage.name}
                    </Link>
                  );
                })}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
