---
title: "An unavailable check is not a clean result"
description: 'Without the OFAC list, my fund tracer called a Lazarus Group address "not sanctioned". An AI audit found it. Now the tool says when a check could not run.'
publishedAt: 2026-11-24
---

At the centralized exchange where I worked, I took over a fund-tracing tool used by the risk and treasury team and extended it. We used it to check clients, KOLs (crypto influencers) and people that business development managers brought in: for example, whether someone was eligible for a campaign, or was abusing one.

That tool had no sanctions check. When I rewrote it as open source in October 2026, I added one. fund-origin-tracer downloads the OFAC SDN list, the US Treasury's sanctions list, and keeps the Ethereum-style (EVM) and TRON addresses listed in it. Every address the tool meets is checked against them.

## Three ways to get a clean answer by mistake

On 1 November 2026 I asked an AI coding agent to audit release 1.2.0. I reviewed its findings, and each one became a GitHub issue with a reproduction. Three of them were about the OFAC list. In all three, a check that did not run looked like a check that passed.

- **A maintenance page emptied the list.** The download treated any HTTP 200 response as a success. A maintenance page, a format change or a cut-off file became an empty list. It replaced the saved copy, and no warning was raised.
- **A failed start turned screening off for a day.** If the list did not load when the server started, the next try came with the next scheduled refresh, 24 hours later. And because of how the timer was built, a 24-hour refresh in fact ran every 48 hours.
- **No list meant "not sanctioned".** With no list loaded, screening answered "not sanctioned" for every address. That included `0x098b…2f96`, which OFAC lists under LAZARUS GROUP. Only the health endpoint showed that screening was off.

The third one surprised me most. Nothing crashed and nothing showed an error. The tool gave a clean answer for an address on the sanctions list, and that answer looked exactly like a real one.

## What the tool does now

- A download counts only if it is a complete SDN file with at least one EVM or TRON address. Anything else keeps the previous copy, and the server logs that the list is unavailable.
- After a failed download, the server tries again after 1, 2 and 5 minutes, then every 15 minutes. The regular refresh counts from the last download, so 24 hours now means 24 hours.
- Without any list, screening shows "Sanctions list unavailable: not screened against OFAC" instead of "no SDN match". The API answers `ofac.available: false`, and the command line exits with code 4, "incomplete".
- Release 1.6.1 applies the same rule to traces. A trace without the list raises the "Trace is incomplete" flag, the address panel shows "not screened" instead of "not sanctioned", and `fot trace` exits with code 4.

## Why the tool does not stop

When the list cannot be downloaded, the tool keeps working. If it has an older copy, it uses that copy and warns: every address that was on that copy is still caught. If it has no copy at all, it still runs, because the exchange, mixer and bridge checks do not depend on OFAC. But it marks the result "not screened", not "not sanctioned".

## Limits

- An older copy misses addresses that OFAC added after it was downloaded. The result shows when the copy was downloaded.
- The tool can only match addresses that OFAC publishes, and it keeps only EVM and TRON ones. Other wallets of a sanctioned party are not caught by this check.
- A complete SDN file that has lost addresses is still accepted: the tool does not compare a new list with the previous one.

## What I would do differently

I would write the failure case of each check first: what it returns when its source is down, and how that answer differs from a clean one. Then the working case. Here the failure case came by accident: an empty list, which gave exactly the same answer as a clean one.

The code, the fixes and their tests are on GitHub: [tarikcaykara/fund-origin-tracer](https://github.com/tarikcaykara/fund-origin-tracer).
