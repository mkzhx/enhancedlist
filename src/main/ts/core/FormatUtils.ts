import { Arr } from '@ephox/katamari';
import { EnhancedListStyle } from './FormatTypes';

const isZeroPadding = (padding: string): boolean => padding === '0px';

const styleIsUL = (style: EnhancedListStyle): boolean =>
  Arr.contains(['disc', 'circle', 'square'], style);

export { isZeroPadding, styleIsUL };
