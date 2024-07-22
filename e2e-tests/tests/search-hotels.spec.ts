import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL)

    await page.getByRole("link", { name: "Sign In" }).click();

    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    await page.locator("[name=email]").fill("sed@gmail.com");
    await page.locator("[name=password]").fill("123123");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Sign in successful!")).toBeVisible();
});

test("should show hotel test results", async({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("Test City")
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page.getByText("Hotels found in Test City")).toBeVisible();
    await expect(page.getByText("Test Hotel")).toBeVisible();
})

test("should show hotel detail", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("Test City")
    await page.getByRole("button", { name: "Search" }).click();

    await page.getByText("Test Hotel").click();
    await expect(page).toHaveURL(/detail/);
    await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();
})

test("should book hotel", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("Test City");

    const date = new Date();
    date.setDate(date.getDate() + 3);
    const formattedDate = date.toISOString().split("T")[0];
    await page.getByPlaceholder("Check-out date").fill(formattedDate)

    await page.getByRole("button", { name: "Search" }).click();

    await page.getByText("Test Hotel").click();
    await page.getByRole("button", { name: "Book Now" }).click();

    await expect(page.getByText("Total Cost: £300.00")).toBeVisible();

    const stripeFrame = page.frameLocator("iframe").first();
    await stripeFrame.locator('[placeholder="Card number"]').fill("4242424242424242");
    await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
    await stripeFrame.locator('[placeholder="ZIP"]').fill("24224");

    await page.getByRole("button", { name: "Confirm Booking" }).click();
    await expect(page.getByText("Booking Saved!")).toBeVisible();

    await page.getByRole("link", { name: "My Bookings" }).click();
    await expect(page.getByText("Test Hotel")).toBeVisible();
})

