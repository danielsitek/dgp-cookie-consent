import { translationService } from '@/services/translation-service';
import { createVElement } from '@/utils/elements';
import { consentDialogFooter } from '@/components/consent-dialog-footer/consent-dialog-footer';
import { consentSection, type ConsentSectionProps } from '@/components/consent-section/consent-section';

export interface TabContentDefaultSectionsProps {
  necessary: ConsentSectionProps;
  preferences: ConsentSectionProps;
  statistics: ConsentSectionProps;
  marketing: ConsentSectionProps;
  [key: string]: ConsentSectionProps;
}
export interface TabContentDetailsProps {
  lastUpdated?: string;
  buttonRejectAll?: HTMLButtonElement;
  buttonConfirm?: HTMLButtonElement;
  sections: TabContentDefaultSectionsProps;
  buttons?: Array<HTMLButtonElement | boolean>;
}

const i18n = translationService();

const getLocalizedUpdatedDate = (): string => {
  if (!window.CookieConsent?.updated.length) {
    return '';
  }

  const date = new Date(window.CookieConsent.updated);

  return new Intl.DateTimeFormat(i18n.locale).format(date).replaceAll(/\s+/g, '&nbsp;');
};

const tabContentDetailsBody = (props: TabContentDetailsProps): HTMLDivElement => {
  const sections: HTMLDivElement[] = [];

  Object.keys(props.sections).forEach((section: string): void => {
    sections.push(consentSection(props.sections[section]));
  });

  return createVElement<HTMLDivElement>('div', { class: 'c-d__b' }, ...sections);
};

const tabContentDetailsUpdated = (props: TabContentDetailsProps): HTMLDivElement | undefined => {
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

export const tabContentDetails = (props: TabContentDetailsProps): HTMLDivElement => {
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
