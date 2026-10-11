import { KOLPost, NarrativeCluster, KOLProfile } from '../types.js';
export declare class NarrativeConvergenceDetector {
    private kolWeights;
    constructor(kols?: KOLProfile[]);
    /**
     * Evaluates a recent window of KOL posts and detects multi-voice narrative convergence clusters.
     */
    detectClusters(posts: KOLPost[], minUniqueKols?: number, minConvergenceScore?: number): NarrativeCluster[];
    private summarizeThesis;
}
