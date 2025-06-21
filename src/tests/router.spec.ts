import { test, expect } from '@playwright/test';
// This file contains Playwright tests for the home page of the Vue application.

test.describe('Router Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should go to the Todos page after click on Todos navigation link', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="#/todos"]');
    await expect(page).toHaveURL('#/todos');
  });
});
