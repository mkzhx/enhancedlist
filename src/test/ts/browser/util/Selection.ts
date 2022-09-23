import { TinySelections } from '@ephox/mcagar';
import { Editor } from 'tinymce';

const setCursorToStart = (editor: Editor): void =>
  TinySelections.setCursor(editor, [0], 0);

const setCursorToFirstListItem = (editor: Editor): void =>
  TinySelections.setCursor(editor, [0, 0], 0);

export { setCursorToStart, setCursorToFirstListItem };
