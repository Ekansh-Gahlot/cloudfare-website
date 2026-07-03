export type Engine = "VDH" | "VVS";

export interface PipelineStage {
  id: string;
  engine: Engine;
  order: number;
  name: string;
  plainEnglish: string;
  technicalDetail: string;
  glossaryTermIds: string[];
}

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "recon",
    engine: "VDH",
    order: 0,
    name: "Recon",
    plainEnglish:
      "Before hunting for bugs, the tool reads through the repo and figures out what kind of application it's looking at and which categories of security issues are worth checking for.",
    technicalDetail:
      "Enumerates architecture and attack classes from the repo index. Multiple recon agents run concurrently (reconAgents, default 3) to independently converge on the same picture.",
    glossaryTermIds: ["vdh", "fleet"],
  },
  {
    id: "hunt",
    engine: "VDH",
    order: 1,
    name: "Hunt",
    plainEnglish:
      "For each category of risk identified in recon, a dedicated searcher looks through the relevant code for real, concrete instances of that problem.",
    technicalDetail:
      "Per-attack-class agents search for candidate findings. Runs under a concurrency cap (maxAgents, default 8).",
    glossaryTermIds: [],
  },
  {
    id: "validate",
    engine: "VDH",
    order: 2,
    name: "Validate",
    plainEnglish:
      "Every candidate finding from the hunt stage gets a second, independent look before anyone trusts it — a specialist tries to confirm or shoot it down.",
    technicalDetail: "A validator agent confirms or rejects each candidate finding.",
    glossaryTermIds: [],
  },
  {
    id: "gapfill",
    engine: "VDH",
    order: 3,
    name: "Gapfill",
    plainEnglish:
      "The tool checks which files and risk categories were never actually looked at, then sends searchers back to cover those gaps.",
    technicalDetail:
      "Coverage matrix analysis triggers follow-up hunt rounds for uncovered file/attack-class pairs, up to maxHuntRounds (default 3), capped at gapfillMaxTasks (default 5) per round.",
    glossaryTermIds: ["coverage-matrix"],
  },
  {
    id: "dedup",
    engine: "VDH",
    order: 4,
    name: "Dedup",
    plainEnglish:
      "If multiple searchers found the same underlying bug described differently, this stage merges those duplicate reports into one.",
    technicalDetail:
      "Clusters and canonicalizes overlapping findings, up to maxSiblings (default 3) variant candidates per finding.",
    glossaryTermIds: [],
  },
  {
    id: "trace",
    engine: "VDH",
    order: 5,
    name: "Trace",
    plainEnglish:
      "Ideally, the tool would trace whether a bug in one internal service is actually reachable from another exposed one. Locally, it doesn't have the cross-repo map needed to do that safely, so this stage is honest about it and passes everything through unchanged.",
    technicalDetail:
      "Best-effort reachability trace. Requires an injected dependencyGraph built from an authorized cross-repo symbol index — data only available in a hosted control-plane context. Without it, this is a no-op pass-through: all findings forwarded unchanged, traced=false, no consumer hunt tasks spawned. This is deliberate, not a bug — building that graph from a single local run would produce misleadingly incomplete results.",
    glossaryTermIds: ["dependency-graph", "control-plane"],
  },
  {
    id: "feedback",
    engine: "VDH",
    order: 6,
    name: "Feedback",
    plainEnglish:
      "Lessons learned this round — what was missed, what patterns worked — get turned into targeted follow-up tasks for the next pass.",
    technicalDetail: "Generates feedback tasks for the next gapfill round, capped at feedbackMaxTasks (default 5).",
    glossaryTermIds: [],
  },
  {
    id: "report",
    engine: "VDH",
    order: 7,
    name: "Report",
    plainEnglish:
      "Everything gets written up in a clear, shareable format: a plain report, a JSON file for tooling, and an industry-standard SARIF file that plugs into GitHub code scanning.",
    technicalDetail: "Renders Markdown, JSON, and SARIF reports from the final VDH findings list.",
    glossaryTermIds: ["sarif", "fail-on", "sqlite-resume"],
  },
  {
    id: "vvs-dedup",
    engine: "VVS",
    order: 8,
    name: "Re-check for Duplicates",
    plainEnglish: "Before scoring anything, VVS does its own pass to merge any remaining duplicate findings from VDH.",
    technicalDetail: "Deduplicates the VDH findings list as the first VVS stage.",
    glossaryTermIds: ["vvs"],
  },
  {
    id: "judgment",
    engine: "VVS",
    order: 9,
    name: "Judgment",
    plainEnglish:
      "Each confirmed finding gets sorted into a real-world risk bucket: is this something an attacker on the internet could actually hit, something only reachable from inside, something dormant, or not really a risk at all?",
    technicalDetail:
      "Classifies each finding as internet-exploitable, internal-only, latent, wrong-repo, duplicate, or not-a-risk.",
    glossaryTermIds: [],
  },
  {
    id: "fixing",
    engine: "VVS",
    order: 10,
    name: "Fixing",
    plainEnglish:
      "For findings that look genuinely fixable, the tool writes an actual patch, proves in a sandbox that the bug reproduces before the fix and is gone after, and only then prepares a draft pull request for a human to review.",
    technicalDetail:
      "Runs a patch trial for fixable findings; creates a draft PR payload only if fail-before/pass-after is proven. Sandbox execution requires Docker + unshare (util-linux); the harness fails closed if the sandbox can't execute.",
    glossaryTermIds: ["sandbox"],
  },
];
