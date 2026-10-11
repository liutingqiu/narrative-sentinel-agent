export const CURATED_KOLS = [
    { id: 'kol_01', handle: '@aeyakovenko', name: 'Anatoly Yakovenko', platform: 'X', tier: 'TIER_1', weight: 1.5, focusArea: 'Solana' },
    { id: 'kol_02', handle: '@mert_', name: 'Mert Mumtaz (Helius)', platform: 'X', tier: 'TIER_1', weight: 1.4, focusArea: 'Solana' },
    { id: 'kol_03', handle: '@weremeow', name: 'Meow (Jupiter)', platform: 'X', tier: 'TIER_1', weight: 1.4, focusArea: 'DeFi' },
    { id: 'kol_04', handle: '@rajgokal', name: 'Raj Gokal', platform: 'X', tier: 'TIER_1', weight: 1.3, focusArea: 'Solana' },
    { id: 'kol_05', handle: '@tarunchitra', name: 'Tarun Chitra (Gauntlet)', platform: 'X', tier: 'TIER_1', weight: 1.4, focusArea: 'DeFi' },
    { id: 'kol_06', handle: '@Arthur_0x', name: 'Arthur0x (DeFiance)', platform: 'X', tier: 'TIER_1', weight: 1.3, focusArea: 'DeFi' },
    { id: 'kol_07', handle: '@blknoiz06', name: 'Ansem', platform: 'X', tier: 'TIER_2', weight: 1.2, focusArea: 'Memes' },
    { id: 'kol_08', handle: '@toly_daily', name: 'Solana Alpha News', platform: 'Telegram', tier: 'SPECIALIST', weight: 1.1, focusArea: 'Solana' },
    { id: 'kol_09', handle: '@cryptokaleo', name: 'Kaleo', platform: 'X', tier: 'TIER_2', weight: 1.0, focusArea: 'Macro' },
    { id: 'kol_10', handle: '@CL207', name: 'CL (eGirl Capital)', platform: 'X', tier: 'TIER_1', weight: 1.3, focusArea: 'Macro' },
    { id: 'kol_11', handle: '@milesdeutscher', name: 'Miles Deutscher', platform: 'X', tier: 'TIER_2', weight: 1.1, focusArea: 'DeFi' },
    { id: 'kol_12', handle: '@thedefiedge', name: 'The DeFi Edge', platform: 'X', tier: 'SPECIALIST', weight: 1.2, focusArea: 'DeFi' },
    { id: 'kol_13', handle: '@MustStopMurad', name: 'Murad Mahmudov', platform: 'X', tier: 'TIER_2', weight: 1.3, focusArea: 'Memes' },
    { id: 'kol_14', handle: '@kaito_ai', name: 'Kaito AI Brain', platform: 'X', tier: 'TIER_1', weight: 1.5, focusArea: 'AI' },
    { id: 'kol_15', handle: '@DefiIgnas', name: 'Ignas DeFi Research', platform: 'X', tier: 'SPECIALIST', weight: 1.2, focusArea: 'DeFi' },
    { id: 'kol_16', handle: '@0xngmi', name: '0xngmi (DefiLlama)', platform: 'X', tier: 'TIER_1', weight: 1.5, focusArea: 'DeFi' },
    { id: 'kol_17', handle: '@SolanaFloor', name: 'SolanaFloor Feed', platform: 'Telegram', tier: 'SPECIALIST', weight: 1.1, focusArea: 'Solana' },
    { id: 'kol_18', handle: '@hosseeb', name: 'Haseeb Qureshi (Dragonfly)', platform: 'X', tier: 'TIER_1', weight: 1.4, focusArea: 'Macro' },
    { id: 'kol_19', handle: '@cobie', name: 'Cobie', platform: 'X', tier: 'TIER_1', weight: 1.4, focusArea: 'Macro' },
    { id: 'kol_20', handle: '@SolanaDevDiscord', name: 'Solana Core Devs', platform: 'Discord', tier: 'TIER_1', weight: 1.5, focusArea: 'Solana' }
];
export class KOLMonitor {
    kols;
    constructor(customKols) {
        this.kols = customKols ?? CURATED_KOLS;
    }
    getMonitoredKols() {
        return this.kols;
    }
    /**
     * Parses raw text, detects cashtags/tickers, and calculates sentiment score.
     */
    analyzePost(kolHandle, platform, rawText) {
        const extractedTokens = this.extractTickers(rawText);
        const sentimentScore = this.calculateSentiment(rawText);
        const conviction = this.assessConviction(rawText);
        const urgency = this.assessUrgency(rawText);
        return {
            id: `post_${kolHandle}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            kolHandle,
            platform,
            text: rawText,
            timestamp: Date.now(),
            extractedTokens,
            sentimentScore,
            conviction,
            urgency
        };
    }
    extractTickers(text) {
        const matches = text.match(/\$[A-Z0-9]{2,10}\b/g) || [];
        const directWords = ['SOL', 'BTC', 'ETH', 'JUP', 'BONK', 'PEPE', 'WIF', 'RAY', 'METEORA'];
        const found = new Set();
        for (const m of matches) {
            found.add(m.replace('$', '').toUpperCase());
        }
        for (const word of directWords) {
            const regex = new RegExp(`\\b${word}\\b`, 'i');
            if (regex.test(text)) {
                found.add(word);
            }
        }
        return Array.from(found);
    }
    calculateSentiment(text) {
        const lower = text.toLowerCase();
        const bullishKeywords = ['bullish', 'breakout', 'undervalued', 'accumulating', 'scaling', 'massive', 'growth', 'launching', 'moon', 'parabolic', 'ath'];
        const bearishKeywords = ['dump', 'bearish', 'overvalued', 'selling', 'liquidated', 'danger', 'drop', 'crash', 'risk', 'fail', 'scam'];
        let score = 0;
        for (const b of bullishKeywords) {
            if (lower.includes(b))
                score += 0.25;
        }
        for (const b of bearishKeywords) {
            if (lower.includes(b))
                score -= 0.25;
        }
        return Math.max(-1.0, Math.min(1.0, parseFloat(score.toFixed(2))));
    }
    assessConviction(text) {
        const lower = text.toLowerCase();
        if (lower.includes('all in') || lower.includes('massive conviction') || lower.includes('life changing') || lower.includes('fundamental shift')) {
            return 'HIGH';
        }
        if (lower.includes('looks solid') || lower.includes('accumulating') || lower.includes('scaling up')) {
            return 'MEDIUM';
        }
        return 'LOW';
    }
    assessUrgency(text) {
        const lower = text.toLowerCase();
        if (lower.includes('breaking') || lower.includes('urgent') || lower.includes('right now') || lower.includes('just announced')) {
            return 'BREAKING';
        }
        if (lower.includes('incoming') || lower.includes('imminent') || lower.includes('hours left')) {
            return 'HIGH';
        }
        return 'NORMAL';
    }
}
