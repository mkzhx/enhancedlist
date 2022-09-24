import { Editor } from 'tinymce';
import { ListElement } from './FormatTypes';

const selectLists = (
  editor: Editor,
  start: ListElement,
  end: ListElement
): void => {
  // do not select range if start and end are the same (i.e. current list scope)
  if (start !== end) {
    editor.selection.setRng(createListRange(editor, start, end));
  }
};

const createListRange = (
  editor: Editor,
  start: ListElement,
  end: ListElement
): Range => {
  const range = editor.dom.createRng();
  range.setStartBefore(start);
  range.setEndAfter(end);
  return range;
};

export { selectLists };
