

export interface BenchmarkOptions {
    host: string;
    port: number;
    headless?: boolean;
    chromeBinaryPath?: string;
    remoteDebuggingPort: number;
    chromePort: number;
    batchSize: number;
    browser: string;
    numIterationsForCPUBenchmarks: number;
    numIterationsForMemBenchmarks: number;
    numIterationsForStartupBenchmark: number;
    numIterationsForSizeBenchmark: number;

    allowThrottling: boolean;
    resultsDirectory: string;
    tracesDirectory: string;
    puppeteerSleep?: number;
}