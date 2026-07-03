export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  linkedStageIds: string[];
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    id: "vdh",
    term: "VDH",
    definition:
      "Vulnerability Discovery Harness — the first engine in the pipeline. Finds and validates candidate security findings.",
    linkedStageIds: ["recon"],
  },
  {
    id: "vvs",
    term: "VVS",
    definition:
      "Vulnerability Validation and Scoring — the second engine. Classifies confirmed findings by real-world risk and attempts fixes.",
    linkedStageIds: ["vvs-dedup"],
  },
  {
    id: "sarif",
    term: "SARIF",
    definition:
      "Static Analysis Results Interchange Format — an industry-standard JSON format for security findings that GitHub and other code-scanning tools understand natively.",
    linkedStageIds: ["report"],
  },
  {
    id: "dependency-graph",
    term: "dependencyGraph",
    definition:
      "An authorized, cross-repo map of which services call which. Required for the trace stage to do real cross-service reachability analysis; not available in a local run.",
    linkedStageIds: ["trace"],
  },
  {
    id: "control-plane",
    term: "Control plane",
    definition:
      "A hosted, multi-tenant service (not part of this local-first engine) that would coordinate fleet-wide scans, store authorized cross-repo graphs, and manage runners.",
    linkedStageIds: ["trace"],
  },
  {
    id: "sandbox",
    term: "Sandbox",
    definition:
      "An isolated Docker container where the fixing stage proves a patch actually fixes the bug before proposing it.",
    linkedStageIds: ["fixing"],
  },
  {
    id: "sqlite-resume",
    term: "SQLite resume",
    definition:
      "Pipeline stage progress can be persisted to a SQLite database (--db) so a run can be resumed later with --resume <runId> instead of starting over.",
    linkedStageIds: ["report"],
  },
  {
    id: "fail-on",
    term: "--fail-on",
    definition:
      "A CLI flag (--fail-on high) that makes the scan exit with a non-zero status if findings at or above that severity are present — used to fail CI builds.",
    linkedStageIds: ["report"],
  },
  {
    id: "coverage-matrix",
    term: "Coverage matrix",
    definition:
      "A tracking structure the gapfill stage uses to know which file × attack-class pairs have and haven't been searched yet.",
    linkedStageIds: ["gapfill"],
  },
  {
    id: "fleet",
    term: "Fleet mode",
    definition:
      "A CLI mode (fleet repos.json) that runs the harness across a list of repos under one shared worker/concurrency budget.",
    linkedStageIds: ["recon"],
  },
];
