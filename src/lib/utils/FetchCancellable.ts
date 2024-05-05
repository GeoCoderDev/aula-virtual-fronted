import { ObjetoConStringYNumber } from "@/interfaces/CustomObjects";

export class FetchCancelable {
  public url: string;
  public options: RequestInit;
  public controller: AbortController;
  public signal: AbortSignal;
  public queryParams: ObjetoConStringYNumber;

  constructor(url: string, options: RequestInit, queryParams: ObjetoConStringYNumber) {
    let query = "";

    if (queryParams) {
      const queryString = Object.entries(queryParams)
        .map(([key, value]) => {
          const trimmedValue = typeof value === "string" ? value.trim() : value;
          return trimmedValue !== "" ? `${key}=${trimmedValue}` : "";
        })
        .filter(Boolean)
        .join("&");

      query = `?${queryString}`;
    }

    this.url = `${url}${query}`;
    this.options = options;
    this.controller = new AbortController();
    this.signal = this.controller.signal;
    this.queryParams = queryParams;
  }

  fetch(): Promise<Response> {
    return fetch(this.url, { ...this.options, signal: this.signal });
  }

  cancel(): void {
    this.controller.abort();
  }

  compareQueryParamsWithInputContents() {}
}
