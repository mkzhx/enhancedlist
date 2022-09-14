import { Arr } from '@ephox/katamari';

const enhancedListStyles = [
  'disc',
  'circle',
  'square',
  'decimal',
  'lower-alpha',
  'lower-greek',
  'lower-roman',
  'upper-alpha',
  'upper-roman'
];
type EnhancedListStyle = typeof enhancedListStyles[number];

const typeIsEnhancedListStyle = (str: string): boolean =>
  Arr.contains(enhancedListStyles, str);

type ListFormat = {
  style: EnhancedListStyle;
  padding: string;
};

const scopes = ['current', 'ancestor', 'descendant'];
type Scope = typeof scopes[number];

type ListElement = HTMLUListElement | HTMLOListElement;

export {
  enhancedListStyles,
  EnhancedListStyle,
  ListFormat,
  ListElement,
  scopes,
  Scope,
  typeIsEnhancedListStyle,
};
