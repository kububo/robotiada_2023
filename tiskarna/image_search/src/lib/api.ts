import axios from 'axios';
import { Buffer } from 'buffer';

export class API {
  public url: string;
  public id: string = crypto.getRandomValues(new Uint32Array(10)).join('');

  constructor(url: string) {
    this.url = url.endsWith('/') ? url : url + '/';
  }

  public async getImage(): Promise<string> {
    const res = await axios.get(this.url + this.id, {
      responseType: 'arraybuffer',
    });

    const contentType = (res.headers['content-type'] satisfies string) ?? 'image/jpeg';
    const imageData = Buffer.from(res.data, 'binary').toString('base64');

    return 'data:' + contentType + ';base64,' + imageData;
  }

  public construct_url(categories: string[]): string {
    const categories_prop = categories.join(',');

    return `https://source.unsplash.com/random/?${categories_prop}`;
  }

  public async requestNewImage(url: string): Promise<void> {
    await axios.post(this.url, {
      id: this.id,
      url,
    });
  }
}
