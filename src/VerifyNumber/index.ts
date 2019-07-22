import styles from './style.css';

interface IState {
  inputs: Array<HTMLInputElement>;
  errorNode: HTMLElement | null;
  inputEventListeners: Array<(e: Event) => any>;
  keyDownEventListeners: Array<(e: Event) => any>;
}

export default class VerifyNumber extends HTMLElement {
  state: IState = {
    inputs: [],
    errorNode: null,
    inputEventListeners: [],
    keyDownEventListeners: [],
  };

  root: HTMLElement | null;
  templ: HTMLTemplateElement;
  container: HTMLElement;

  disconnectedCallback() {
    this.state.inputs.forEach((el, index) => {
      el.removeEventListener('input', this.state.inputEventListeners[index]);
      el.removeEventListener(
        'keydown',
        this.state.keyDownEventListeners[index]
      );
    });
  }

  static get observedAttributes(): Array<string> {
    return ['mask', 'errortext', 'iserror', 'value'];
  }

  get value(): string {
    return this.state.inputs
      .map((el: HTMLInputElement) => el.value[0] || '')
      .join(',');
  }

  set value(val: string) {
    this.setAttribute('value', val);
  }

  get mask(): string | null {
    return this.getAttribute('mask') || '';
  }

  set mask(val: string | null) {
    this.setAttribute('mask', val || '');
  }

  get errortext(): string | null {
    return this.getAttribute('errortext');
  }

  set errortext(val: string | null) {
    this.setAttribute('errortext', val || '');
  }

  get iserror(): string | null {
    return this.getAttribute('iserror');
  }

  set iserror(val: string | null) {
    this.setAttribute('iserror', val || '');
  }

  createTextNode(text: string): Node {
    return document.createTextNode(text).cloneNode(true);
  }

  addInputsError(): void {
    this.state.inputs.forEach((el: HTMLInputElement) =>
      el.classList.add('verify-number__input_error')
    );
  }

  removeInputsError(): void {
    this.state.inputs.forEach((el: HTMLInputElement) =>
      el.classList.remove('verify-number__input_error')
    );
  }

  createInput(position: number) {
    const input: HTMLInputElement = document.createElement('input');
    this.state.inputs[position] = input;
    input.classList.add('verify-number__input');
    input.setAttribute('placeholder', '_');

    const handleInput = (e: Event) => {
      e.stopPropagation();
      this.dispatchEvent(new Event('input'));

      const next: HTMLInputElement = this.state.inputs[position + 1];
      if (next) {
        next.focus();
        next.setSelectionRange(0, 0);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Backspace') {
        e.stopPropagation();
        e.preventDefault();
        input.value = '';

        if (position !== 0) {
          this.state.inputs[position - 1].focus();
        }
      }

      if (e.code === 'ArrowRight') {
        const next: HTMLInputElement = this.state.inputs[position + 1];
        if (next) {
          next.focus();
          next.setSelectionRange(0, 0);
        }
      }

      if (e.code === 'ArrowLeft') {
        if (position !== 0) {
          this.state.inputs[position - 1].focus();
        }
      }
    };

    input.addEventListener('input', handleInput);
    input.addEventListener('keydown', handleKeyDown);
    this.state.inputEventListeners.push(handleInput);
    this.state.keyDownEventListeners.push(handleKeyDown);

    return this.state.inputs[position];
  }

  createBox(text: string): HTMLElement {
    const box: HTMLElement = document.createElement('div');
    box.classList.add('verify-number__box');
    box.textContent = text;

    return box;
  }

  createErrorText(): HTMLElement {
    this.state.errorNode = document.createElement('div');
    this.state.errorNode.classList.add('verify-number__error');
    this.state.errorNode.textContent = this.errortext;

    return this.state.errorNode;
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.classList.add('verify-number__inputs-container');
  }

  get template(): HTMLTemplateElement {
    if (this.templ) {
      return this.templ;
    }

    this.templ = document.createElement('template');
    const templateStyles: HTMLStyleElement = document.createElement('style');
    templateStyles.innerHTML = styles;
    const templateBody: HTMLElement = document.createElement('div');
    templateBody.classList.add('verify-number');
    this.templ.content.appendChild(templateStyles);
    this.templ.content.appendChild(templateBody);

    return this.templ;
  }

  connectedCallback() {
    const shadowRoot: ShadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.template.content.cloneNode(true));

    this.createContainer();
    this.root = shadowRoot.querySelector('.verify-number');

    if (this.root) {
      this.root.appendChild(this.container);
    }

    if (!this.errortext) {
      this.errortext = 'Неправильный пароль';
    }
    if (!this.iserror) {
      this.iserror = 'false';
    }
    if (!this.mask) {
      this.mask = '';
    }
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (name === 'mask' && !!newValue && !oldValue) {
      this.render();
    }

    if (name === 'iserror' && this.state.errorNode) {
      if (newValue === 'true') {
        this.state.errorNode.classList.add('verify-number__error_active');
        this.addInputsError();
      } else {
        this.state.errorNode.classList.remove('verify-number__error_active');
        this.removeInputsError();
      }
    }

    if (name === 'value') {
      const values = newValue.split(',');
      for (let i = 0; i < this.state.inputs.length; i++) {
        this.state.inputs[i].value = values[i] || '';
      }
    }

    if (name === 'errortext' && this.state.errorNode) {
      this.state.errorNode.textContent = newValue;
    }
  }

  render() {
    let inputsNumber: number = 0;

    (this.mask || '').split('').forEach((el: string) => {
      if (/[\dX\*]/.test(el)) {
        this.container.appendChild(this.createBox(el === '*' ? '●' : el));
      } else if (el === 'I') {
        this.container.appendChild(this.createInput(inputsNumber++));
      } else {
        this.container.appendChild(this.createTextNode(el));
      }
    });
    if (this.root) {
      this.root.appendChild(this.createErrorText());
    }
  }
}
