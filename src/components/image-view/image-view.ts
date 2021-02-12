class ImageView extends HTMLElement {
  private imageURL: string | null;
  private imageDisplay: HTMLImageElement;
  constructor() {
    super();
    this.imageURL = this.getAttribute("src");
    this.imageDisplay = document.createElement("img");
    this.imageDisplay.setAttribute("class", "image-view-enlarged");
    // this.imageDisplay.setAttribute("loading", "lazy");
    this.render();
  }
  render(): void {
    const _this = this;

    const backdrop = document.createElement("div");
    backdrop.setAttribute("class", "backdrop");

    const buttonClose = document.createElement("a");
    buttonClose.setAttribute("class", "button");
    buttonClose.setAttribute("href", "#");
    buttonClose.innerHTML = "X";
    buttonClose.addEventListener("click", function() {
      _this.close();
    });

    const style = document.createElement("style");
    style.textContent = this.getStyle();

    this.appendChild(style);
    this.appendChild(backdrop);
    backdrop.appendChild(buttonClose);
    if (this.imageURL) {
      this.imageDisplay.src = this.imageURL;
      backdrop.appendChild(this.imageDisplay);
    }
    this.hidden = true;
  }
  close(): void {
    this.imageDisplay.remove();
    this.hidden = true;
  }
  show(updateUrl?: string): void {
    if (updateUrl) {
      this.imageURL = updateUrl;
      this.imageDisplay.src = this.imageURL;
    }
    this.querySelector(".backdrop")?.appendChild(this.imageDisplay);
    this.hidden = false;
  }
  getStyle(): string {
    return `
        .backdrop {
            position: fixed;
            width: 100vw;
            height: 100vh;
            background-color: rgb(230 187 30 / 40%);
            z-index: 2;
            top: 0;
            left: 0;
        }
        .image-view-enlarged {
            position: absolute;
            background-color: #333;
            padding: 10px;
            width: auto;
            max-width: 600px;
            min-width: 300px;
            height: auto;
            max-height: 80vh;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        `;
  }
}

customElements.define("image-view", ImageView);
