import { Arr } from '@ephox/katamari';
import { TinyAssertions, TinyUiActions } from '@ephox/mcagar';
import { Editor } from 'tinymce';
import { editorSetup } from './util/Setup';

describe('browser.tinymce.plugins.enhancedlist.ButtonTest', () => {
  const hook = editorSetup();

  const clickOnSplitButtonItem = async (
    editor: Editor,
    dropdownSelector: string,
    itemIndex: number
  ): Promise<void> => {
    TinyUiActions.clickOnToolbar(editor, dropdownSelector);
    await TinyUiActions.pWaitForUi(editor, '[role="menu"]');
    TinyUiActions.clickOnUi(
      editor,
      `[role="menu"] [role="menuitemradio"]:nth(${itemIndex})`
    );
  };

  it('Test bullist button inserts bullet list', async () => {
    const editor = hook.editor();
    TinyUiActions.clickOnToolbar(
      editor,
      '[aria-label="Bullet list"] .tox-tbtn'
    );
    TinyAssertions.assertContent(
      editor,
      ['<ul>', '<li>&nbsp;</li>', '</ul>'].join('\n')
    );
    editor.resetContent();
  });

  Arr.map(['circle', 'square'], (e, idx) => {
    it(`Test ${e} bullist splitbutton item inserts list`, async () => {
      const editor = hook.editor();
      await clickOnSplitButtonItem(
        editor,
        '[aria-label="Bullet list"]',
        idx + 1
      );
      TinyAssertions.assertContent(
        editor,
        [
          `<ul style="list-style-type: ${e};">`,
          '<li>&nbsp;</li>',
          '</ul>'
        ].join('\n')
      );
      editor.resetContent();
    });
  });

  it('Test numlist button inserts bullet list', async () => {
    const editor = hook.editor();
    TinyUiActions.clickOnToolbar(
      editor,
      '[aria-label="Numbered list"] .tox-tbtn'
    );
    TinyAssertions.assertContent(
      editor,
      ['<ol>', '<li>&nbsp;</li>', '</ol>'].join('\n')
    );
  });

  Arr.map(
    ['lower-alpha', 'lower-greek', 'lower-roman', 'upper-alpha', 'upper-roman'],
    (e, idx) => {
      it(`Test ${e} numlist splitbutton item inserts list`, async () => {
        const editor = hook.editor();
        await clickOnSplitButtonItem(
          editor,
          '[aria-label="Numbered list"]',
          idx + 1
        );
        TinyAssertions.assertContent(
          editor,
          [
            `<ol style="list-style-type: ${e};">`,
            '<li>&nbsp;</li>',
            '</ol>'
          ].join('\n')
        );
        editor.resetContent();
      });
    }
  );
});
