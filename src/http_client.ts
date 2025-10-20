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
        const errorData = (await response.json()) as ErrorResponse;
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // If JSON parsing fails, use the default error message
      }
      throw new Error(errorMessage);
    }

    return response.json() as Promise<T>;
  }

  async get<T>(path: string): Promise<T> {
    const url = `${this.config.baseUrl}${path}`;
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
}
