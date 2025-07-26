import { chromium } from 'playwright';
import { Browser } from 'playwright-core';

import { BenchmarkOptions } from '../type';

function browserPath(benchmarkOptions: BenchmarkOptions) {
  if (benchmarkOptions.chromeBinaryPath) return benchmarkOptions.chromeBinaryPath;
  if (process.platform == "darwin") {
    return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  } else if (process.platform == "linux") {
    return "/usr/bin/google-chrome";
  } else if (/^win/i.test(process.platform)) {
    // eslint-disable-next-line unicorn/prefer-string-raw
    return "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  } else {
    throw new Error("Path to Google Chrome executable must be specified");
  }
}
export async function startBrowser(benchmarkOptions: BenchmarkOptions): Promise<Browser> {
  let args = ["--window-size=1000,800", "--js-flags=--expose-gc", "--enable-benchmarking"];
  if (benchmarkOptions.headless) args.push("--headless=new");
  const browser = await chromium.launch({
    args,
    headless: false,
    // executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    executablePath: browserPath(benchmarkOptions),
  });
  return browser;
}
