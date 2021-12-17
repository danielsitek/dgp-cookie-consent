import { consentButton } from '../consent-button/consent-button';
import { consentDialogFooter } from '../consent-dialog-footer/consent-dialog-footer';
import { ConsentTab } from '../consent-tab/consent-tab';
import { consentTabs } from '../consent-tabs/consent-tabs';
import { consentDialogStyles } from './consent-dialog-styles';

export class ConsentDialog extends HTMLElement {

  private componentStyle: HTMLStyleElement;

  private mainElement: HTMLDivElement;

  private innerElement: HTMLDivElement;

  private shadow: ShadowRoot;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'closed' });

    this.componentStyle = document.createElement('style');
    this.mainElement = document.createElement('div');
    this.innerElement = document.createElement('div');

    this.main();
  }

  initStyles() {
    this.componentStyle.textContent = consentDialogStyles;

    const buttonAgree = new ConsentTab({
      label: 'Souhlas',
      active: true,
    }, () => {
      console.log('Souhlas je aktivní');
    }).render();

    const buttonDetails = new ConsentTab({
      label: 'Detaily',
    }, () => {
      console.log('Detaily je aktivní');
    }).render();

    const buttonAbout = new ConsentTab({
      label: 'O aplikaci',
    }, () => {
      console.log('O aplikaci je aktivní');
    }).render();

    this.mainElement.classList.add('consent-dialog');
    this.mainElement.appendChild(consentTabs({
      tabs: [
        buttonAgree,
        buttonDetails,
        buttonAbout,
      ]
    }));

    this.mainElement.appendChild(this.innerElement);

    this.mainElement.appendChild(consentDialogFooter({
      buttons: [
        consentButton({
          label: 'Upravit',
          variant: 'default',
        }),
        consentButton({
          label: 'Povolit vše',
          variant: 'primary',
        }),
      ]
    }));

    this.innerElement.classList.add('consent-dialog__inner');
    this.innerElement.innerHTML = `
      <p>We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services.</p>
    `;
  }

  appendCode() {
    this.shadow.appendChild(this.componentStyle);
    this.shadow.appendChild(this.mainElement);
  }

  main() {
    this.initStyles();
    this.appendCode();
  }
}

customElements.define('consent-dialog', ConsentDialog);
