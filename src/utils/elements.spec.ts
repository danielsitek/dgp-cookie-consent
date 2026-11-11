import { describe, expect, it } from 'vitest';
import { createVElement, htmlContent } from '@/utils/elements';

describe('createVElement', () => {
  it('renders string children as text', () => {
    const el = createVElement('span', {}, '<img src="x" onerror="alert(1)">', ' & more');

    expect(el.querySelector('img')).toBeNull();
    expect(el.textContent).toBe('<img src="x" onerror="alert(1)"> & more');
  });

  it('renders htmlContent() children as HTML', () => {
    const el = createVElement('div', {}, htmlContent('<p><strong>Hi</strong></p>'));

    expect(el.innerHTML).toBe('<p><strong>Hi</strong></p>');
  });

  it('appends element children and skips empty ones', () => {
    const el = createVElement('div', {}, createVElement('span'), undefined, null, false, true);

    expect(el.children).toHaveLength(1);
    expect(el.childNodes).toHaveLength(1);
  });
});
