import {
  BADGE_ELEMENT_NAME,
  DIALOG_FADE_IN_DURATION,
  DIALOG_FADE_OUT_DURATION,
  EVENT_CLICK,
  INLINE_STYLES_BADGE,
} from '../../config';
import { themeService } from '../../services/theme-service';
import { translationService } from '../../services/translation-service';
import { fadeIn, fadeOut } from '../../utils/animation';
import { createVElement } from '../../utils/elements';
import { dispatchEventBadgeClick, dispatchEventBadgeHide, dispatchEventBadgeShow } from '../../utils/events';

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" aria-hidden="true">
<path fill="currentColor" fill-rule="evenodd" d="M19.732 12.97a9.002 9.002 0 0 1-9.074-5.589A10.999 10.999 0 0 0 5 17c0 6.075 4.925 11 11 11s11-4.925 11-11c0-.357-.017-.709-.05-1.056a7.986 7.986 0 0 1-7.219-2.973Zm.957-2.175a7.002 7.002 0 0 1-8.662-6.176A13 13 0 0 0 3 17c0 7.179 5.82 12.999 13 12.999s13-5.82 13-13a13.126 13.126 0 0 0-.49-3.549A5.961 5.961 0 0 1 26 14a6 6 0 0 1-5.31-3.205Z" clip-rule="evenodd"/>
<path fill="currentColor" d="M14 21.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm4-4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm3-8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
<path fill="currentColor" d="M13 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm8 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-1-18a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM28 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" opacity=".5"/>
</svg>`;

let hideTimeout: ReturnType<typeof setTimeout>;

const i18n = translationService();

export class ConsentBadge extends HTMLElement {
  private mainElement: HTMLElement;

  private shadow: ShadowRoot;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'closed' });

    this.mainElement = createVElement<HTMLElement>(
      'div',
      { class: 'cb t' },
      createVElement<HTMLButtonElement>(
        'button',
        {
          class: 'cb__b',
          type: 'button',
          'aria-label': i18n.badge.label,
          title: i18n.badge.label,
        },
        createVElement<HTMLElement>('span', { class: 'cb__i' }, svgIcon),
      ),
    );

    this.mainElement.addEventListener(EVENT_CLICK, () => {
      dispatchEventBadgeClick();
      this.hideBadge();
    });
  }

  appendCode(): void {
    this.shadow.appendChild(createVElement<HTMLStyleElement>('style', {}, INLINE_STYLES_BADGE));
    this.shadow.appendChild(createVElement<HTMLStyleElement>('style', {}, themeService().themeTextContent));
    this.shadow.appendChild(this.mainElement);
  }

  hideBadge(): void {
    clearTimeout(hideTimeout);
    if (document.querySelector(BADGE_ELEMENT_NAME) === null) {
      return;
    }

    hideTimeout = setTimeout(async () => {
      if (document.querySelector(BADGE_ELEMENT_NAME) === null) {
        return;
      }
      await fadeOut(this.mainElement, DIALOG_FADE_OUT_DURATION);
      const element = document.querySelector(BADGE_ELEMENT_NAME);
      element?.remove();
    }, 100);
  }

  /**
   * Connected Lifecycle Callback
   *
   * @link <https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks>
   */
  async connectedCallback(): Promise<void> {
    this.appendCode();

    dispatchEventBadgeShow();

    await fadeIn(this.mainElement, DIALOG_FADE_IN_DURATION);
  }

  /**
   * Disconnected Lifecycle Callback.
   *
   * @link <https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks>
   */
  disconnectedCallback(): void {
    dispatchEventBadgeHide();
  }
}

customElements.define(BADGE_ELEMENT_NAME, ConsentBadge);
