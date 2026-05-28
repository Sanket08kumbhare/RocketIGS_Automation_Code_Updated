import { test, expect } from '../../fixtures';
import fs from 'fs';

test('Check the Assessment Report', async ({ page, loginAsAdmin }) => {
  await loginAsAdmin();
  await expect(page).toHaveURL('https://uat-rocketigs.harrier.digital/dashboard');

  await page.locator("//input[@type ='search']").fill('Globex');
  await page.getByText('Globex').click();
  await page.waitForURL('https://uat-rocketigs.harrier.digital/globex/dashboard');

  await page.getByRole('button', { name: 'Mission Planning' }).click();
  await page.locator("//a[@href='/globex/assessments']").click();
  await page.waitForURL('**/assessments');
  await page.getByText('Relationships').click();
  await page.getByRole('button', { name: 'Reports' }).click();
  await page.mouse.wheel(0, 500);

  // ── Step 1: Read Vision row from Detailed Result table ──
  const visionRow = page.locator('tr').filter({ hasText: 'Vision' });
  await visionRow.first().waitFor({ state: 'visible' });
  const tableValue      = ((await visionRow.locator('td').nth(1).textContent()) ?? '').trim();
  const tableSimplicity = ((await visionRow.locator('td').nth(2).textContent()) ?? '').trim();
  const tableOpportunity= ((await visionRow.locator('td').nth(3).textContent()) ?? '').trim();

  console.log(`Table  → Value: ${tableValue}, Simplicity: ${tableSimplicity}, Opportunity: ${tableOpportunity}`);

  // ── Step 2: Get exact scatter dot positions from DOM, hover each to find Vision ──
  await page.locator('h2', { hasText: 'Culture Matrix' }).scrollIntoViewIfNeeded();
  // Wait for the ApexCharts canvas to finish rendering after scroll
  await page.locator('.apexcharts-canvas').first().waitFor({ state: 'visible' });

  // Find the chart SVG by its axis label text, then query circle/path by SIZE only
  // (SVG el.className returns SVGAnimatedString, so class-based selectors never match)
  const dotPositions = await page.evaluate((): Array<{x: number, y: number}> => {
    const chartSvg = Array.from(document.querySelectorAll('svg'))
      .find(s => s.textContent?.includes('VALUE') && s.textContent?.includes('SIMPLICITY'));
    if (!chartSvg) return [];

    return Array.from(chartSvg.querySelectorAll('circle, path'))
      .filter(el => {
        const r = el.getBoundingClientRect();
        // Scatter dots are roughly 8–20 px and nearly square/circular
        return r.width >= 8 && r.width <= 20 && r.height >= 8 && r.height <= 20;
      })
      .map(el => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
  });

  console.log(`Scatter dots found in DOM: ${dotPositions.length}`);

  let chartValue: string | null = null;
  let chartSimplicity: string | null = null;
  let visionX = 0;
  let visionY = 0;

  // Declare tooltip locator once outside the loop for efficiency
  const tooltip = page.locator('.apexcharts-tooltip').first();

  for (const pos of dotPositions) {
    // steps:5 moves mouse gradually — needed for Recharts mousemove event detection
    await page.mouse.move(pos.x, pos.y, { steps: 5 });
    // Wait for tooltip to appear instead of a fixed delay; skip dot if none within 500 ms
    const visible = await tooltip.waitFor({ state: 'visible', timeout: 500 }).then(() => true).catch(() => false);

    if (visible) {
      const text = (await tooltip.textContent()) ?? '';
      // Use colon to match tooltip labels "Value:" not SVG axis heading "VALUE"
      const val = (text.match(/Value:\s*(\d+)/i)      ?? [])[1] ?? null;
      const sim = (text.match(/Simplicity:\s*(\d+)/i) ?? [])[1] ?? null;

      // Match Vision by its label OR by its unique value pair
      const isVision = /vision/i.test(text) || (val === tableValue && sim === tableSimplicity);
      if (isVision && val && sim) {
        visionX         = pos.x;
        visionY         = pos.y;
        chartValue      = val;
        chartSimplicity = sim;
        console.log(`Vision dot found. Chart tooltip: "${text}"`);
        break;
      }
    }
  }

  // ── Step 3: Assert chart tooltip matches table values ──
  expect(chartValue,      'Vision VALUE in chart must match table').toBe(tableValue);
  expect(chartSimplicity, 'Vision SIMPLICITY in chart must match table').toBe(tableSimplicity);

  // ── Step 4: Highlight Vision dot in chart → screenshot ──
  await page.locator('text=Culture Matrix').scrollIntoViewIfNeeded();

  if (visionX > 0 && visionY > 0) {
    await page.evaluate(({ x, y }) => {
      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed;
        left: ${x - 20}px;
        top:  ${y - 20}px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid #e53e3e;
        background: rgba(229, 62, 62, 0.25);
        z-index: 9999;
        pointer-events: none;
      `;
      document.body.appendChild(el);
    }, { x: visionX, y: visionY });
  }

  fs.mkdirSync('screenshots', { recursive: true });
  await page.screenshot({ path: 'screenshots/vision_chart_highlight.png' });
  console.log('Screenshot saved: screenshots/vision_chart_highlight.png');

  // ── Step 5: Highlight Vision row in table → screenshot ──
  await visionRow.scrollIntoViewIfNeeded();

  await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('tr'));
    const row = rows.find(r => (r as HTMLTableRowElement).cells[0]?.textContent?.trim() === 'Vision');
    if (row) {
      (row as HTMLElement).style.backgroundColor = 'rgba(229, 62, 62, 0.2)';
      (row as HTMLElement).style.outline         = '3px solid #e53e3e';
      (row as HTMLElement).style.outlineOffset   = '-2px';
    }
  });

  await page.screenshot({ path: 'screenshots/vision_table_highlight.png' });
  console.log('Screenshot saved: screenshots/vision_table_highlight.png');
});
