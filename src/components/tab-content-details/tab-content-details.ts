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
  buttons?: Array<HTMLButtonElement | boolean>;
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
  const body = createDivElement(['c-d__b']);

  Object.keys(props.sections).forEach((section: string): void => {
    body.appendChild(consentSection(props.sections[section]));
  });

  return body;
};

const tabContentDetailsUpdated = (props: TabContentDefaultProps): HTMLDivElement|undefined => {
  const updated = createDivElement(['c-d__u']);
  const updatedDate = getLocalizedUpdatedDate();

  if (!updatedDate.length || !props.lastUpdated) {
    return;
  }

  updated.innerHTML = props.lastUpdated.replace('%date', updatedDate);

  return updated;
};

export const tabContentDetails = (props: TabContentDefaultProps): HTMLDivElement => {
  const content = createDivElement(['c-t-c']);
  const updated = tabContentDetailsUpdated(props);

  content.appendChild(tabContentDetailsBody(props));
  content.setAttribute('role', 'tabpanel');

  if (updated) {
    content.appendChild(updated);
  }

  content.appendChild(consentDialogFooter({
    buttons: props.buttons || [],
  }));

  return content;
};
