import { Arr } from '@ephox/katamari';
import { TinyAssertions, TinySelections } from '@ephox/mcagar';
import { enhancedListStyles } from 'src/main/ts/core/FormatTypes';
import {
  getStyledContent,
  initialContentNested,
  initialContentSimple,
  removeContent
} from './util/Content';
import { pSetEnhancedList } from './util/Dialog';
import { setCursorToFirstListItem, setCursorToStart } from './util/Selection';

import { editorSetup } from './util/Setup';

describe('browser.tinymce.plugins.enhancedlist.StyleTest', () => {
  const hook = editorSetup();

  Arr.each(enhancedListStyles, (listStyle) => {
    it(`Test inserting ${listStyle} style`, async () => {
      const editor = hook.editor();
      setCursorToStart(editor);
      await pSetEnhancedList(editor, listStyle, '0px', 'current');
      TinyAssertions.assertContent(editor, getStyledContent(listStyle));
      removeContent(editor);
    });
  });

  Arr.each(enhancedListStyles, (listStyle) => {
    it(`Test applying ${listStyle} style`, async () => {
      const editor = hook.editor();
      editor.setContent(initialContentSimple);
      setCursorToFirstListItem(editor);
      await pSetEnhancedList(editor, listStyle, '0px', 'current');
      TinyAssertions.assertContent(editor, getStyledContent(listStyle));
    });
  });

  it('Test applying list style to ancestor scope', async () => {
    const editor = hook.editor();
    editor.setContent(initialContentNested);
    TinySelections.setCursor(editor, [0, 1, 1, 1, 1, 0], 0);
    await pSetEnhancedList(editor, 'upper-roman', '0px', 'ancestor');
    TinyAssertions.assertContent(
      editor,
      '<ol style="list-style-type: upper-roman;">\n<li>List1</li>\n<li>List1\n<ol style="list-style-type: upper-roman;">\n<li>List2</li>\n<li>List2\n<ol style="list-style-type: upper-roman;">\n<li>List3</li>\n<li>List3\n<ul style="list-style-type: circle;">\n<li>List4</li>\n<li>List4</li>\n</ul>\n</li>\n</ol>\n</li>\n</ol>\n</li>\n</ol>'
    );
  });

  it('Test applying list style to descendant scope', async () => {
    const editor = hook.editor();
    editor.setContent(initialContentNested);
    TinySelections.setCursor(editor, [0, 1, 1, 0], 0);
    await pSetEnhancedList(editor, 'upper-roman', '0px', 'descendant');
    TinyAssertions.assertContent(
      editor,
      '<ul>\n<li>List1</li>\n<li>List1\n<ol style="list-style-type: upper-roman;">\n<li>List2</li>\n<li>List2\n<ol style="list-style-type: upper-roman;">\n<li>List3</li>\n<li>List3\n<ol style="list-style-type: upper-roman;">\n<li>List4</li>\n<li>List4</li>\n</ol>\n</li>\n</ol>\n</li>\n</ol>\n</li>\n</ul>'
    );
  });
});
