// SPDX-License-Identifier: MIT
import { NarrativeCluster, PracticeTrade } from '../types.js';

export interface RiskManagementConfig {
  initialBankrollUSD: number;
  maxPositionSizePct: number;    // e.g. 5.0% of bankroll
  stopLossPct: number;           // e.g. -6.0%
  takeProfitPct: number;         // e.g. +18.0%
}

export class EvidencePaperTrader {
  private bankrollUSD: number;
  private config: RiskManagementConfig;
  private trades: PracticeTrade[];

  constructor(config?: Partial<RiskManagementConfig>) {
    this.config = {
      initialBankrollUSD: config?.initialBankrollUSD ?? 10_000,
      maxPositionSizePct: config?.maxPositionSizePct ?? 5.0,
      stopLossPct: config?.stopLossPct ?? 6.0,
      takeProfitPct: config?.takeProfitPct ?? 18.0
    };
    this.bankrollUSD = this.config.initialBankrollUSD;
    this.trades = [];
  }

  public getBankroll(): number {
    return this.bankrollUSD;
  }

  public getTrades(): PracticeTrade[] {
    return [...this.trades];
  }

  /**
   * Evaluates a narrative cluster and executes a practice trade with verifiable audit trail.
   */
  public evaluateAndExecute(cluster: NarrativeCluster, spotPriceUSD: number): PracticeTrade | null {
    if (!cluster.triggeredSignal) {
      return null;
    }

    // Risk rule: Position size is bounded by maxPositionSizePct
    const positionSizeUSD = (this.bankrollUSD * this.config.maxPositionSizePct) / 100;
    const stopLossUSD = spotPriceUSD * (1 - this.config.stopLossPct / 100);
    const takeProfitUSD = spotPriceUSD * (1 + this.config.takeProfitPct / 100);

    const trade: PracticeTrade = {
      id: `trade_${cluster.tokenSymbol}_${Date.now()}`,
      tokenSymbol: cluster.tokenSymbol,
      side: 'BUY',
      entryPriceUSD: spotPriceUSD,
      positionSizeUSD,
      stopLossUSD: parseFloat(stopLossUSD.toFixed(4)),
      takeProfitUSD: parseFloat(takeProfitUSD.toFixed(4)),
      entryTimestamp: Date.now(),
      status: 'OPEN',
      auditTrail: {
        evidenceClusterId: cluster.id,
        contributingKols: cluster.kolHandles,
        sentimentScore: cluster.averageSentiment,
        convergenceScore: cluster.convergenceScore,
        riskRuleApplied: `Max ${this.config.maxPositionSizePct}% allocation ($${positionSizeUSD}) with ${this.config.stopLossPct}% SL and ${this.config.takeProfitPct}% TP`,
        rationale: `Convergence score ${cluster.convergenceScore}/100 across ${cluster.uniqueKolsCount} verified KOLs. Thesis: ${cluster.dominantThesis}`
      }
    };

    this.trades.push(trade);
    return trade;
  }

  /**
   * Simulates settlement of an open trade against market price.
   */
  public settleTrade(tradeId: string, exitPriceUSD: number): PracticeTrade {
    const trade = this.trades.find(t => t.id === tradeId);
    if (!trade || trade.status !== 'OPEN') {
      throw new Error(`Trade not open or not found: ${tradeId}`);
    }

    const priceChangePct = (exitPriceUSD - trade.entryPriceUSD) / trade.entryPriceUSD;
    const pnlUSD = trade.positionSizeUSD * priceChangePct;

    trade.exitPriceUSD = exitPriceUSD;
    trade.realizedPnlUSD = parseFloat(pnlUSD.toFixed(2));
    trade.status = pnlUSD >= 0 ? 'CLOSED_PROFIT' : 'CLOSED_STOPLOSS';

    this.bankrollUSD += pnlUSD;
    return trade;
  }
}
