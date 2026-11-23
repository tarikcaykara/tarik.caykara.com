---
title: "Checking a number nobody publishes"
description: "Coinalyze shows the aggregate predicted funding rate only as a chart. I first scraped it, then rebuilt the number from the API and measured how far behind the chart was."
publishedAt: 2026-11-09
---

A friend at the centralized exchange where I worked, a crypto researcher, was building his own dashboard. He needed one number for it: the aggregated predicted funding rate for BTC, ETH and SOL. He asked me for help.

The predicted funding rate is the rate the next funding payment is heading towards. Coinalyze gives it for each venue through its API. The aggregate, one number across venues, exists only as a chart on coinalyze.net, and the page itself says the chart "is not updated in real-time yet". It was the only free source of this number we found.

## First version: read it off the chart

In January 2026 I started with the Coinalyze API. I averaged the rates of each venue, but my result did not match the chart. I decided that Coinalyze must use a method it does not publish.

So in February I stopped calculating and copied the number instead. A headless browser (Chromium, driven by Playwright) opened the chart, switched it to the 1-minute interval, read the value from the legend and sent it out over a WebSocket.

It worked, but it was heavy and fragile:

- A browser ran in the background all the time.
- Every browser restart left an old Chromium process behind.
- A page reload could put the chart back on its default interval, and nothing reported it.

## Second version: compute it, then check it

In October 2026 I rewrote the service around the API. It sends requests and reads the responses; there is no browser in it. Dropping the browser took the Docker image from 1.32 GB to about 260 MB. That was the first surprise: the plain API version was smaller and made more sense than the browser one.

Computing the number myself meant getting two details right:

- **Which venues.** An early build of the rewrite averaged every stablecoin-margined ETH perpetual the API listed: 21 of them, including a prediction market and one value that was 12 days old. Now the service uses only the ten venues coinalyze.net lists for each coin and drops any rate older than 15 minutes. This also cut each update from about 57 API calls to 30. Coinalyze allows 40 a minute.
- **Which unit.** Hyperliquid and Kraken report an hourly rate; the other venues report an 8-hour rate. Every rate is converted to % per 8 hours before averaging.

Then I had to know if my number was right, and the chart was the only reference. So I kept the browser code, but as an offline check, not as part of the service. On 14 October 2026 it took 40 samples between 21:11 and 21:53 UTC and compared the chart, the per-venue table on the page and the API.

- Every venue with an API rate was within 5% of its expected ratio, so the unit conversion holds.
- For ETH and SOL, the chart matched my API average from about 165 minutes earlier. A 10-minute moving average matched worse, so the chart is delayed, not smoothed.

That was the second surprise. In January I thought Coinalyze had a hidden method. The measurement showed something simpler: for ETH and SOL, the chart was almost three hours behind.

## Limits

- Three of the ten venues (Deribit, Huobi and OKX) have no predicted rate in the API, so the average uses at most seven.
- BTC did not track well in the same window: the best match was at 81 minutes, with a larger error. I don't claim the same result for BTC.
- The check is 40 samples from one 42-minute window.
- Coinalyze has no aggregate endpoint and keeps only the last 1,500 to 2,000 points of each intraday series, so the service's own archive is the only copy of its history.

## What I would do differently

I would stay with the API from the start. When my number did not match the chart, I trusted the chart and changed the tool. I should have measured the difference first.

The code, the method and the full calibration results are on GitHub: [tarikcaykara/predicted-funding-aggregator](https://github.com/tarikcaykara/predicted-funding-aggregator).
