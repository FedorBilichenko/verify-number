import styles from './style.css';

export default class Index extends HTMLElement {
  constructor() {
    super();
    this.state = {
      inputs: [],
      errorNode: null,
    };
    this.inputEventListeners = [];
    this.keyDownEventListeners = [];
  }

  disconnectedCallback() {
    this.state.inputs.forEach((el, index) => {
      el.removeEventListener('input', this.inputEventListeners[index]);
      el.removeEventListener('keydown', this.keyDownEventListeners[index]);
    })
  }

  static get observedAttributes() {
    return ['mask', 'errortext', 'iserror', 'value'];
  }

  get value() {
    return this.state.inputs.map(el => el.value[0] || '').join(',');
  }

  set value(val) {
    this.setAttribute('value', val);
  }

  get mask() {
    return this.getAttribute('mask');
  }

  set mask(val) {
    this.setAttribute('mask', val);
  }

  get errortext() {
    return this.getAttribute('errortext')
  }

  set errortext(val) {
    this.setAttribute('errortext', val);
  }

  get iserror() {
    return this.getAttribute('iserror');
  }

  set iserror(val) {
    this.setAttribute('iserror', val);
  }

  createTextNode(text) {
    return document.createTextNode(text).cloneNode(true);
  }

  addInputsError () {
    this.state.inputs.forEach(el => el.classList.add('verify-number__input_error'));
  }

  removeInputsError () {
    this.state.inputs.forEach(el => el.classList.remove('verify-number__input_error'));
  }

  createInput(position) {
    const input = document.createElement('input');
    this.state.inputs[position] = input;
    input.classList.add('verify-number__input');
    input.setAttribute('placeholder', '_');

    const handleInput = (e) => {
      e.stopPropagation();
      this.dispatchEvent(new Event('input'));

      const next = this.state.inputs[position + 1];
      if (next) {
        next.focus();
        next.setSelectionRange(0,0);
      }
    };

    const handleKeyDown = (e) => {
      if (e.code === 'Backspace') {
        console.log('backspace');
        e.stopPropagation();
        e.preventDefault();
        input.value = '';

        if (position !== 0) {
          this.state.inputs[position - 1].focus();
        }
      }

      if (e.code === 'ArrowRight') {
        const next = this.state.inputs[position + 1];
        if (next) {
          next.focus();
          next.setSelectionRange(0,0);
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
    this.inputEventListeners.push(handleInput);
    this.keyDownEventListeners.push(handleKeyDown);

    return this.state.inputs[position];
  }

  createBox(text) {
    const box = document.createElement('div');
    box.classList.add('verify-number__box');
    box.textContent = text;

    return box;
  }

  createErrorText() {
    this.state.errorNode = document.createElement('div');
    this.state.errorNode.classList.add('verify-number__error');
    this.state.errorNode.textContent = this.errortext;

    return this.state.errorNode;
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.classList.add('verify-number__inputs-container');
  }

  get template() {
    if (this._template) {
      return this._template;
    } else {
      this._template = document.createElement('template');
      let templateStyles = document.createElement('style');
      templateStyles.innerHTML = styles;
      const templateBody = document.createElement('div');
      templateBody.classList.add('verify-number');
      this._template.content.appendChild(templateStyles);
      this._template.content.appendChild(templateBody);

      return this._template;
    }

  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(this.template.content.cloneNode(true));

    this.createContainer();
    this.root = this.shadowRoot.querySelector('.verify-number');
    this.root.appendChild(this.container);
    console.log(1);

    if (!this.errortext) {
      this.errortext = 'default';
    }
    if (!this.iserror) {
      this.iserror = false;
    }
    if (!this.mask) {
      this.mask = '';
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'mask' && !!newValue && !oldValue) {
      console.log(2);

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
    console.log('render', 3);
    let inputsNumber = 0;
    this.getAttribute('mask').split('').forEach(el => {
      if (/[\dX\*]/.test(el)) {
        this.container.appendChild(this.createBox(el === '*' ? '●' : el));
      } else if (el === 'I') {
        this.container.appendChild(this.createInput(inputsNumber++));
      } else {
        this.container.appendChild(this.createTextNode(el));
      }
    });

    this.root.appendChild(this.createErrorText())
  }
}
