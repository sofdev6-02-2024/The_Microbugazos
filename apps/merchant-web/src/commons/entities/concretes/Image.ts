export default class Image {
  altText: string;
  url: string;

  constructor(altText: string, url: string) {
    this.altText = altText;
    this.url = url;
  }
}
