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
  const waveformBars = page.locator('.h-16 .bg-white\\/80.rounded-full');
  await expect(waveformBars).toHaveCount(100);

  // Verify Comment Ticks presence
  const commentTicks = page.locator('.bg-secondary.z-10');
  await expect(commentTicks).toHaveCount(1); // the mock data has 1 comment

  // Verify Floating Comment Input - Timecode uses the new format HH:MM:SS
  const timeline = page.locator('.h-16.bg-neutral\\/50.rounded-md.relative');
  await timeline.click({ position: { x: 200, y: 10 } });
  
  const floatingInput = page.locator('text=Add Comment at');
  await expect(floatingInput).toBeVisible();
  await expect(page.locator('textarea[placeholder="Type your feedback..."]')).toBeVisible();

  // Test adding a comment properly updates the state
  const commentInput = page.locator('textarea[placeholder="Type your feedback..."]');
  await commentInput.fill('This is a test comment');
  await page.keyboard.press('Enter');

  // We should have 2 comments now
  await expect(page.locator('.bg-secondary.z-10')).toHaveCount(2);

  await page.screenshot({ path: 'evidence.png' });
});
