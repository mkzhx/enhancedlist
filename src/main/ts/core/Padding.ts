import { Arr } from '@ephox/katamari';
import { Editor } from 'tinymce';
import { ListElement } from './FormatTypes';
import { isPaddingZero } from './FormatUtils';
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
    isPaddingZero(padding) ? null : padding
  );
};

export { applyListItemPadding };
