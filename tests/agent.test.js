// SPDX-License-Identifier: MIT
import test from 'node:test';
import assert from 'node:assert/strict';
import { KOLMonitor, NarrativeConvergenceDetector, EvidencePaperTrader } from '../dist/index.js';

test('1. KOLMonitor initializes with 20 curated creator profiles', () => {
  const monitor = new KOLMonitor();
  const kols = monitor.getMonitoredKols();

  assert.equal(kols.length, 20, 'Must monitor exactly 20 curated creators per bounty spec');
  const platforms = new Set(kols.map(k => k.platform));
  assert.ok(platforms.has('X') && platforms.has('Telegram') && platforms.has('Discord'), 'Must cover X, Telegram, and Discord');
});

test('2. Token extraction and sentiment scoring from raw text', () => {
  const monitor = new KOLMonitor();
  const post = monitor.analyzePost(
    '@mert_',
    'X',
    'Massive conviction on $SOL and $JUP right now. Breakthrough DeFi volume and scaling are bullish!'
  );

  assert.ok(post.extractedTokens.includes('SOL'));
  assert.ok(post.extractedTokens.includes('JUP'));
  assert.ok(post.sentimentScore > 0.4, 'Sentiment should be strongly bullish');
  assert.equal(post.conviction, 'HIGH');
});

test('3. Narrative convergence detection across multiple KOL voices', () => {
  const monitor = new KOLMonitor();
  const detector = new NarrativeConvergenceDetector();

  const p1 = monitor.analyzePost('@mert_', 'X', 'Extremely bullish on $SOL breakout and scaling.');
  const p2 = monitor.analyzePost('@aeyakovenko', 'X', 'Solana $SOL active accounts and TPS reaching new ATH.');
  const p3 = monitor.analyzePost('@toly_daily', 'Telegram', 'Breaking: Institutional inflows into $SOL accelerating.');

  const clusters = detector.detectClusters([p1, p2, p3], 2, 60);

  assert.ok(clusters.length >= 1, 'Should form at least one convergence cluster');
  const solCluster = clusters.find(c => c.tokenSymbol === 'SOL');
  assert.ok(solCluster);
  assert.equal(solCluster.uniqueKolsCount, 3);
  assert.ok(solCluster.convergenceScore >= 75);
  assert.equal(solCluster.triggeredSignal, true);
});

test('4. Single voice does not trigger narrative convergence', () => {
  const monitor = new KOLMonitor();
  const detector = new NarrativeConvergenceDetector();

  const p1 = monitor.analyzePost('@cobie', 'X', 'Looking at $PEPE chart.');
  const clusters = detector.detectClusters([p1], 2, 60);

  assert.equal(clusters.length, 0, 'Single post must not form a convergence cluster');
});

test('5. EvidencePaperTrader enforces strict 5% risk limits and SL/TP', () => {
  const trader = new EvidencePaperTrader({ initialBankrollUSD: 10_000, maxPositionSizePct: 5.0 });

  const mockCluster = {
    id: 'c_test_01',
    tokenSymbol: 'SOL',
    detectedAt: Date.now(),
    uniqueKolsCount: 3,
    kolHandles: ['@mert_', '@aeyakovenko', '@toly_daily'],
    averageSentiment: 0.8,
    convergenceScore: 88,
    dominantThesis: 'Consensus bullish breakout',
    triggeredSignal: true
  };

  const trade = trader.evaluateAndExecute(mockCluster, 150.0); // SOL at $150
  assert.ok(trade);
  assert.equal(trade.positionSizeUSD, 500); // 5% of 10,000 = $500
  assert.equal(trade.stopLossUSD, 141.0); // 6% SL
  assert.equal(trade.takeProfitUSD, 177.0); // 18% TP
});

test('6. Verifiable audit trail preserves complete cause-and-effect rationale', () => {
  const trader = new EvidencePaperTrader();
  const mockCluster = {
    id: 'c_test_02',
    tokenSymbol: 'JUP',
    detectedAt: Date.now(),
    uniqueKolsCount: 2,
    kolHandles: ['@weremeow', '@tarunchitra'],
    averageSentiment: 0.75,
    convergenceScore: 78,
    dominantThesis: 'Jupiter fee engine and DEX dominance',
    triggeredSignal: true
  };

  const trade = trader.evaluateAndExecute(mockCluster, 1.20);
  assert.ok(trade);
  assert.ok(trade.auditTrail.contributingKols.includes('@weremeow'));
  assert.ok(trade.auditTrail.rationale.includes('Jupiter fee engine'));
  assert.ok(trade.auditTrail.riskRuleApplied.includes('5%'));
});

test('7. Settlement updates bankroll and realized PnL correctly', () => {
  const trader = new EvidencePaperTrader({ initialBankrollUSD: 10_000 });
  const mockCluster = {
    id: 'c_test_03',
    tokenSymbol: 'SOL',
    detectedAt: Date.now(),
    uniqueKolsCount: 3,
    kolHandles: ['@mert_', '@blknoiz06', '@milesdeutscher'],
    averageSentiment: 0.85,
    convergenceScore: 92,
    dominantThesis: 'Solana memecoin supercycle volume',
    triggeredSignal: true
  };

  const trade = trader.evaluateAndExecute(mockCluster, 150.0);
  // Settle at +10% ($165.0)
  const settled = trader.settleTrade(trade.id, 165.0);

  assert.equal(settled.status, 'CLOSED_PROFIT');
  assert.equal(settled.realizedPnlUSD, 50.0); // +10% on $500 position = +$50
  assert.equal(trader.getBankroll(), 10_050.0); // 10,000 + 50
});
