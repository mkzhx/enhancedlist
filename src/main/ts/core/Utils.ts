import { Arr } from '@ephox/katamari';
import { SugarElement } from '@ephox/sugar';

const getLastOrDefault = <T>(list: T[], defVal: T): T =>
  Arr.last(list).getOr(defVal);

const getDomElements = <T>(list: SugarElement<T>[]): T[] =>
  Arr.map(list, (e) => e.dom);

export { getLastOrDefault, getDomElements };
