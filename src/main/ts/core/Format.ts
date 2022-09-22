import { Type } from '@ephox/katamari';
import { Editor } from 'tinymce';
import { selectLists } from './Select';
import { ListElement, ListFormat, Scope } from './FormatTypes';
import { styleIsUL } from './FormatUtils';
import { applyListItemPadding } from './Padding';
import { insertList, applyListStyle } from './ListCommands';
import { getScopeInformation } from './Scope';

const formatList = (
  editor: Editor,
  list: ListElement,
  format: ListFormat,
  scope: Scope
): void => {
  const isUnordered = styleIsUL(format.style);

  if (Type.isNull(list)) {
    // list not in selection
    insertList(editor, isUnordered, format);
  } else {
    // list in selection
    const scopeInfo = getScopeInformation(scope, list);
    applyListItemPadding(editor, format.padding, scopeInfo.targets);

    selectLists(editor, scopeInfo.start, scopeInfo.end);
    applyListStyle(editor, isUnordered, format.style);
  }
};

export { formatList };
