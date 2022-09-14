import { Editor } from '@ephox/mcagar/lib/main/ts/ephox/mcagar/alien/EditorTypes';
import { EnhancedListStyle } from 'src/main/ts/core/FormatTypes';
import { styleIsUL, isZeroPadding } from 'src/main/ts/core/FormatUtils';

const initialContentSimple = '<ul>\n<li>&nbsp;</li>\n</ul>';

const initialContentNested =
  '<ul>\n<li>List1</li>\n<li>List1\n<ol style="list-style-type: lower-alpha;">\n<li>List2</li>\n<li>List2\n<ol style="list-style-type: lower-greek;">\n<li>List3</li>\n<li>List3\n<ul style="list-style-type: circle;">\n<li>List4</li>\n<li>List4</li>\n</ul>\n</li>\n</ol>\n</li>\n</ol>\n</li>\n</ul>';

const getStyledContent = (style: EnhancedListStyle): string => {
  const listTag = styleIsUL(style) ? 'ul' : 'ol';
  const styleAttr = ` style="list-style-type: ${style};"`;

  return `<${listTag}${styleAttr}>\n<li>&nbsp;</li>\n</${listTag}>`;
};

const getPaddedContent = (padding: string): string =>
  `<ul style="list-style-type: disc;">\n<li${
    isZeroPadding(padding) ? '' : ` style="padding-left: ${padding};"`
  }>&nbsp;</li>\n</ul>`;

const removeContent = (editor: Editor): void => editor.setContent('');

export {
  initialContentSimple,
  initialContentNested,
  getStyledContent,
  getPaddedContent,
  removeContent
};
