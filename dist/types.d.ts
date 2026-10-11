export type SocialPlatform = 'X' | 'Telegram' | 'Discord';
export type ConvictionLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type UrgencyLevel = 'NORMAL' | 'HIGH' | 'BREAKING';
export type TradeSide = 'BUY' | 'SELL';
export type TradeStatus = 'OPEN' | 'CLOSED_PROFIT' | 'CLOSED_STOPLOSS';
export interface KOLProfile {
    id: string;
    handle: string;
    name: string;
    platform: SocialPlatform;
    tier: 'TIER_1' | 'TIER_2' | 'SPECIALIST';
    weight: number;
    focusArea: 'Solana' | 'DeFi' | 'AI' | 'Macro' | 'Memes';
}
export interface KOLPost {
    id: string;
    kolHandle: string;
    platform: SocialPlatform;
    text: string;
    timestamp: number;
    extractedTokens: string[];
    sentimentScore: number;
    conviction: ConvictionLevel;
    urgency: UrgencyLevel;
}
export interface NarrativeCluster {
    id: string;
    tokenSymbol: string;
    detectedAt: number;
    uniqueKolsCount: number;
    kolHandles: string[];
    averageSentiment: number;
    convergenceScore: number;
    dominantThesis: string;
    triggeredSignal: boolean;
}
export interface PracticeTrade {
    id: string;
    tokenSymbol: string;
    side: TradeSide;
    entryPriceUSD: number;
    positionSizeUSD: number;
    stopLossUSD: number;
    takeProfitUSD: number;
    entryTimestamp: number;
    status: TradeStatus;
    exitPriceUSD?: number;
    realizedPnlUSD?: number;
    auditTrail: {
        evidenceClusterId: string;
        contributingKols: string[];
        sentimentScore: number;
        convergenceScore: number;
        riskRuleApplied: string;
        rationale: string;
    };
}
