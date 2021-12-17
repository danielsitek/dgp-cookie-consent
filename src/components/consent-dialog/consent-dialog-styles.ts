export const consentDialogStyles = `
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

*, *:before, *:after {
  box-sizing: inherit;
}

.consent-dialog__inner {
  display: block;
}

.consent-dialog__body {
  display: block;
  padding: 0 48px;
}

.consent-dialog__footer {
  display: flex;
  gap: 20px;
  padding: 20px;
  margin: 0;
  flex-direction: row;
  border-top: 1px solid #d0d0d0;
}

.consent-button {
  display: flex;
  font-size: 100%;
  line-height: 1.4;
  margin: 0;
  padding: 10px 20px;
  border-radius: var(--border-radius, 6px);
  border: 0 none;
  background-color: var(--color-light, #f4f4f4);
  color: var(--color-text, #000000);
  min-height: 60px;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  cursor: pointer;
  user-select: none;
  appearance: button;
  flex: 0 0 auto;
  text-decoration: none;
  font-weight: bolder;
}

.consent-button--primary {
  background-color: var(--color-primary, #f8c132);
  color: var(--color-text, #000000);
  text-transform: uppercase;
}

.consent-button__inner {
  display: flex;
}

.consent-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 0 48px;
  border-bottom: 1px solid #d0d0d0;
}

.consent-tab {
  display: flex;
  font-size: 125%;
  line-height: 1.4;
  margin: 0;
  padding: 10px 20px;
  border: 0 none;
  background-color: var(--color-white, #fff);
  color: var(--color-text, #000000);
  min-height: 65px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  appearance: button;
  position: relative;
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

.spacer {
  display: block;
  flex: 1 1 auto;
}
`;
