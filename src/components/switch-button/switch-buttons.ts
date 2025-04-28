import { switchButton } from './switch-button';

export const switchNecessary = switchButton({
  checked: true,
  disabled: true,
  labeledBy: 'necessary',
});

export const switchPreferences = switchButton({
  labeledBy: 'preferences',
});

export const switchStatistics = switchButton({
  labeledBy: 'statistics',
});

export const switchMarketing = switchButton({
  labeledBy: 'marketing',
});
