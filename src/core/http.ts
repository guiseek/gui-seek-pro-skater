export class Http {
  async get<T>(url: string): Promise<T> {
    return fetch(url).then((res) => res.json())
  }
}
