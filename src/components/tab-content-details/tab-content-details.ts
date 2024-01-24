import { translationService } from '@/services/translation-service';
import { createVElement } from '@/utils/elements';
import { consentDialogFooter } from '@/components/consent-dialog-footer/consent-dialog-footer';
import { consentSection, ConsentSectionProps } from '@/components/consent-section/consent-section';

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
  const sections: HTMLDivElement[] = [];

  Object.keys(props.sections).forEach((section: string): void => {
    sections.push(consentSection(props.sections[section]));
  });

  return createVElement<HTMLDivElement>('div', { class: 'c-d__b' }, ...sections);
};

const tabContentDetailsUpdated = (props: TabContentDefaultProps): HTMLDivElement | undefined => {
  const updatedDate = getLocalizedUpdatedDate();

  if (!updatedDate.length || !props.lastUpdated) {
    return;
  }

  return createVElement<HTMLDivElement>(
    'div',
    {
      class: 'c-d__u',
    },
    props.lastUpdated.replace('%date', updatedDate),
  );
};

export const tabContentDetails = (props: TabContentDefaultProps): HTMLDivElement => {
  return createVElement<HTMLDivElement>(
    'div',
    {
      class: 'c-t-c',
      role: 'tabpanel',
    },
    tabContentDetailsBody(props),
    tabContentDetailsUpdated(props),
    consentDialogFooter({
      buttons: props.buttons || [],
    }),
  );
};
