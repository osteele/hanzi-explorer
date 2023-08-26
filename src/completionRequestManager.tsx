import { useEffect, useRef } from "react";
import {
  Completions,
  GetCompletionsParams,
  getCompletions,
} from "./openAIClient";

/**
 * Provides a hook for creating and managing completion request managers. A
 * completion request manager encapsulates the logic of sending requests to an
 * OpenAI API endpoint, modifying query parameters, and handling errors.
 *
 * @param apiKey The API key to use when making requests. If `null`, indicates
 * that no authentication should be used.
 * @returns The active `CompletionRequestManager` object or `null` if no API key
 * was provided.
 */
export function useCompletionRequestManager(apiKey: string | null) {
  const completionRequestManagerRef = useRef<CompletionRequestManager | null>(
    null
  );

  useEffect(() => {
    if (completionRequestManagerRef.current) {
      completionRequestManagerRef.current.cancelAllPendingRequests();
    }
    completionRequestManagerRef.current = apiKey
      ? new CompletionRequestManager(apiKey)
      : null;
  }, [apiKey]);

  return completionRequestManagerRef.current;
}

export class CompletionRequestManager {
  private pendingControllers: AbortController[] = [];

  constructor(private apiKey: string) {}

  public async getCompletions(
    props: GetCompletionsParams & { abortPreviousRequests?: boolean }
  ): Promise<{ data: { choices: Completions } }> {
    const { apiKey } = this;
    const { abortPreviousRequests, ...params } = props;
    if (abortPreviousRequests) {
      await this.cancelAllPendingRequests();
    }

    const controller = new AbortController();
    const { signal } = controller;
    try {
      this.pendingControllers.push(controller);
      return await getCompletions({ signal, ...params, apiKey });
    } finally {
      const ix = this.pendingControllers.indexOf(controller);
      if (ix >= 0) {
        this.pendingControllers.splice(ix, 1);
      }
    }
  }

  public async cancelAllPendingRequests(): Promise<void> {
    for (const controller of this.pendingControllers) {
      controller.abort();
    }
  }
}
