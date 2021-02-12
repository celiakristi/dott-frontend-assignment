class Backdrop extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render(): void {
        const _this = this;
        const shadow = this.attachShadow({ mode: 'open'});

        const backdrop = document.createElement('div');
        backdrop.setAttribute('class', 'backdrop');

        const buttonClose = document.createElement('a');
        buttonClose.setAttribute('class', 'button');
        buttonClose.innerHTML = 'X';
        buttonClose.addEventListener("click", function () {
            _this.closeBackdrop();
        });

        const style = document.createElement('style');
        style.textContent = this.getStyle();

        shadow.appendChild(style);
        shadow.appendChild(backdrop);
        backdrop.appendChild(buttonClose);
    }
    closeBackdrop() {
        this.textContent = null;
        this.hidden = true;
    }
    showBackdrop() {
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
            display: none;
        }
        `;
    }
}

customElements.define('backdrop-el', Backdrop);