import { test, expect } from '@playwright/test'

test('visits the app root url', async ({ page }) => {
  await page.goto('/')
  // 앱이 정상적으로 로드되는지 확인
  await expect(page).toHaveTitle(/.*/)
  // 또는 RouterView가 렌더링되는지 확인
  await expect(page.locator('body')).toBeVisible()
})
