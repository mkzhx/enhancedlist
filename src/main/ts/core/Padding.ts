import { Arr } from '@ephox/katamari';
import { Editor } from 'tinymce';
import { ListElement } from './FormatTypes';
import { isZeroPadding } from './FormatUtils';
import { getLiElementsFromList } from './Selection';

const applyListItemPadding = (
  editor: Editor,
  padding: string,
  targetLists: ListElement[]
): void => {
  const targetListitems = Arr.bind(targetLists, getLiElementsFromList);
  editor.dom.setStyle(
    targetListitems,
    'padding-left',
    isZeroPadding(padding) ? null : padding
  );
};

export { applyListItemPadding };
