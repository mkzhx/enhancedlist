import { Arr } from '@ephox/katamari';
import { EnhancedListStyle } from './FormatTypes';

const isPaddingZero = (padding: string): boolean => padding === '0px';

const isStyleUL = (style: EnhancedListStyle): boolean =>
  Arr.contains(['disc', 'circle', 'square'], style);

export { isPaddingZero, isStyleUL };
