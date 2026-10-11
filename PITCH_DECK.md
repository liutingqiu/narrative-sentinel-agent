# Narrative Sentinel Agent: Autonomous Multi-KOL Narrative Convergence & Evidence-Based Trading 🧠⚡

> **Submitted to DoraHacks • BLI Legal Tech Hackathon 2 — RYO-CHAN $6,000 USD Autonomous Agents Bounty**  
> **Special Project Spotlight:** Multi-KOL Narrative Agent  
> **Live Interactive Terminal:** [https://liutingqiu.github.io/narrative-sentinel-agent/](https://liutingqiu.github.io/narrative-sentinel-agent/)  
> **Open Source GitHub Repository:** [https://github.com/liutingqiu/narrative-sentinel-agent](https://github.com/liutingqiu/narrative-sentinel-agent)  
> **Lead Engineer & Author:** Tingqiu Liu (`@liutingqiu`, `tianqi689@gmail.com`)

---

## 🎯 Executive Summary & The Problem

In crypto markets, price action is driven by narratives long before it hits standard financial reporting. However:
1. **The Noise & Velocity Problem:** Traders are overwhelmed by thousands of conflicting tweets, Telegram messages, and Discord discussions. Distinguishing genuine consensus from paid shills or isolated noise is nearly impossible in real time.
2. **The "Black Box" Execution Gap:** Most algorithmic bots execute trades on technical indicators without preserving *why* a trade was made, making post-trade auditing and compliance impossible.

---

## 💡 The Solution: Narrative Sentinel Agent

**Narrative Sentinel Agent** is an autonomous AI agent that monitors 20 curated crypto creators (KOLs) across X, Telegram, and Discord, detects when independent trusted voices converge on the same narrative, and executes practice trades with a **100% transparent, repeatable cause-and-effect audit trail**.

### Key System Architecture:

### 1. Multi-KOL Ingestion Engine (20 Curated Voices)
- Continuously polls 20 curated market leaders across three tiers:
  - **Tier 1 Leaders:** Founders and core protocol architects (e.g., `@aeyakovenko`, `@mert_`, `@weremeow`, `@0xngmi`, `@hosseeb`, `@cobie`).
  - **Tier 2 Market Voices:** High-signal analysts and traders (e.g., `@blknoiz06`, `@CL207`, `@milesdeutscher`, `@MustStopMurad`).
  - **Specialist Alpha Feeds:** Dedicated research channels (e.g., `@kaito_ai`, `@toly_daily`, `@SolanaFloor`, `@SolanaDevDiscord`).
- Automatically extracts token tickers (`$SOL`, `$JUP`, `$BONK`), sentiment score ($-1.0$ to $+1.0$), conviction level (`LOW` / `MEDIUM` / `HIGH`), and urgency (`NORMAL` / `HIGH` / `BREAKING`).

### 2. Narrative Convergence Index (NCI)
- A single voice is noise; multiple independent voices converging is a signal.
- The agent clusters posts by token within sliding 4-hour windows.
- Calculates the **Narrative Convergence Index (NCI)** from 0 to 100 based on:
  - Number of unique creators mentioning the asset.
  - Weight and tier of contributing creators.
  - Weighted average bullish sentiment and urgency multipliers.
- Signals trigger only when $\text{NCI} \ge 75$ and $\text{Sentiment} \ge +0.35$.

### 3. Strict Risk Management Engine
- **Max Position Sizing:** Capped at 5.0% of bankroll ($500 per trade on $10,000 portfolio).
- **Asymmetric Risk/Reward:** Automated stop-loss at $-6.0\%$ and multi-tier take-profit at $+18.0\%$ (3:1 reward-to-risk ratio).
- **Capital Protection:** Prevents over-concentration in any single narrative or token.

### 4. Verifiable Cause-and-Effect Audit Trail
Every practice trade records a permanent, immutable reasoning log:
- **Evidence Cluster ID:** Direct pointer to the contributing post IDs.
- **Contributing KOLs:** Exact list of creators who formed the consensus.
- **Convergence Metrics:** Precise sentiment score and NCI at entry moment.
- **Applied Risk Rule:** Specific parameter bounding the trade.
- **Repeatable Rationale:** Plain-language thesis explanation for post-trade review.

---

## 🛠️ Architecture & Tech Stack

```text
narrative-sentinel-agent/
├── src/
│   ├── types.ts                   # KOL profiles, posts, clusters, trades, audit trail
│   ├── monitor/
│   │   └── kol.ts                 # 20 curated KOLs, ticker extractor, sentiment model
│   ├── intelligence/
│   │   └── convergence.ts         # Narrative Convergence Index (NCI) clustering engine
│   ├── trading/
│   │   └── paper_trader.ts        # Evidence-based paper trader & audit trail recorder
│   └── index.ts                   # Public library exports
├── tests/
│   └── agent.test.js              # 7 automated unit tests (KOLs, NCI, risk, audit trail)
├── index.html                     # Live interactive web terminal & audit trail viewer
├── PITCH_DECK.md                  # Hackathon pitch deck & submission document
└── README.md                      # Developer documentation & quickstart
```

- **Runtime:** Node.js (ESM), TypeScript 5.6
- **Test Suite:** `node:test` + `node:assert/strict` (7/7 passed, 100% green)
- **Frontend:** Pure HTML5/CSS/JS (Cyberpunk terminal aesthetic, deployed on GitHub Pages)

---

## 🔬 Test Suite Verification

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

## 🏆 Project Deliverables & Links

- **Live Interactive Terminal:** [https://liutingqiu.github.io/narrative-sentinel-agent/](https://liutingqiu.github.io/narrative-sentinel-agent/)
- **GitHub Repository:** [https://github.com/liutingqiu/narrative-sentinel-agent](https://github.com/liutingqiu/narrative-sentinel-agent)
- **DoraHacks Profile:** [https://dorahacks.io/hacker/liutingqiu](https://dorahacks.io/hacker/liutingqiu)
- **Lead Developer Contact:** Tingqiu Liu (`tianqi689@gmail.com`) / GitHub: `liutingqiu`

---
*Built with ❤️ for RYO-CHAN, Blockchain Legal Institute, and DoraHacks.*
