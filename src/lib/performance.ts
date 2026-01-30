/**
 * Performance monitoring for AI analysis: logs time-to-complete to console for real-time analytics.
 */

const PREFIX = "[SmallPrintAI]";

export function logAnalysisStart(): number {
  const start = performance.now();
  if (typeof console !== "undefined" && console.debug) {
    console.debug(`${PREFIX} AI analysis started at ${new Date().toISOString()}`);
  }
  return start;
}

export function logAnalysisComplete(startTime: number): void {
  const elapsed = performance.now() - startTime;
  if (typeof console !== "undefined" && console.info) {
    console.info(
      `${PREFIX} AI analysis time-to-complete: ${Math.round(elapsed)}ms`
    );
  }
}
