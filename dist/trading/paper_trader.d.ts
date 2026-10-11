import { NarrativeCluster, PracticeTrade } from '../types.js';
export interface RiskManagementConfig {
    initialBankrollUSD: number;
    maxPositionSizePct: number;
    stopLossPct: number;
    takeProfitPct: number;
}
export declare class EvidencePaperTrader {
    private bankrollUSD;
    private config;
    private trades;
    constructor(config?: Partial<RiskManagementConfig>);
    getBankroll(): number;
    getTrades(): PracticeTrade[];
    /**
     * Evaluates a narrative cluster and executes a practice trade with verifiable audit trail.
     */
    evaluateAndExecute(cluster: NarrativeCluster, spotPriceUSD: number): PracticeTrade | null;
    /**
     * Simulates settlement of an open trade against market price.
     */
    settleTrade(tradeId: string, exitPriceUSD: number): PracticeTrade;
}
