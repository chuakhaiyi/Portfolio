import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:3000';
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
await mkdir('tmp/browser', { recursive: true });
const errors = [];
try {
  const page = await browser.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  for (const width of [360, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    assert(await page.getByRole('heading', { name: 'Louis Chua.' }).isVisible());
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `Overflow at ${width}`);
    await page.screenshot({ path: `tmp/browser/home-${width}.png`, fullPage: true });
    if (width === 1440 || width === 360) await page.screenshot({ path: `tmp/browser/hero-${width}.png` });
    await page.locator('a[href="#work"]').first().click();
    await page.waitForFunction(() => Math.abs(document.querySelector('#work').getBoundingClientRect().top - 100) < 150);
    await page.locator('.project-link[href="/work/formpilot"]').click();
    await page.waitForURL('**/work/formpilot');
    assert(await page.getByRole('heading', { name: 'My contribution' }).isVisible());
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `Case-study overflow at ${width}`);
    console.log(`PASS: home and FormPilot layout at ${width}px`);
  }
  for (const slug of ['queuesense', 'formpilot', 'ledge', 'suiroll', 'medisync', 'intelligent-cpd', 'nextchapter']) {
    const response = await page.goto(`${baseURL}/work/${slug}`, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    assert(await page.getByRole('heading', { name: 'My contribution' }).isVisible());
  }
  const pdf = await page.request.get(`${baseURL}/Louis_Chua_Khai_Yi_Resume.pdf`);
  assert.equal(pdf.status(), 200);
  assert((await pdf.body()).subarray(0, 5).toString() === '%PDF-');
  assert.equal(errors.length, 0, errors.join('\n'));
  const missing = await page.goto(`${baseURL}/this-page-does-not-exist`);
  assert.equal(missing.status(), 404);
  assert(await page.getByRole('link', { name: 'Back to home' }).isVisible());
  await page.getByRole('link', { name: 'Back to home' }).click();
  await page.waitForURL(baseURL + '/');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const button = page.locator('.hero-actions .button');
  await button.hover();
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.hero-actions .button')).transform.includes('-3'));
  await page.mouse.down();
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.hero-actions .button')).transform.startsWith('matrix(0.96'));
  // Release away from the link so this interaction check does not navigate.
  await page.mouse.move(1, 1);
  await page.mouse.up();
  const card = page.locator('.project-link[href="/work/formpilot"]');
  await card.hover();
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.cover-formpilot .chapter-art')).transform !== 'none');
  // Changing the preference must also cancel motion already in progress.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => document.getAnimations().filter(a => a.playState === 'running').length === 0);
  assert.equal(await card.locator('.chapter-art').evaluate(el => getComputedStyle(el).transform), 'none');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
  await page.evaluate(() => window.scrollTo(0, 500));
  assert.equal(await page.locator('h1').evaluate(el => getComputedStyle(el.parentElement).transform), 'none');
  const reducedAnimations = await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length);
  assert.equal(reducedAnimations, 0);
  await button.hover();
  assert.equal(await button.evaluate(el => getComputedStyle(el).transform), 'none');
  await page.goto(baseURL);
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').textContent(), 'Skip to content');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'main');
  const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 900 } });
  const staticPage = await noJS.newPage();
  await staticPage.goto(baseURL);
  assert(await staticPage.getByRole('heading', { name: 'Built to be used.' }).isVisible());
  assert(await staticPage.locator('.project-link[href="/work/ledge"]').isVisible());
  await noJS.close();
  console.log('PASS: 360–1920px, seven case studies, PDF, 404, navigation, keyboard, reduced motion, no-JS content, no console/page errors.');
} finally {
  await browser.close();
}
