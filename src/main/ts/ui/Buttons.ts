import { Arr } from '@ephox/katamari';
import { Editor } from 'tinymce';
import { openDialog } from './Dialog';

const registerDialogButton = (editor: Editor): void =>
  editor.ui.registry.addButton('enhancedlist', {
    icon: 'temporary-placeholder',
    onAction: () => {
      openDialog(editor);
    }
  });

const registerBullistButton = (editor: Editor): void =>
  registerSplitButton(
    editor,
    'enhancedbullist',
    'list-bull-',
    'Bullet list',
    'InsertUnorderedList',
    ['default', 'circle', 'square']
  );

const registerNumlistButton = (editor: Editor): void =>
  registerSplitButton(
    editor,
    'enhancednumlist',
    'list-num-',
    'Numbered list',
    'InsertOrderedList',
    [
      'default',
      'lower-alpha',
      'lower-greek',
      'lower-roman',
      'upper-alpha',
      'upper-roman'
    ]
  );

const registerSplitButton = (
  editor: Editor,
  name: string,
  iconPrefix: string,
  tooltip: string,
  command: string,
  splitItemValues: string[]
) =>
  editor.ui.registry.addSplitButton(name, {
    icon: iconPrefix + 'default',
    tooltip: tooltip,
    columns: 3,
    onAction: () => editor.execCommand(command),
    onItemAction: (api, value) =>
      editor.execCommand(command, false, {
        'list-style-type': value === 'default' ? null : value
      }),
    fetch: (callback) => {
      callback(
        Arr.map(splitItemValues, (e) => ({
          type: 'choiceitem',
          icon: iconPrefix + e,
          value: e
        }))
      );
    }
  });

export { registerDialogButton, registerBullistButton, registerNumlistButton };
