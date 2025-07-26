import { defaultBenchmarkOptions } from './const/benchmark-options';
import { startBrowser } from './utils/puppeteer-access';

console.info("Hello benchmark dev");

startBrowser(defaultBenchmarkOptions)