import { TinyHooks } from '@ephox/mcagar';
import { Editor } from '@ephox/mcagar/lib/main/ts/ephox/mcagar/alien/EditorTypes';
import EnhancedList from '../../../../main/ts/Plugin';

const editorSetup = (): TinyHooks.Hook<Editor> =>
  TinyHooks.bddSetup(
    {
      plugins: ['enhancedlist', 'lists', 'advlist'],
      toolbar: 'enhancedlist enhancedbullist enhancednumlist'
    },
    [EnhancedList]
  );

export { editorSetup };
