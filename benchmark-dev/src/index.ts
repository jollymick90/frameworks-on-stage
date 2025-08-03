import {
  Browser,
  Page,
} from 'playwright-core';

import { defaultBenchmarkOptions } from './const/benchmark-options';
import { startBrowser } from './utils/puppeteer-access';

console.info("Hello benchmark dev");
const folderTreeUrl = `http://localhost:3000/foldertree/index.html`
const simplePageUrl = `http://localhost:3000/simplepage/index.html`
async function main() {
  await simplePageBenchmark();
  //await folderTreeBenchmark();  
}

async function simplePageBenchmark() {
  let browser: Browser | null = null;
  try {
    console.log("Starting simple-page index benchmark");
    browser = await startBrowser(defaultBenchmarkOptions);
    console.info("Browser started");
    const page = await browser.newPage();

    await page.goto(simplePageUrl, {
      waitUntil: "networkidle",
    });
    console.info(`Page ${simplePageUrl} opened`);
    const divCount = await page.evaluate(() => document.querySelectorAll('.newDiv').length);
    const newDivId = 'divAdded' + (divCount + 1);
    const startTime = performance.now();
    await page.click("#addNewDiv")
    await page.locator(`#${newDivId}`).waitFor({ state: 'visible' });
    const endTime = performance.now();
    const renderTime = endTime - startTime;

    console.log(`Render time for the new div: ${renderTime.toFixed(2)}ms`);
   const results = [];
    for (let i = 0; i < 50; i++) {
        const currentCount = await page.evaluate(() => document.querySelectorAll('.newDiv').length);
        const newId = 'divAdded' + (currentCount + 1);

        const start = performance.now();
        await page.click('#addNewDiv');
        await page.locator(`#${newId}`).waitFor({ state: 'visible' });
        const end = performance.now();
        const delta = end - start;
        console.log(`Render time for the new div: ${(delta).toFixed(2)}ms`);
        results.push(delta);
    }
    
    const average = results.reduce((a, b) => a + b, 0) / results.length;
    console.log(`Average render time over 5 runs: ${average.toFixed(2)}ms`);

    await browser.close();
  } catch (error) {
    
  }
}

async function folderTreeBenchmark() {
  let browser: Browser | null = null;
  try {
    console.info("Starting custom benchmark");
    browser = await startBrowser(defaultBenchmarkOptions);
    console.info("Browser started");
    const page = await browser.newPage();

    await page.goto(folderTreeUrl, {
      waitUntil: "networkidle",
    });
    console.info(`Page ${folderTreeUrl} opened`);
    // page.on('console', msg => {
    //   console.log("msg console", msg)
    //   if (msg.text().includes('Expand All took')) {
    //     console.log(msg.text());
    //   }
    // });
    // await initBenchmark(page);
    // await checkExpandAll(page);
    await checkAdvancedExpandAllButton(page);



    await browser.close();
  } catch (error) {
    console.error("Error start browser");
  }
}

async function checkAdvancedExpandAllButton(page: Page) {
  console.log("check regenerate")
  // await page.click('#regenerateTreeButton');
  // await page.locator('.tree-node').nth(100).waitFor();
  // Now start the timer and the action
  const startTime = await page.evaluate(() => performance.now());
  await page.click('#expandAllButton');

  // **This is the key step:**
  // Wait for all the child containers to no longer have the 'collapsed' class.
  // We can check if a deeply nested element becomes visible.
  const firstDeepestChild = `[data-node-id="..."] .node-children`; // Find a representative deep node
  await page.locator('.node-children').last().waitFor({ state: 'visible' });

  const endTime = await page.evaluate(() => performance.now());
  const duration = endTime - startTime;

  console.log(`Expand All (real render) took: ${duration.toFixed(2)}ms`);
}
async function checkExpandAll(page: Page) {
  console.info(`Starting checkExpandAll benchmark`);
  await page.click("#expandAllButton");

  await page.waitForSelector('.tree-node:not(:has(.collapsed))');
  console.info(`End checkExpandAll benchmark`);
}

async function initBenchmark(page: Page) {
  console.info(`Starting first benchmark`);
  const el = await checkElementExists(page, "#tree-container");
  if (el) {
    console.log("tree-container created")
  }


}
async function checkElementExists(page: Page, selector: string) {
  let start = Date.now();
  for (let k = 0; k < 10; k++) {
    let sel = await page.$(selector);
    if (sel) {
      await sel.dispose();
      return sel;
    }
    console.log(`checkElementExists element ${selector} not found`);
    await wait(k < 3 ? 10 : 1000);
  }
  console.log("checkElementExists waited " + (Date.now() - start) + " but no luck");
  throw `checkElementExists failed for ${selector};`;
}

const wait = (delay = 1000) => {
  console.log(`Waiting for ${delay} ms`);
  if (delay === 0) return Promise.resolve();
  else return new Promise((res) => setTimeout(res, delay));
}


main();
