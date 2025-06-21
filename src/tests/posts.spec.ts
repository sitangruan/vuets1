import { test, expect } from '@playwright/test';
// This file contains Playwright tests for the home page of the Vue application.

test.describe('Posts Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the posts list', async ({ page }) => {
    await page.goto('/#/posts');
    // Check if the posts list is visible
    const postsList = page.locator('.post-list-container');
    await expect(postsList).toBeVisible();

    // Check if there are any posts displayed
    const solidRowsContainer = postsList.locator('.solid-rows-container');
    await expect(solidRowsContainer).toBeVisible();

    const postItems = solidRowsContainer.locator('.row');
    await expect(postItems).toHaveCount(100); // Assuming there are 10 posts initially
  });

  test('should display sort icon after click on the Body column header', async ({ page }) => {
    await page.goto('/#/posts');
    //Initially, the body header is not sorted, so there is no sorting icon.
    await expect(page.locator('.col-body-header .sort-icon')).toHaveCount(0);
    // Click on the body header to sort by body
    const titleHeader = page.locator('.col-body-header');
    titleHeader.click();
    // After clicking, the body header should have a sorting icon
    await expect(page.locator('.col-body-header .sort-icon')).toHaveCount(1);
  });

  test('should navigate to post details when a post is clicked', async ({ page }) => {
      await page.goto('/#/posts');

      const postsList = page.locator('.post-list-container');
      await expect(postsList).toBeVisible();

      // Check if there are any posts displayed
      const solidRowsContainer = postsList.locator('.solid-rows-container');
      await expect(solidRowsContainer).toBeVisible();

      const firstPostItem = solidRowsContainer.locator('.row').first();
      await expect(firstPostItem).toBeVisible();

      // Click on the first post item
      const postLink = firstPostItem.locator('.goto-link').first();
      await expect(postLink).toBeVisible();
      const postId = await postLink.getAttribute('data-post-id');
      await postLink.click();

      // Check if the URL contains the post ID
      await expect(page).toHaveURL(`/#/posts/${postId}`);

      // Check if the post details are visible
      const postDetails = page.locator('.post-details-container');
      await expect(postDetails).toBeVisible();
    }
  );
});
