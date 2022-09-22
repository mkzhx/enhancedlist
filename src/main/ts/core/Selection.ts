import { Editor } from 'tinymce';
import { Type } from '@ephox/katamari';
import { SugarElement, SelectorFilter } from '@ephox/sugar';
import {
  EnhancedListStyle,
  ListElement,
  typeIsEnhancedListStyle
} from './FormatTypes';
import { getDomElements } from './Utils';

const listNames = ['OL', 'UL'];
const listSelector = listNames.join(',');

const getList = (editor: Editor, selection: Node): ListElement | null =>
  editor.dom.getParent(selection, listSelector);

const getSelectionStart = (editor: Editor): Element =>
  editor.selection.getStart(true);

const isLiNode = (node: Node): node is HTMLLIElement =>
  Type.isNonNullable(node) && node.nodeName === 'LI';

const getLiElementsFromList = (list: ListElement): HTMLLIElement[] =>
  getDomElements(SelectorFilter.children(SugarElement.fromDom(list), 'LI'));

const getPaddingFromLIElement = (
  editor: Editor,
  listItem: NonNullable<HTMLLIElement>
): string => {
  const padding = editor.dom.getStyle(listItem, 'padding-left');
  return padding === '' ? '0px' : padding;
};

const getStyleFromList = (
  editor: Editor,
  list: NonNullable<HTMLUListElement | HTMLOListElement>
): EnhancedListStyle => {
  const listStyle: EnhancedListStyle = editor.dom.getStyle(
    list,
    'list-style-type'
  );
  return typeIsEnhancedListStyle(listStyle) ? listStyle : 'disc';
};

export {
  getList,
  getSelectionStart,
  isLiNode,
  getStyleFromList,
  getPaddingFromLIElement,
  getLiElementsFromList,
  listSelector
};
