import { HubConfig, ErrorResponse } from "./types.js";

export class HubHttpClient {
  private config: HubConfig;

  constructor(config: HubConfig) {
    this.config = config;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.config.apiToken}`,
      "Content-Type": "application/json",
    };

    if (this.config.hubName) {
      headers["AlbyHub-Name"] = this.config.hubName;
    }

    if (this.config.hubRegion) {
      headers["AlbyHub-Region"] = this.config.hubRegion;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const text = await response.text();
        try {
          const errorData = JSON.parse(text) as ErrorResponse;
          if (errorData && (errorData as any).message) {
            errorMessage = (errorData as any).message as string;
          } else if (text) {
            errorMessage = text;
          }
        } catch {
          if (text) errorMessage = text;
        }
      } catch {}
      throw new Error(errorMessage);
    }

    // 204 No Content
    if (response.status === 204) {
      return undefined as unknown as T;
    }

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return (await response.json()) as T;
    }
    const text = await response.text();
    return text as unknown as T;
  }

  async get<T>(
    path: string,
    query?: Record<string, string | number | boolean | undefined | null>
  ): Promise<T> {
    const url = `${this.config.baseUrl}${path}${this.buildQuery(query)}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, this.config.requestTimeout || 30000);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
        signal: controller.signal,
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timeout");
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  async post<T>(path: string, body?: object): Promise<T> {
    const url = `${this.config.baseUrl}${path}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, this.config.requestTimeout || 30000);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: this.getHeaders(),
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timeout");
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  async request<T>(
    path: string,
    options: {
      method: "DELETE" | "PATCH" | "PUT";
      body?: object;
      query?: Record<string, string | number | boolean | undefined | null>;
    }
  ): Promise<T> {
    const url = `${this.config.baseUrl}${path}${this.buildQuery(
      options.query
    )}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, this.config.requestTimeout || 30000);

    try {
      const response = await fetch(url, {
        method: options.method,
        headers: this.getHeaders(),
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timeout");
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  private buildQuery(
    query?: Record<string, string | number | boolean | undefined | null>
  ): string {
    if (!query) return "";
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null) continue;
      params.append(k, String(v));
    }
    const qs = params.toString();
    return qs ? `?${qs}` : "";
  }
}
