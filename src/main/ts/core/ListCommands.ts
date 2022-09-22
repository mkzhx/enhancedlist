import { Editor } from 'tinymce';
import { EnhancedListStyle, ListFormat } from './FormatTypes';
import { isZeroPadding } from './FormatUtils';

const insertList = (
  editor: Editor,
  isUnordered: boolean,
  format: ListFormat
): void => {
  editor.execCommand(
    isUnordered ? 'InsertUnorderedList' : 'InsertOrderedList',
    false,
    {
      'list-style-type': format.style,
      'list-item-attributes': isZeroPadding(format.padding)
        ? {}
        : { style: `padding-left: ${format.padding};` }
    }
  );
};

const applyListStyle = (
  editor: Editor,
  isUnordered: boolean,
  style: EnhancedListStyle
): void => {
  editor.execCommand(
    isUnordered ? 'ApplyUnorderedListStyle' : 'ApplyOrderedListStyle',
    false,
    {
      'list-style-type': style
    }
  );
};

export { insertList, applyListStyle };
