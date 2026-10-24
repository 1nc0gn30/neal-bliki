import { BLIKI_WEBGPU_MODEL_ID } from "@/lib/blikiAi";
import type { InitProgressReport, MLCEngine } from "@mlc-ai/web-llm";

let enginePromise: Promise<MLCEngine> | null = null;

export function resetBlikiEngine(): void {
  enginePromise = null;
}

/**
 * Lazy-load WebLLM and compile `BLIKI_WEBGPU_MODEL_ID` on WebGPU.
 * Weights persist in the browser Cache Storage (`cacheBackend: "cache"`).
 * Switch `cacheBackend` to `"indexeddb"` to store them in IndexedDB instead.
 */
export function loadBlikiEngine(
  onProgress: (report: InitProgressReport) => void,
): Promise<MLCEngine> {
  if (!enginePromise) {
    const pending = (async () => {
      const webllm = await import("@mlc-ai/web-llm");
      return webllm.CreateMLCEngine(BLIKI_WEBGPU_MODEL_ID, {
        appConfig: {
          model_list: webllm.prebuiltAppConfig.model_list,
          cacheBackend: "cache",
        },
        initProgressCallback: onProgress,
      });
    })();

    enginePromise = pending;
    pending.catch(() => {
      if (enginePromise === pending) enginePromise = null;
    });
  }

  return enginePromise;
}
