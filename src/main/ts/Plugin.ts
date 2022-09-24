import { Editor, TinyMCE } from 'tinymce';
import {
  registerBullistButton,
  registerDialogButton,
  registerNumlistButton
} from './ui/Buttons';

declare const tinymce: TinyMCE;

const setup = (editor: Editor): void => {
  if (editor.hasPlugin('lists') && editor.hasPlugin('advlist')) {
    registerDialogButton(editor);
    registerBullistButton(editor);
    registerNumlistButton(editor);
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
