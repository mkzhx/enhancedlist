import { Arr, Type } from '@ephox/katamari';
import { Editor } from 'tinymce';
import { selectListScope } from './Select';
import { getDescendantLists, getPaddingFromList } from './Selection';
import {
  EnhancedListStyle,
  ListElement,
  ListFormat,
  Scope
} from './FormatTypes';
import { isZeroPadding, styleIsUL } from './FormatUtils';

const applyListFormat = (
  editor: Editor,
  list: ListElement,
  format: ListFormat,
  scope: Scope
): void => {
  const unordered = styleIsUL(format.style);

  if (Type.isNull(list)) {
    // list not in selection
    insertList(editor, unordered, format);
  } else {
    // list in selection
    const outerList = selectListScope(editor, list, scope);
    updateListItemPadding(
      editor,
      format.padding,
      outerList,
      scope === 'descendant' ? undefined : list
    );
    updateListStyle(editor, unordered, format.style);
  }
};

const insertList = (
  editor: Editor,
  unordered: boolean,
  format: ListFormat
): void => {
  editor.execCommand(
    unordered ? 'InsertUnorderedList' : 'InsertOrderedList',
    false,
    {
      'list-style-type': format.style,
      'list-item-attributes': isZeroPadding(format.padding)
        ? {}
        : { style: `padding-left: ${format.padding};` }
    }
  );
};

const updateListStyle = (
  editor: Editor,
  unordered: boolean,
  style: EnhancedListStyle
): void => {
  editor.execCommand(
    unordered ? 'ApplyUnorderedListStyle' : 'ApplyOrderedListStyle',
    false,
    {
      'list-style-type': style
    }
  );
};

const updateListItemPadding = (
  editor: Editor,
  padding: string,
  outerScope: ListElement,
  innerScope?: ListElement
) => {
  const hasInnerScope = Type.isNonNullable(innerScope);
  let dls: ListElement[];
  let dlsPadding: string[];

  if (hasInnerScope) {
    dls = getDescendantLists(innerScope);
    dlsPadding = Arr.map(dls, (dl) => getPaddingFromList(editor, dl));
  }

  setListItemPadding(editor, padding, outerScope);

  if (hasInnerScope) {
    Arr.each(dls, (dl, idx) => setListItemPadding(editor, dlsPadding[idx], dl));
  }
};

const setListItemPadding = (
  editor: Editor,
  padding: string,
  outerScope: ListElement
): void => {
  editor.dom.setStyle(
    editor.dom.select('li', outerScope),
    'padding-left',
    isZeroPadding(padding) ? null : padding
  );
};

export { applyListFormat };
