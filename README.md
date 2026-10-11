# Narrative Sentinel Agent 🧠⚡

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/Tests-7%2F7%20Passed-brightgreen)](tests/agent.test.js)
[![DoraHacks](https://img.shields.io/badge/DoraHacks-RYO--CHAN%20Bounty-orange)](https://dorahacks.io/hackathon/bounty/1380)
[![Live Terminal](https://img.shields.io/badge/Live%20Terminal-GitHub%20Pages-success)](https://liutingqiu.github.io/narrative-sentinel-agent/)

**Autonomous Multi-KOL Narrative Convergence & Evidence-Based Trading Agent with a Verifiable Cause-and-Effect Audit Trail.**

Submitted to the **DoraHacks • BLI Legal Tech Hackathon 2 — RYO-CHAN $6,000 USD Autonomous Agents Bounty (Special Project Spotlight: Multi-KOL Narrative Agent)**.

---

## 🌟 Overview

Crypto markets are narrative-driven, but social feeds are noisy. Single posts are often noise or paid promotions, but when multiple trusted creators converge on an asset simultaneously, high-conviction momentum forms.

**Narrative Sentinel Agent** operates as an autonomous intelligence and trading engine:
1. **Multi-KOL Ingestion:** Monitors 20 curated market leaders across X (Twitter), Telegram, and Discord.
2. **Sentiment & Urgency Extraction:** Evaluates mentioned tokens (`$SOL`, `$JUP`, `$BONK`), sentiment ($-1.0$ to $+1.0$), conviction level, and urgency.
3. **Narrative Convergence Index (NCI):** Detects multi-voice consensus within sliding 4-hour time windows.
4. **Evidence-Based Paper Trading:** Executes practice trades with strict 5% risk limits, 6% stop-loss, and 18% take-profit.
5. **Verifiable Audit Trail:** Every practice trade records contributing KOLs, convergence score, and mathematical rationale.

---

## 🌐 Live Interactive Terminal

Access the live terminal and cause-and-effect audit log directly in your browser:  
👉 **[https://liutingqiu.github.io/narrative-sentinel-agent/](https://liutingqiu.github.io/narrative-sentinel-agent/)**

---

## 📦 Quick Start & Usage

```bash
git clone https://github.com/liutingqiu/narrative-sentinel-agent.git
cd narrative-sentinel-agent
npm install
npm test
```

### TypeScript / ESM Example

```typescript
import { KOLMonitor, NarrativeConvergenceDetector, EvidencePaperTrader } from 'narrative-sentinel-agent';

// 1. Initialize KOL Monitor with 20 curated voices
const monitor = new KOLMonitor();
const posts = [
  monitor.analyzePost('@mert_', 'X', 'Massive conviction on $SOL scaling and DeFi volume!'),
  monitor.analyzePost('@aeyakovenko', 'X', 'Solana $SOL active accounts reaching all-time highs.'),
  monitor.analyzePost('@toly_daily', 'Telegram', 'Breaking: Institutional capital accelerating into $SOL.')
];

// 2. Detect narrative convergence
const detector = new NarrativeConvergenceDetector();
const clusters = detector.detectClusters(posts, 2, 75);

// 3. Execute practice trade with verifiable audit trail
const trader = new EvidencePaperTrader({ initialBankrollUSD: 10_000, maxPositionSizePct: 5.0 });

if (clusters.length > 0) {
  const trade = trader.evaluateAndExecute(clusters[0], 150.0);
  console.log(`Executed: ${trade?.side} ${trade?.tokenSymbol} | Size: $${trade?.positionSizeUSD}`);
  console.log(`Audit Trail Rationale: ${trade?.auditTrail.rationale}`);
}
```

---

## 🧪 Automated Test Suite

Run the unit tests covering all 20 KOL profiles, sentiment extraction, convergence clustering, risk management, and settlement:

```bash
node --test tests/agent.test.js
```

Output:
```text
✔ 1. KOLMonitor initializes with 20 curated creator profiles (0.6ms)
✔ 2. Token extraction and sentiment scoring from raw text (0.4ms)
✔ 3. Narrative convergence detection across multiple KOL voices (0.5ms)
✔ 4. Single voice does not trigger narrative convergence (0.1ms)
✔ 5. EvidencePaperTrader enforces strict 5% risk limits and SL/TP (0.2ms)
✔ 6. Verifiable audit trail preserves complete cause-and-effect rationale (0.1ms)
✔ 7. Settlement updates bankroll and realized PnL correctly (0.2ms)

ℹ pass 7
ℹ fail 0
```

---

## 📖 Hackathon Documentation

Read the full project pitch deck, architectural rationale, and market impact analysis:  
👉 **[PITCH_DECK.md](PITCH_DECK.md)**

---

## 📄 License

Released under the [MIT License](LICENSE).
