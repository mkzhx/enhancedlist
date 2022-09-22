import { UiControls } from '@ephox/agar';
import { TinyUiActions } from '@ephox/mcagar';
import { Editor } from '@ephox/mcagar/lib/main/ts/ephox/mcagar/alien/EditorTypes';
import { EnhancedListStyle, Scope } from 'src/main/ts/core/FormatTypes';
import { SugarElement } from '@ephox/sugar';

const dialogSelector = '.tox-dialog';
const getListBoxSelector = (fieldName: string) => `[aria-label="${fieldName}"]`;

const pOpenDialogFromToolbar = async (editor: Editor): Promise<void> => {
  TinyUiActions.clickOnToolbar(editor, 'button');
  await TinyUiActions.pWaitForDialog(editor, dialogSelector);
};

const clickListBox = (editor: Editor, fieldName: string): void => {
  TinyUiActions.clickOnUi(editor, getListBoxSelector(fieldName));
};

const typeInInputField = (
  editor: Editor,
  fieldSelector: string,
  value: string
): void => {
  const fieldElement: SugarElement<HTMLInputElement> = TinyUiActions.clickOnUi(
    editor,
    fieldSelector
  );
  UiControls.setValue(fieldElement, value);
};

const listStyleToTitle = (style: EnhancedListStyle): string =>
  ((
    {
      disc: 'Bullet (unordered)',
      circle: 'Circle (unordered)',
      square: 'Square (unordered)',
      decimal: 'Numbered (ordered)',
      'lower-alpha': 'Lower Alpha (ordered)',
      'lower-greek': 'Lower Greek (ordered)',
      'lower-roman': 'Lower Roman (ordered)',
      'upper-alpha': 'Upper Alpha (ordered)',
      'upper-roman': 'Upper Roman (ordered)'
    } as { [key: EnhancedListStyle]: string }
  )[style]);

const scopeToTitle = (scope: Scope): string =>
  ((
    {
      current: 'Current',
      ancestor: 'Current + ancestors',
      descendant: 'Current + descendants',
      all: 'Current + ancestors + descendants'
    } as { [key: Scope]: string }
  )[scope]);

const pSelectStyleOption = async (
  editor: Editor,
  listStyle: EnhancedListStyle
): Promise<void> => {
  clickListBox(editor, 'Style');
  await pSelectOption(editor, listStyleToTitle(listStyle));
};

const pSelectScopeOption = async (
  editor: Editor,
  scope: Scope
): Promise<void> => {
  clickListBox(editor, 'Scope');
  await pSelectOption(editor, scopeToTitle(scope));
};

const pSelectOption = async (
  editor: Editor,
  optionTitle: string
): Promise<void> => {
  const optionSelector = `div[title="${optionTitle}"]`;
  await TinyUiActions.pWaitForUi(editor, optionSelector);
  TinyUiActions.clickOnUi(editor, optionSelector);
};

const submitDialog = (editor: Editor): void =>
  TinyUiActions.submitDialog(editor, dialogSelector);

const setPadding = (editor: Editor, padding: string): void =>
  typeInInputField(editor, 'input', padding);

const pSetEnhancedList = async (
  editor: Editor,
  listStyle: EnhancedListStyle,
  padding: string,
  scope: Scope
): Promise<void> => {
  await pOpenDialogFromToolbar(editor);
  await pSelectStyleOption(editor, listStyle);
  setPadding(editor, padding);
  await pSelectScopeOption(editor, scope);
  submitDialog(editor);
};

export { pSetEnhancedList };
