import { test, expect } from '@playwright/test';

test('App initializes correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Loom Initialized')).toBeVisible();
});

test('Video Review page loads correctly', async ({ page }) => {
  await page.goto('/v/test_share_token_123');
  await expect(page.locator('text=Review: test_share_token_123')).toBeVisible();
  await expect(page.locator('text=Video Canvas Placeholder')).toBeVisible();
  await expect(page.locator('text=Comments')).toBeVisible();
  
  // Verify Audio Waveform presence
  const waveformBars = page.locator('.h-16 .bg-white.rounded-full');
  await expect(waveformBars).toHaveCount(100);

  // Verify Comment Ticks presence
  const commentTicks = page.locator('.bg-secondary.z-10');
  await expect(commentTicks).toHaveCount(3);

  // Verify Floating Comment Input
  const timeline = page.locator('.h-16.bg-neutral.rounded-md.relative');
  await timeline.click({ position: { x: 200, y: 10 } });
  
  const floatingInput = page.locator('text=Add Comment at');
  await expect(floatingInput).toBeVisible();
  await expect(page.locator('textarea[placeholder="Type your feedback..."]')).toBeVisible();

  await page.screenshot({ path: 'evidence.png' });
});
