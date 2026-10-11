// SPDX-License-Identifier: MIT
import { KOLPost, NarrativeCluster, KOLProfile } from '../types.js';
import { CURATED_KOLS } from '../monitor/kol.js';

export class NarrativeConvergenceDetector {
  private kolWeights: Map<string, number>;

  constructor(kols: KOLProfile[] = CURATED_KOLS) {
    this.kolWeights = new Map();
    for (const k of kols) {
      this.kolWeights.set(k.handle.toLowerCase(), k.weight);
    }
  }

  /**
   * Evaluates a recent window of KOL posts and detects multi-voice narrative convergence clusters.
   */
  public detectClusters(posts: KOLPost[], minUniqueKols = 2, minConvergenceScore = 60): NarrativeCluster[] {
    const tokenBuckets = new Map<string, KOLPost[]>();

    for (const post of posts) {
      for (const token of post.extractedTokens) {
        if (!tokenBuckets.has(token)) {
          tokenBuckets.set(token, []);
        }
        tokenBuckets.get(token)!.push(post);
      }
    }

    const clusters: NarrativeCluster[] = [];

    for (const [token, postList] of tokenBuckets.entries()) {
      const uniqueHandles = Array.from(new Set(postList.map(p => p.kolHandle.toLowerCase())));

      if (uniqueHandles.length < minUniqueKols) {
        continue;
      }

      // Compute weighted sentiment and convergence score
      let weightedSentimentSum = 0;
      let totalWeight = 0;
      let urgencyMultiplier = 1.0;

      for (const post of postList) {
        const weight = this.kolWeights.get(post.kolHandle.toLowerCase()) ?? 1.0;
        weightedSentimentSum += post.sentimentScore * weight;
        totalWeight += weight;

        if (post.urgency === 'BREAKING') urgencyMultiplier = Math.max(urgencyMultiplier, 1.3);
        else if (post.urgency === 'HIGH') urgencyMultiplier = Math.max(urgencyMultiplier, 1.15);
      }

      const averageSentiment = totalWeight > 0 ? weightedSentimentSum / totalWeight : 0;

      // Base score derived from unique KOL count (e.g. 2 KOLs = 50, 3 = 75, 4+ = 100)
      const countFactor = Math.min(1.0, uniqueHandles.length / 4.0);
      const sentimentFactor = Math.max(0, averageSentiment); // bullish convergence focus
      const rawScore = (countFactor * 60 + sentimentFactor * 40) * urgencyMultiplier;
      const convergenceScore = Math.min(100, Math.round(rawScore));

      const dominantThesis = this.summarizeThesis(token, postList);
      const triggeredSignal = convergenceScore >= minConvergenceScore && averageSentiment >= 0.35;

      clusters.push({
        id: `cluster_${token}_${Date.now()}`,
        tokenSymbol: token,
        detectedAt: Date.now(),
        uniqueKolsCount: uniqueHandles.length,
        kolHandles: uniqueHandles,
        averageSentiment: parseFloat(averageSentiment.toFixed(2)),
        convergenceScore,
        dominantThesis,
        triggeredSignal
      });
    }

    return clusters.sort((a, b) => b.convergenceScore - a.convergenceScore);
  }

  private summarizeThesis(token: string, posts: KOLPost[]): string {
    const handles = Array.from(new Set(posts.map(p => p.kolHandle))).join(', ');
    return `Multiple key market creators (${handles}) converged on bullish ${token} narrative highlighting ecosystem growth and momentum.`;
  }
}
