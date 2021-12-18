export const consentDialogStyles = `
.consent-dialog-root {
  --spacing-1: 10px;
  --spacing-2: calc(var(--spacing-1) * 2);
  --spacing-3: calc(var(--spacing-1) * 3);
  --spacing-4: calc(var(--spacing-1) * 4);
  --spacing-5: calc(var(--spacing-1) * 5);
  --spacing-6: calc(var(--spacing-1) * 6);
  --spacing-7: calc(var(--spacing-1) * 7);
}

.consent-dialog {
  display: block;
  background-color: var(--color-white, #fff);
  border-radius: var(--border-radius, 6px);
  box-shadow: 0 32px 68px rgba(0, 0, 0, .3);
  box-sizing: border-box;
  color: #393939;
  font-family: sans-serif;
  font-size: 15px;
  line-height: 1.4;
  letter-spacing: .1px;
  max-height: calc(100% - 16px);
  overflow: hidden;
  position: fixed;
  text-align: initial;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  transition: all .5s ease;
  transition-property: width,max-width,top,bottom,left,opacity;
  width: calc(100% - 16px);
  z-index: 2147483631;
  max-width: 900px;
}

*::-webkit-scrollbar {
  display: none;
}

*, *:before, *:after {
  box-sizing: inherit;
}

p {
  margin-top: var(--spacing-3);
  margin-bottom: var(--spacing-3);
}

.consent-dialog__inner {
  display: block;
}

.consent-dialog__body {
  display: block;
  padding: 0 var(--spacing-2);
  overflow: hidden;
  overflow-y: auto;
}

@media (min-width: 600px) {
  .consent-dialog__body {
    padding: 0 var(--spacing-5);
  }
}

.consent-dialog__updated {
  display: block;
  padding: var(--spacing-2) var(--spacing-2);
  color: var(--color-text-light, #757575);
  font-size: 85%;
  border-top: 1px solid #d0d0d0;
}

@media (min-width: 600px) {
  .consent-dialog__updated {
    padding: var(--spacing-2) var(--spacing-5);
  }
}

.consent-dialog__footer {
  display: flex;
  gap: var(--spacing-1);
  padding: var(--spacing-2);
  margin: 0;
  flex-direction: column-reverse;
  border-top: 1px solid #d0d0d0;
  justify-content: flex-end;
}

@media (min-width: 600px) {
  .consent-dialog__footer {
    gap: var(--spacing-2);
    flex-direction: row;
  }
}

.consent-button {
  display: flex;
  font-size: 100%;
  line-height: 1.4;
  margin: 0;
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--border-radius, 6px);
  border: 0 none;
  background-color: var(--button-default__bg-color, #f4f4f4);
  color: var(--button-default__color, #242424);
  min-height: var(--spacing-6);
  align-items: center;
  font-weight: 600;
  justify-content: center;
  min-width: 200px;
  cursor: pointer;
  user-select: none;
  appearance: button;
  flex: 0 0 auto;
  text-decoration: none;
  font-weight: bolder;
  transition: .2s linear;
  transition-property: background-color, color, border, box-shadow;
}

.consent-button--default {
  background-color: var(--button-default__bg-color, #f4f4f4);
  color: var(--button-default__color, #242424);
  text-transform: var(--button-default__text-transform, none);
  border: var(--button-default__border, 1px solid #f4f4f4);
  box-shadow: var(--button-default__box-shadow, none);
}

.consent-button--default:hover {
  background-color: var(--button-default--hover__bg-color, #fff);
  color: var(--button-default--hover__color, #242424);
  border: var(--button-default--hover__border, 1px solid #d1d1d1);
  box-shadow: var(--button-default--hover__box-shadow, 0 0 17px 0 rgba(0,0,0,.1));
}

.consent-button--primary {
  background-color: var(--button-default__bg-color, #f8c132);
  color: var(--button-default__color, #242424);
  text-transform: var(--button-default__text-transform, uppercase);
  border: var(--button-default__border, 1px solid #f4f4f4);
  box-shadow: var(--button-default__box-shadow, none);
}

.consent-button--primary:hover {
  background-color: var(--color-primary-hover, #efaf08);
  color: var(--color-text, #242424);
}

.consent-button__inner {
  display: flex;
}

.consent-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-1);
  padding: 0 var(--spacing-2);
  border-bottom: 1px solid #d0d0d0;
}

@media (min-width: 600px) {
  .consent-tabs {
    gap: var(--spacing-3);
    padding: 0 var(--spacing-5);
  }
}

.consent-tab {
  display: flex;
  font-size: 110%;
  line-height: 1.3;
  margin: 0;
  padding: 0;
  border: 0 none;
  background-color: transparent;
  color: var(--color-text, #242424);
  min-height: var(--spacing-6);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  appearance: button;
  position: relative;
  transition: .2s linear;
  transition-property: background-color;
}

@media (min-width: 600px) {
  .consent-tab {
    font-size: 125%;
    padding: 0 var(--spacing-2);
    min-height: var(--spacing-7);
  }
}

.consent-tab.consent-tab--active {
  display: flex;
}

.consent-tab.consent-tab--active .consent-tab__line {
  opacity: 1;
  width: 100%;
}

.consent-tab__inner {
  display: block;
}

.consent-tab__line {
  display: block;
  height: 3px;
  position: absolute;
  bottom: -1px;
  left: 50%;
  width: 0%;
  transform: translateX(-50%);
  background-color: var(--color-primary, #f8c132);
  border-radius: var(--border-radius, 6px);
  opacity: 0;
  transition: .25s ease;
  transition-property: opacity, width;
}

.consent-tab-content {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 110px);
}

`;
