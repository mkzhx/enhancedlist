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
      '<ul style="list-style-type: disc;">\n<li style="padding-left: 20px;">List1</li>\n<li style="padding-left: 20px;">List1\n<ul style="list-style-type: disc;">\n<li style="padding-left: 20px;">List2</li>\n<li style="padding-left: 20px;">List2\n<ul style="list-style-type: disc;">\n<li style="padding-left: 20px;">List3</li>\n<li style="padding-left: 20px;">List3\n<ul style="list-style-type: circle;">\n<li>List4</li>\n<li>List4</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>'
    );
  });

  it('Test applying padding to descendant scope', async () => {
    const editor = hook.editor();
    editor.setContent(initialContentNested);
    TinySelections.setCursor(editor, [0, 1, 1, 0], 0);
    await pSetEnhancedList(editor, 'disc', '20px', 'descendant');
    TinyAssertions.assertContent(
      editor,
      '<ul>\n<li>List1</li>\n<li>List1\n<ul style="list-style-type: disc;">\n<li style="padding-left: 20px;">List2</li>\n<li style="padding-left: 20px;">List2\n<ul style="list-style-type: disc;">\n<li style="padding-left: 20px;">List3</li>\n<li style="padding-left: 20px;">List3\n<ul style="list-style-type: disc;">\n<li style="padding-left: 20px;">List4</li>\n<li style="padding-left: 20px;">List4</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>'
    );
  });
});
