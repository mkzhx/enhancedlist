import { TinyAssertions, TinySelections } from '@ephox/mcagar';
import { Editor } from '@ephox/mcagar/lib/main/ts/ephox/mcagar/alien/EditorTypes';
import {
  getPaddedContent,
  initialContentNested,
  initialContentSimple,
  removeContent
} from './util/Content';
import { pSetEnhancedList } from './util/Dialog';
import { setCursorToFirstListItem, setCursorToStart } from './util/Selection';

import { editorSetup } from './util/Setup';

describe('browser.tinymce.plugins.enhancedlist.PaddingTest', () => {
  const hook = editorSetup();

  const testInsertPadding = async (
    editor: Editor,
    padding: string
  ): Promise<void> => {
    setCursorToStart(editor);
    await pSetEnhancedList(editor, 'disc', padding, 'current');
    assertPadding(editor, padding);
  };

  const testApplyPadding = async (
    editor: Editor,
    padding: string
  ): Promise<void> => {
    editor.setContent(initialContentSimple);
    setCursorToFirstListItem(editor);
    await pSetEnhancedList(editor, 'disc', padding, 'current');
    assertPadding(editor, padding);
  };

  const assertPadding = (editor: Editor, padding: string): void => {
    TinyAssertions.assertContent(editor, getPaddedContent(padding));
  };

  it('Test inserting list with non-zero padding', async () => {
    const editor = hook.editor();
    await testInsertPadding(editor, '20px');
    removeContent(editor);
  });

  it('Test inserting list with zero padding', async () => {
    const editor = hook.editor();
    await testInsertPadding(editor, '0px');
    removeContent(editor);
  });

  it('Test applying non-zero padding to list', async () => {
    const editor = hook.editor();
    await testApplyPadding(editor, '20px');
    removeContent(editor);
  });

  it('Test applying zero padding to list', async () => {
    const editor = hook.editor();
    await testApplyPadding(editor, '0px');
    removeContent(editor);
  });

  it('Test applying padding to ancestor scope', async () => {
    const editor = hook.editor();
    editor.setContent(initialContentNested);
    TinySelections.setCursor(editor, [0, 1, 1, 1, 1, 0], 0);
    await pSetEnhancedList(editor, 'disc', '20px', 'ancestor');
    TinyAssertions.assertContent(
      editor,
      [
        '<ul style="list-style-type: disc;">',
        '<li style="padding-left: 20px;">List1</li>',
        '<li style="padding-left: 20px;">List1',
        '<ul style="list-style-type: disc;">',
        '<li style="padding-left: 20px;">List2</li>',
        '<li style="padding-left: 20px;">List2',
        '<ul style="list-style-type: disc;">',
        '<li style="padding-left: 20px;">List3</li>',
        '<li style="padding-left: 20px;">List3',
        '<ul style="list-style-type: circle;">',
        '<li>List4</li>',
        '<li>List4</li>',
        '</ul>',
        '</li>',
        '</ul>',
        '</li>',
        '</ul>',
        '</li>',
        '</ul>'
      ].join('\n')
    );
  });

  it('Test applying padding to descendant scope', async () => {
    const editor = hook.editor();
    editor.setContent(initialContentNested);
    TinySelections.setCursor(editor, [0, 1, 1, 0], 0);
    await pSetEnhancedList(editor, 'disc', '20px', 'descendant');
    TinyAssertions.assertContent(
      editor,
      [
        '<ul>',
        '<li>List1</li>',
        '<li>List1',
        '<ul style="list-style-type: disc;">',
        '<li style="padding-left: 20px;">List2</li>',
        '<li style="padding-left: 20px;">List2',
        '<ul style="list-style-type: disc;">',
        '<li style="padding-left: 20px;">List3</li>',
        '<li style="padding-left: 20px;">List3',
        '<ul style="list-style-type: disc;">',
        '<li style="padding-left: 20px;">List4</li>',
        '<li style="padding-left: 20px;">List4</li>',
        '</ul>',
        '</li>',
        '</ul>',
        '</li>',
        '</ul>',
        '</li>',
        '</ul>'
      ].join('\n')
    );
  });

  it('Test applying padding to all scope', async () => {
    const editor = hook.editor();
    editor.setContent(initialContentNested);
    TinySelections.setCursor(editor, [0, 1, 1, 0], 0);
    await pSetEnhancedList(editor, 'disc', '20px', 'all');
    TinyAssertions.assertContent(
      editor,
      [
        '<ul style="list-style-type: disc;">',
        '<li style="padding-left: 20px;">List1</li>',
        '<li style="padding-left: 20px;">List1',
        '<ul style="list-style-type: disc;">',
        '<li style="padding-left: 20px;">List2</li>',
        '<li style="padding-left: 20px;">List2',
        '<ul style="list-style-type: disc;">',
        '<li style="padding-left: 20px;">List3</li>',
        '<li style="padding-left: 20px;">List3',
        '<ul style="list-style-type: disc;">',
        '<li style="padding-left: 20px;">List4</li>',
        '<li style="padding-left: 20px;">List4</li>',
        '</ul>',
        '</li>',
        '</ul>',
        '</li>',
        '</ul>',
        '</li>',
        '</ul>'
      ].join('\n')
    );
  });
});
