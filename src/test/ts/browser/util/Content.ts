import { Editor } from '@ephox/mcagar/lib/main/ts/ephox/mcagar/alien/EditorTypes';
import { EnhancedListStyle } from 'src/main/ts/core/FormatTypes';
import { isStyleUL, isPaddingZero } from 'src/main/ts/core/FormatUtils';

const initialContentSimple = ['<ul>', '<li>&nbsp;</li>', '</ul>'].join('\n');

const initialContentNested = [
  '<ul>',
  '<li>List1</li>',
  '<li>List1',
  '<ol style="list-style-type: lower-alpha;">',
  '<li>List2</li>',
  '<li>List2',
  '<ol style="list-style-type: lower-greek;">',
  '<li>List3</li>',
  '<li>List3',
  '<ul style="list-style-type: circle;">',
  '<li>List4</li>',
  '<li>List4</li>',
  '</ul>',
  '</li>',
  '</ol>',
  '</li>',
  '</ol>',
  '</li>',
  '</ul>'
].join('\n');

const getStyledContent = (style: EnhancedListStyle): string => {
  const listTag = isStyleUL(style) ? 'ul' : 'ol';
  const styleAttr = ` style="list-style-type: ${style};"`;

  return [`<${listTag}${styleAttr}>`, '<li>&nbsp;</li>', `</${listTag}>`].join(
    '\n'
  );
};

const getPaddedContent = (padding: string): string =>
  [
    `<ul style="list-style-type: disc;">`,
    `<li${
      isPaddingZero(padding) ? '' : ` style="padding-left: ${padding};"`
    }>&nbsp;</li>`,
    '</ul>'
  ].join('\n');

const removeContent = (editor: Editor): void => editor.setContent('');

export {
  initialContentSimple,
  initialContentNested,
  getStyledContent,
  getPaddedContent,
  removeContent
};
