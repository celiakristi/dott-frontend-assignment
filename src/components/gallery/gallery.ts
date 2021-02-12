class Gallery extends HTMLElement {
    private imageUrlArray: string[];
    private galleryContainer: HTMLElement;
    private galleryPerColumn: HTMLElement[] = [];
    private imageWidth: number = 200;
    private numberOfColumn: number = 1;
    constructor() {
        super();
        this.imageUrlArray = [];
        this.galleryContainer = document.createElement('div');
        this.galleryContainer.setAttribute('class', 'gallery-container d-flex flx-direction-row justify-content-space-between');
        this.initializeRequirement();
        this.render();
    }
    initializeRequirement() {
        if(this.parentElement?.offsetWidth && this.parentElement?.offsetWidth > this.imageWidth) {
            this.numberOfColumn = Math.floor(this.parentElement?.offsetWidth / this.imageWidth);
            return;
        }
        this.numberOfColumn = 1;
    }
    render(): void {
        this.innerHTML = "";
        this.galleryContainer.innerHTML = "";
        this.appendChild(this.galleryContainer);

        const style = document.createElement("style");
        style.textContent = this.getStyle();
        this.appendChild(style);

        if (this.imageUrlArray?.length) {
            this.generateColumn();
            this.generateImageElements();
        } else {
            this.getEmptyGalleryMessage();
        }
        
    }
    generateColumn(): void {
        for(let i = 1; i <= this.numberOfColumn; i++) {
            const columnGallery = document.createElement('div');
            columnGallery.setAttribute('class', 'gallery-column d-flex flx-direction-col');
            columnGallery.setAttribute('id', `galleryCol${i}`);
            this.galleryPerColumn.push(columnGallery);
            this.galleryContainer.appendChild(columnGallery);
        }
    }
    generateImageElements(): void {
        let index = 0;
        let stop = false;
        do {
            const url = this.imageUrlArray[0];
            const imagePreview = document.createElement('img');
            imagePreview.setAttribute('src', url);
            imagePreview.setAttribute('class', 'image-preview');
            imagePreview.setAttribute('loading', 'lazy');
            const whichColumn = (index + 1) % this.numberOfColumn;
            this.galleryPerColumn[whichColumn].appendChild(imagePreview.cloneNode(true));
            this.imageUrlArray.shift();
            index++;
        } while (this.imageUrlArray?.length && !stop)
    }
    getEmptyGalleryMessage(): void {
        const emptyGallery = document.createElement('span');
        emptyGallery.setAttribute('class', 'gallery-no-data');
        emptyGallery.textContent = "No data available";
        this.galleryContainer.appendChild(emptyGallery);
    }
    updateData(newData: string[]): void {
        this.imageUrlArray = newData;
        this.render();
    }
    fetchData(url: string): Promise<boolean> {
        return fetch(url)
          .then((result) => result.json())
          .then((data) => {
            if (data.status === "success") {
                this.updateData(data.message);
              return true;
            }
            this.updateData([]);
            return false;
          }).catch(() => {
            this.updateData([]);
            return false;
          });
      }
    getStyle(): string {
        return `
        gallery-preview {
            width: 100%;
            height: auto;
            min-width: 300px;
        }
        .gallery-container {
            width: 100%;
            height: 100%;
            flex-wrap: wrap;
        }
        .gallery-no-data {
            margin: 0 auto;
        }
        .gallery-column {
            width: auto;
            height: 100%;
        }
        `;
    }
}

customElements.define('gallery-preview', Gallery);