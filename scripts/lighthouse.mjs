import { mkdir, writeFile } from 'node:fs/promises';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { chromium } from '@playwright/test';
import { createServer } from 'node:net';

await mkdir('tmp', { recursive: true });
const socket = createServer();
await new Promise(resolve => socket.listen(0, '127.0.0.1', resolve));
const port = socket.address().port;
await new Promise(resolve => socket.close(resolve));
const chrome = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true, args: [`--remote-debugging-port=${port}`] });
try {
  for (const preset of ['mobile', 'desktop']) {
    const result = await lighthouse(process.env.BASE_URL || 'http://127.0.0.1:3000', {
      port, output: 'json', logLevel: 'error',
      onlyCategories: ['performance', 'accessibility'],
    }, preset === 'desktop' ? desktopConfig : undefined);
    await writeFile(`tmp/lighthouse-${preset}.json`, result.report);
    console.log(preset, Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)])));
    console.log('CLS:', result.lhr.audits['cumulative-layout-shift'].numericValue);
  }
} finally { await chrome.close(); }
