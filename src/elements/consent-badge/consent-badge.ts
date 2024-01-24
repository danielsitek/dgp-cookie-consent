import { consentBadge } from '@/components/consent-badge/consent-badge';
import {
  BADGE_ELEMENT_NAME,
  DIALOG_FADE_IN_DURATION,
  DIALOG_FADE_OUT_DURATION,
  EVENT_CLICK,
  INLINE_STYLES_BADGE,
} from '@/config';
import { themeService } from '@/services/theme-service';
import { fadeIn, fadeOut } from '@/utils/animation';
import { createVElement } from '@/utils/elements';
import { dispatchEventBadgeClick, dispatchEventBadgeHide, dispatchEventBadgeShow } from '@/utils/events';

let hideTimeout: ReturnType<typeof setTimeout>;

export class ConsentBadge extends HTMLElement {
  private mainElement: HTMLElement;

  private shadow: ShadowRoot;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'closed' });

    this.mainElement = consentBadge();

    this.mainElement.addEventListener(EVENT_CLICK, () => {
      dispatchEventBadgeClick();
      this.hideBadge();
    });
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
    this.shadow.append(
      createVElement<HTMLStyleElement>('style', {}, INLINE_STYLES_BADGE, themeService().themeTextContent),
    );
    this.shadow.append(this.mainElement);

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
