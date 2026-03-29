import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Rolnopol/);
});

test('shows welcome heading', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Welcome to Rolnopol' })).toBeVisible();
});

test('navigation links are visible', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Alerts' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Documentation' })).toBeVisible();
});

test('login and register links are visible', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});

const statCards = [
  { label: 'Active Users',   subtitle: 'Growing Community', icon: 'fa-users',         id: 'stat-users'   },
  { label: 'Managed Farms',  subtitle: 'Digital Agriculture', icon: 'fa-tractor',      id: 'stat-farms'   },
  { label: 'Total Area (ha)', subtitle: 'Land Management',   icon: 'fa-ruler-combined', id: 'stat-area'   },
  { label: 'Total Staff',    subtitle: 'Team Management',    icon: 'fa-users-cog',     id: 'stat-staff'   },
  { label: 'Stock Animals',  subtitle: 'Livestock Count',    icon: 'fa-cow',           id: 'stat-animals' },
];

test('stat cards are visible on homepage', async ({ page }) => {
  await page.goto('/');

  const cards = page.locator('.stat-block');
  await expect(cards).toHaveCount(5);

  for (let i = 0; i < statCards.length; i++) {
    const { label, subtitle } = statCards[i];
    const card = cards.nth(i);

    await expect(card).toBeVisible();
    await expect(card.getByText(label)).toBeVisible();
    await expect(card.getByText(subtitle)).toBeVisible();
  }
});

test('stat cards have correct HTML structure and CSS', async ({ page }) => {
  await page.goto('/');

  const cards = page.locator('.stat-block');

  for (let i = 0; i < 5; i++) {
    const card = cards.nth(i);

    // element jest DIVem z klasą stat-block
    await expect(card).toHaveClass(/stat-block/);

    // style CSS
    await expect(card).toHaveCSS('border-radius', '9.6px');
    await expect(card).toHaveCSS('padding', '11.2px');
    await expect(card).toHaveCSS('background-color', 'rgba(106, 123, 94, 0.05)');

    // każdy kafelek ma ikonkę info-circle
    await expect(card.locator('i.fa-info-circle')).toBeVisible();
  }
});

test('stat cards have correct icons', async ({ page }) => {
  await page.goto('/');

  const cards = page.locator('.stat-block');

  for (let i = 0; i < statCards.length; i++) {
    const { icon } = statCards[i];
    await expect(cards.nth(i).locator(`i.${icon}`)).toBeVisible();
  }
});

test('stat cards have numeric value elements with correct IDs', async ({ page }) => {
  await page.goto('/');

  for (const { id } of statCards) {
    const valueEl = page.locator(`#${id}`);
    await expect(valueEl).toBeVisible();

    // wartość nie jest pusta
    const text = await valueEl.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  }
});
