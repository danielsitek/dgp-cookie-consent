import { switchButton } from './switch-button';

export const switchNecessary = switchButton({
  checked: true,
  disabled: true,
});

export const switchPreferences = switchButton();

export const switchStatistics = switchButton();

export const switchMarketing = switchButton();
