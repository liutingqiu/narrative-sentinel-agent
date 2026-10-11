import { KOLProfile, KOLPost } from '../types.js';
export declare const CURATED_KOLS: KOLProfile[];
export declare class KOLMonitor {
    private kols;
    constructor(customKols?: KOLProfile[]);
    getMonitoredKols(): KOLProfile[];
    /**
     * Parses raw text, detects cashtags/tickers, and calculates sentiment score.
     */
    analyzePost(kolHandle: string, platform: 'X' | 'Telegram' | 'Discord', rawText: string): KOLPost;
    private extractTickers;
    private calculateSentiment;
    private assessConviction;
    private assessUrgency;
}
