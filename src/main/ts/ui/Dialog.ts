import { Type } from '@ephox/katamari';
import { Editor } from 'tinymce';
import { formatList } from '../core/Format';
import {
  getList,
  getPaddingFromLIElement,
  getSelectionStart,
  getStyleFromList,
  isLiNode
} from '../core/Selection';
import { EnhancedListStyle, Scope } from '../core/FormatTypes';

interface DialogData {
  readonly style: EnhancedListStyle;
  readonly padding: string;
  readonly scope: Scope;
}

const openDialog = (editor: Editor): void => {
  const selection = getSelectionStart(editor);
  const selectedList = getList(editor, selection);

  const initialData = {
    style: Type.isNull(selectedList)
      ? 'ul'
      : getStyleFromList(editor, selectedList),
    padding: isLiNode(selection)
      ? getPaddingFromLIElement(editor, selection)
      : '0px',
    scope: 'current'
  };

  const handleSubmit = (data: DialogData) =>
    formatList(
      editor,
      selectedList,
      {
        style: data.style,
        padding: parsePadding(data.padding)
      },
      data.scope
    );

  editor.windowManager.open({
    title: 'Enhanced List',
    body: {
      type: 'panel',
      items: [
        {
          type: 'listbox',
          name: 'style',
          label: 'Style',
          items: [
            { text: 'Bullet (unordered)', value: 'disc' },
            { text: 'Circle (unordered)', value: 'circle' },
            { text: 'Square (unordered)', value: 'square' },
            { text: 'Numbered (ordered)', value: 'decimal' },
            { text: 'Lower Alpha (ordered)', value: 'lower-alpha' },
            { text: 'Lower Greek (ordered)', value: 'lower-greek' },
            { text: 'Lower Roman (ordered)', value: 'lower-roman' },
            { text: 'Upper Alpha (ordered)', value: 'upper-alpha' },
            { text: 'Upper Roman (ordered)', value: 'upper-roman' }
          ]
        },
        {
          type: 'input',
          name: 'padding',
          label: 'Padding'
        },
        {
          type: 'listbox',
          name: 'scope',
          label: 'Scope',
          items: [
            { text: 'Current', value: 'current' },
            { text: 'Current + ancestors', value: 'ancestor' },
            { text: 'Current + descendants', value: 'descendant' },
            { text: 'Current + ancestors + descendants', value: 'all' }
          ]
        }
      ]
    },
    initialData: initialData,
    buttons: [
      {
        type: 'cancel',
        name: 'cancelButton',
        text: 'Cancel'
      },
      {
        type: 'submit',
        name: 'submitButton',
        text: 'Save',
        buttonType: 'primary'
      }
    ],
    onSubmit: (api) => {
      handleSubmit(api.getData());
      api.close();
    }
  });
};

const parsePadding = (raw: string): string => {
  const parsed = raw.replace(/\D/g, '');
  return parsed === '' ? '0px' : parsed + 'px';
};

export { openDialog };
