import { Editor } from 'tinymce';
import { Arr, Fun, Optional, Type } from '@ephox/katamari';
import { SugarElement, SelectorFilter } from '@ephox/sugar';
import {
  EnhancedListStyle,
  ListElement,
  typeIsEnhancedListStyle
} from './FormatTypes';

const listNames = ['OL', 'UL'];
const listSelector = listNames.join(',');

const getList = (
  editor: Editor,
  selection: Node
): HTMLUListElement | HTMLOListElement | null =>
  editor.dom.getParent(selection, listSelector);

const getSelectionStart = (editor: Editor): Element =>
  editor.selection.getStart(true);

const isLiNode = (node: Node): node is HTMLLIElement =>
  Type.isNonNullable(node) && node.nodeName === 'LI';

const getDescendantLists = (currList: ListElement): ListElement[] =>
  getDescendantListsSugar(currList).map((e) => e.dom);

const getDescendantListsSugar = (
  currList: ListElement
): SugarElement<ListElement>[] =>
  SelectorFilter.descendants(SugarElement.fromDom(currList), listSelector);

const getLiElementFromList = (list: ListElement): HTMLLIElement | null => {
  const liElementSugar: Optional<SugarElement<HTMLLIElement>> = Arr.head(
    SelectorFilter.children(SugarElement.fromDom(list), 'LI')
  );
  return liElementSugar.fold(Fun.constant(null), (s) => s.dom);
};

const getPaddingFromLIElement = (
  editor: Editor,
  listItem: NonNullable<HTMLLIElement>
): string => {
  const padding = editor.dom.getStyle(listItem, 'padding-left');
  return padding === '' ? '0px' : padding;
};

const getPaddingFromList = (editor: Editor, list: ListElement): string => {
  const listItem = getLiElementFromList(list);
  return Type.isNull(listItem)
    ? '0px'
    : getPaddingFromLIElement(editor, listItem);
};

const getStyleFromListElement = (
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
  getDescendantLists,
  getStyleFromListElement,
  getDescendantListsSugar,
  getPaddingFromList,
  getPaddingFromLIElement,
  listSelector
};
