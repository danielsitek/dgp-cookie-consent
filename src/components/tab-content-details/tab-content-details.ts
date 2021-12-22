import { translationService } from '../../services/translation-service';
import { createDivElement } from '../../utils/elements';
import { consentDialogFooter } from '../consent-dialog-footer/consent-dialog-footer';
import { consentSection, ConsentSectionProps } from '../consent-section/consent-section';

interface TabContentDefaultProps {
  lastUpdated?: string;
  buttonRejectAll?: HTMLButtonElement;
  buttonConfirm?: HTMLButtonElement;
  sections: {
    necessary: ConsentSectionProps;
    preferences: ConsentSectionProps;
    statistics: ConsentSectionProps;
    marketing: ConsentSectionProps;
  };
}

const i18n = translationService();

const getLocalizedUpdatedDate = (): string => {
  if (!window.CookieConsent.updated.length) {
    return '';
  }

  const date = new Date(window.CookieConsent.updated);

  return new Intl.DateTimeFormat(i18n.locale).format(date);
};

export const tabContentDetails = (props: TabContentDefaultProps): HTMLDivElement => {
  const content = createDivElement();
  const body = createDivElement();
  const updated = createDivElement();

  content.classList.add('consent-tab-content');

  body.classList.add('consent-dialog__body');

  const sampleSwitch = createDivElement();
  sampleSwitch.innerHTML = 'switch';

  body.appendChild(consentSection(props.sections.necessary));

  body.appendChild(consentSection(props.sections.statistics));

  body.appendChild(consentSection(props.sections.preferences));

  body.appendChild(consentSection(props.sections.marketing));

  const buttons = [];

  if (props.buttonRejectAll) {
    buttons.push(props.buttonRejectAll);
  }

  if (props.buttonConfirm) {
    buttons.push(props.buttonConfirm);
  }

  content.appendChild(body);

  if (props.lastUpdated) {
    const updatedDate = getLocalizedUpdatedDate();

    if (updatedDate.length) {
      updated.classList.add('consent-dialog__updated');
      updated.innerHTML = props.lastUpdated.replace('%date', updatedDate);
      content.appendChild(updated);
    }
  }

  content.appendChild(
    consentDialogFooter({
      buttons,
    }),
  );

  return content;
};
