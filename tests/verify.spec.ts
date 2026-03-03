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
});
