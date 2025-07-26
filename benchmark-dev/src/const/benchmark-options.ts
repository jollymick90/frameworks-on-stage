import { BenchmarkOptions } from '../type';

export enum BenchmarkRunner {
  PUPPETEER = "puppeteer",
  PLAYWRIGHT = "playwright",
  WEBDRIVER_CDP = "webdrivercdp",
  WEBDRIVER_AFTERFRAME = "webdriver-afterframe",
}

let config = {
  NUM_ITERATIONS_FOR_BENCHMARK_CPU: 15,
  NUM_ITERATIONS_FOR_BENCHMARK_CPU_DROP_SLOWEST_COUNT: 0, // drop the # of slowest results
  NUM_ITERATIONS_FOR_BENCHMARK_MEM: 1,
  NUM_ITERATIONS_FOR_BENCHMARK_STARTUP: 1,
  NUM_ITERATIONS_FOR_BENCHMARK_SIZE: 1,
  TIMEOUT: 60 * 1000,
  LOG_PROGRESS: true,
  LOG_DETAILS: false,
  LOG_DEBUG: false,
  LOG_TIMELINE: false,
  EXIT_ON_ERROR: null, // set from command line
  STARTUP_DURATION_FROM_EVENTLOG: true,
  STARTUP_SLEEP_DURATION: 1000,
  WRITE_RESULTS: true,
  ALLOW_BATCHING: true,
  BENCHMARK_RUNNER: BenchmarkRunner.PUPPETEER,
  PUPPETEER_WAIT_MS: 0,
};

export const defaultBenchmarkOptions: BenchmarkOptions = {
    port: 8080,
    host: "localhost",
    browser: BenchmarkRunner.PLAYWRIGHT,
    remoteDebuggingPort: 9999,
    chromePort: 9998,
    headless: false,
    // chromeBinaryPath: args.chromeBinary,
    numIterationsForCPUBenchmarks:
      config.NUM_ITERATIONS_FOR_BENCHMARK_CPU + config.NUM_ITERATIONS_FOR_BENCHMARK_CPU_DROP_SLOWEST_COUNT,
    numIterationsForMemBenchmarks: config.NUM_ITERATIONS_FOR_BENCHMARK_MEM,
    numIterationsForStartupBenchmark: config.NUM_ITERATIONS_FOR_BENCHMARK_STARTUP,
    numIterationsForSizeBenchmark: config.NUM_ITERATIONS_FOR_BENCHMARK_SIZE,
    batchSize: 1,
    resultsDirectory: "results",
    tracesDirectory: "traces",
    allowThrottling: false,
    puppeteerSleep: 0,
  }