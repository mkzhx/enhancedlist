import { Type } from '@ephox/katamari';
import { Editor } from 'tinymce';
import { selectLists } from './Select';
import { ListElement, ListFormat, Scope } from './FormatTypes';
import { isStyleUL } from './FormatUtils';
import { applyListItemPadding } from './Padding';
import { insertList, applyListStyle } from './ListCommands';
import { getScopeInformation } from './Scope';

const formatList = (
  editor: Editor,
  list: ListElement,
  format: ListFormat,
  scope: Scope
): void => {
  const isUnordered = isStyleUL(format.style);

  if (Type.isNull(list)) {
    // list not in selection
    insertList(editor, isUnordered, format);
  } else {
    // list in selection
    const { targets, start, end } = getScopeInformation(scope, list);
    applyListItemPadding(editor, format.padding, targets);

    selectLists(editor, start, end);
    applyListStyle(editor, isUnordered, format.style);
  }
};

export { formatList };
