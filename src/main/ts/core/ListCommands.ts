import { Editor } from 'tinymce';
import { EnhancedListStyle, ListFormat } from './FormatTypes';
import { isPaddingZero } from './FormatUtils';

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
      'list-item-attributes': isPaddingZero(format.padding)
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
