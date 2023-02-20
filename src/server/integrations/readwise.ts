import { env } from "~/env.mjs";

interface ClientOptions {
  auth: string;
}

class ReadwiseClient {
  private _options: ClientOptions;
  private _baseUrl = "https://readwise.io/api/v2";
  private _highlightsUrl = `${this._baseUrl}/highlights/`;

  constructor(options: ClientOptions) {
    this._options = options;
  }

  public async getHighlistList() {
    const res = await fetch(this._highlightsUrl, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${this._options.auth}`,
      },
    });

    if (res.ok) return (await res.json()) as unknown;

    switch (res.status) {
      case 401:
        // Unauthorized error

        break;

      default:
        break;
    }
  }
}

const globalForReadwise = globalThis as unknown as { readwise: ReadwiseClient };

export const readwise =
  globalForReadwise.readwise ||
  new ReadwiseClient({
    auth: env.READWISE_SECRET,
  });

if (env.NODE_ENV !== "production") globalForReadwise.readwise = readwise;
