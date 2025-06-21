import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  testMatch: '**/*.spec.ts',
  timeout: 30000, // Set a global timeout for tests
  use: {
    baseURL: "http://localhost:57660", // Base URL for the application under test
    headless: true, // Run tests in headless mode
    screenshot: "only-on-failure", // Take screenshots only on test failure
    video: "retain-on-failure", // Record video only on test failure
    viewport: { width: 1280, height: 720 }, // Set viewport size
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
  },
  webServer: {
    command: "npm run dev", // Command to start the application
    port: 57660, // Port on which the application is running
    reuseExistingServer: true, // Reuse existing server in CI environments
  }
});
