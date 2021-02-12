// CSS imported here will be bundled by webpack
import "./index.css";
import "./styles/footer.css";
import "./styles/header.css";
import "./styles/image-preview.css";
// You can import any components here
import "./components/image-preview/image-preview";
import "./components/image-view/image-view";
import "./components/gallery/gallery";

class DogSearchApp extends HTMLElement {
  private breedDisplay = "";
  constructor() {
    super();
  }
  loadApp(): void {
    const gallery = document.querySelector("#galleryElement");
    document.querySelector("#backToTop")?.addEventListener("click", function() {
        gallery?.scrollIntoView(true);
    });
  }
  getBreedUrl(): string {
    const firstBreed = this.breedDisplay.indexOf(",")
      ? this.breedDisplay.split(",")[0]
      : this.breedDisplay;
    let getValidBreedUrl;
    if (firstBreed.indexOf(" ")) {
      getValidBreedUrl = firstBreed
        .split(" ")
        .reverse()
        .join("/")
        .toLowerCase();
    } else {
      getValidBreedUrl = firstBreed.toLowerCase();
    }
    return getValidBreedUrl;
  }
  updateBreedDisplay(unformattedBreedName: string): void {
    this.breedDisplay = unformattedBreedName;
  }
  getBreedDisplayName(): string {
    return (
      this.breedDisplay.charAt(0).toUpperCase() + this.breedDisplay.slice(1)
    );
  }
  getUrl(): string {
      return `https://dog.ceo/api/breed/${this.getBreedUrl()}/images`;
  }
}

customElements.define("dog-search-app", DogSearchApp);
