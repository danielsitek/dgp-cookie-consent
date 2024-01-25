import { translationService } from '@/services/translation-service';
import { ConsentTab } from './consent-tab';

const i18n = translationService();

export const tabButtonAgree = new ConsentTab({
  label: i18n.tabAgree.title,
  active: true,
});

export const tabButtonAgreeEl = tabButtonAgree.render();

export const tabButtonDetails = new ConsentTab({
  label: i18n.tabDetail.title,
});

export const tabButtonDetailsEl = tabButtonDetails.render();

export const tabButtonAbout = new ConsentTab({
  label: i18n.tabAbout.title,
});

export const tabButtonAboutEl = tabButtonAbout.render();
