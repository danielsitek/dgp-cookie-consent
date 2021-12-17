interface ComponentProps {
  modifier?: string
}

interface ConsentTabsProps extends ComponentProps {
  tabs: any[]
}

export const consentTabs = (props: ConsentTabsProps) => {
  const element = document.createElement('div');
  element.classList.add('consent-tabs');

  props.tabs.forEach((tabElement) => {
    element.appendChild(tabElement);
  });

  if (props.modifier) {
    props.modifier.split(' ').forEach((modifier) => {
      element.classList.add(modifier);
    });
  }

  return element;
}
