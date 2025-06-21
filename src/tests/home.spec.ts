import { test, expect } from '@playwright/test';
// This file contains Playwright tests for the home page of the Vue application.

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the home page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Vue/);
  });

  test('should redirect to the default url', async ({ page }) => {
    await expect(page).toHaveURL(/posts/);
  });

  test('should have a working navigation link to Sitang\'s Linkedin profile', async ({ page }) => {
    const authorLink = page.locator('a[href="https://www.linkedin.com/in/sitang-ruan/"]');
    await expect(authorLink).toBeVisible();
  });

  test('should have a working navigation link to the GitHub source codes repo', async ({ page }) => {
    const githubLink = page.locator('a[href="https://github.com/sitangruan/vuets1"]');
    await expect(githubLink).toBeVisible();
  });
});
