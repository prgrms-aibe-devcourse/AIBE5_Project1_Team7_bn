export type HttpClient = {
  postJson<TResponse>(url: string, body: unknown, headers?: Record<string, string>): Promise<TResponse>;
};

export class FetchHttpClient implements HttpClient {
  async postJson<TResponse>(url: string, body: unknown, headers?: Record<string, string>): Promise<TResponse> {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(headers ?? {}),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
    }

    return (await res.json()) as TResponse;
  }
}
