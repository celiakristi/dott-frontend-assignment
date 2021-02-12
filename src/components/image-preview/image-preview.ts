class ImagePreview extends HTMLElement {
  private imageURL: string;
  private width: string | null;
  private height: string | null;
  private imagePreview: HTMLImageElement;
  constructor() {
    super();
    this.imageURL = this.getAttribute("src") || "";
    this.width = this.getAttribute("width");
    this.height = this.getAttribute("height");

    this.imagePreview = document.createElement("img");
    this.imagePreview.setAttribute("class", "image-preview");
    this.imagePreview.setAttribute("loading", "lazy");
    this.imagePreview.style.width = this.width || this.imagePreview.style.width;
    this.imagePreview.style.height = this.height || this.imagePreview.style.height;

    this.render();
  }
  render(): void {
    if (this.imageURL) {
      this.imagePreview.src = this.imageURL;
    }
    this.appendChild(this.imagePreview);
  }
  updateImage(newUrl: string, width?: string, height?: string): void {
    this.imageURL = newUrl;
    this.imagePreview.src = this.imageURL;
    this.imagePreview.style.width = width
      ? width
      : this.imagePreview.style.width;
    this.imagePreview.style.height = height
      ? height
      : this.imagePreview.style.height;
  }
  getImageEl(): HTMLImageElement {
    return this.imagePreview;
  }
  getImageUrl(): string {
    return this.imageURL;
  }
}

customElements.define("image-preview", ImagePreview);
