import { Arr, Fun, Optional } from '@ephox/katamari';
import { Editor } from 'tinymce';
import { getDescendantListsSugar, listSelector } from './Selection';
import { ListElement, Scope } from './FormatTypes';

// Selects based on desired scope and returns parent scope
const selectListScope = (
  editor: Editor,
  currList: ListElement,
  scope: Scope
): ListElement =>
  scope === 'current'
    ? currList
    : scope === 'ancestor'
    ? selectAncestors(editor, currList)
    : selectDescendants(editor, currList);

const selectAncestors = (
  editor: Editor,
  currList: ListElement
): ListElement => {
  const outerAncestor: Optional<ListElement> = Arr.last(
    editor.dom.getParents(currList, listSelector)
  );

  return outerAncestor.fold(Fun.constant(currList), (s) => {
    editor.selection.setRng(createListRange(editor, s, currList));
    return s;
  });
};

const selectDescendants = (
  editor: Editor,
  currList: ListElement
): ListElement => {
  const innerDescendantSugar = Arr.last(getDescendantListsSugar(currList));

  return innerDescendantSugar.fold(Fun.constant(currList), (s) => {
    editor.selection.setRng(createListRange(editor, currList, s.dom));
    return currList;
  });
};

const createListRange = (
  editor: Editor,
  startListNode: ListElement,
  endListNode: ListElement
): Range => {
  const range = editor.dom.createRng();
  range.setStart(startListNode, 0);
  range.setEnd(endListNode, 0);
  return range;
};

export { selectListScope };
