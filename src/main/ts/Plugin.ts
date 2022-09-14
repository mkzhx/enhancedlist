import { Editor, TinyMCE } from 'tinymce';
import { openDialog } from './ui/Dialog';

declare const tinymce: TinyMCE;

const setup = (editor: Editor): void => {
  if (editor.hasPlugin('lists') && editor.hasPlugin('advlist')) {
    editor.ui.registry.addButton('enhancedlist', {
      icon: 'temporary-placeholder',
      onAction: () => {
        openDialog(editor);
      }
    });

    editor.ui.registry.addSplitButton('enhancedbullist', {
      icon: 'list-bull-default',
      tooltip: 'Bullet list',
      columns: 3,
      onAction: () => editor.execCommand('InsertUnorderedList'),
      onItemAction: (api, value) =>
        editor.execCommand('InsertUnorderedList', false, {
          'list-style-type': value === 'default' ? null : value
        }),
      fetch: (callback) => {
        callback([
          {
            type: 'choiceitem',
            icon: 'list-bull-default',
            value: 'default'
          },
          {
            type: 'choiceitem',
            icon: 'list-bull-circle',
            value: 'circle'
          },
          {
            type: 'choiceitem',
            icon: 'list-bull-square',
            value: 'square'
          }
        ]);
      }
    });

    editor.ui.registry.addSplitButton('enhancednumlist', {
      icon: 'list-num-default',
      tooltip: 'Numbered list',
      columns: 3,
      onAction: () => editor.execCommand('InsertOrderedList'),
      onItemAction: (api, value) =>
        editor.execCommand('InsertOrderedList', false, {
          'list-style-type': value === 'default' ? null : value
        }),
      fetch: (callback) => {
        callback([
          {
            type: 'choiceitem',
            icon: 'list-num-default',
            value: 'default'
          },
          {
            type: 'choiceitem',
            icon: 'list-num-lower-alpha',
            value: 'lower-alpha'
          },
          {
            type: 'choiceitem',
            icon: 'list-num-lower-greek',
            value: 'lower-greek'
          },
          {
            type: 'choiceitem',
            icon: 'list-num-lower-roman',
            value: 'lower-roman'
          },
          {
            type: 'choiceitem',
            icon: 'list-num-upper-alpha',
            value: 'upper-alpha'
          },
          {
            type: 'choiceitem',
            icon: 'list-num-upper-roman',
            value: 'upper-roman'
          }
        ]);
      }
    });
  } else {
    // eslint-disable-next-line no-console
    console.error(
      'Please use the Lists and Advanced List plugins together with Enhanced List plugin.'
    );
  }
};

export default (): void => {
  tinymce.PluginManager.add('enhancedlist', setup);
};
