import { translationService } from '../../services/translation-service';
import { createDivElement } from '../../utils/elements';
import { consentDialogFooter } from '../consent-dialog-footer/consent-dialog-footer';
import { consentSection, ConsentSectionProps } from '../consent-section/consent-section';

interface TabContentDefaultsectionsProps {
  necessary: ConsentSectionProps;
  preferences: ConsentSectionProps;
  statistics: ConsentSectionProps;
  marketing: ConsentSectionProps;
  [key: string]: ConsentSectionProps;
}
interface TabContentDefaultProps {
  lastUpdated?: string;
  buttonRejectAll?: HTMLButtonElement;
  buttonConfirm?: HTMLButtonElement;
  sections: TabContentDefaultsectionsProps;
}

const i18n = translationService();

const getLocalizedUpdatedDate = (): string => {
  if (!window.CookieConsent.updated.length) {
    return '';
  }

  const date = new Date(window.CookieConsent.updated);

  return new Intl.DateTimeFormat(i18n.locale).format(date);
};

const tabContentDetailsBody = (props: TabContentDefaultProps): HTMLDivElement => {
  const body = createDivElement();
  body.classList.add('consent-dialog__body');

  Object.keys(props.sections).forEach((section: string): void => {
    body.appendChild(consentSection(props.sections[section]));
  });

  return body;
};

const tabContentDetailsFooter = (props: TabContentDefaultProps): HTMLDivElement => {
  const buttons = [];

  if (props.buttonRejectAll) {
    buttons.push(props.buttonRejectAll);
  }

  if (props.buttonConfirm) {
    buttons.push(props.buttonConfirm);
  }

  return consentDialogFooter({
    buttons,
  })
};

export const tabContentDetails = (props: TabContentDefaultProps): HTMLDivElement => {
  const content = createDivElement();
  content.classList.add('consent-tab-content');

  const body = tabContentDetailsBody(props);
  content.appendChild(body);

  if (props.lastUpdated) {
    const updated = createDivElement();
    const updatedDate = getLocalizedUpdatedDate();

    if (updatedDate.length) {
      updated.classList.add('consent-dialog__updated');
      updated.innerHTML = props.lastUpdated.replace('%date', updatedDate);
      content.appendChild(updated);
    }
  }

  content.appendChild(tabContentDetailsFooter(props));

  return content;
};
