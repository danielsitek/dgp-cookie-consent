import { createElement } from '../../utils/elements';

interface ComponentProps {
  modifier?: string;
}

interface ConsentTabProps extends ComponentProps {
  label: string;
  active?: boolean;
}

export class ConsentTab {
  private props: ConsentTabProps;

  private element: HTMLButtonElement;

  private activeCallBack?: () => void;

  constructor(props: ConsentTabProps, activeCb?: () => void) {
    this.props = props;
    this.element = createElement('button') as HTMLButtonElement;
    this.element.classList.add('c-t');
    this.activeCallBack = activeCb;

    this.element.innerHTML = `
      <span class="c-t__i">${props.label}</span>
      <div class="c-t__l"></div>
    `;

    if (this.props.modifier) {
      const modifiers = this.props.modifier.split(' ');
      this.element.classList.add(...modifiers);
    }

    if (this.props.active) {
      this.active = this.props.active;
    }

    this.initListeners();
  }

  set active(value: boolean) {
    this.element.parentElement?.querySelectorAll('button').forEach((el) => {
      el.classList.remove('c-t--a');
    });

    if (value) {
      this.element.classList.add('c-t--a');
    } else {
      this.element.classList.remove('c-t--a');
    }

    if (this.active) {
      this.activeCallBack?.apply(null);
    }
  }

  get active(): boolean {
    return this.element.classList.contains('c-t--a');
  }

  private initListeners() {
    this.element.addEventListener('click', () => {
      this.active = !this.active;
    });
  }

  public render(): HTMLButtonElement {
    return this.element;
  }
}
