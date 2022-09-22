import { ListElement, Scope } from './FormatTypes';
import { SugarElement, SelectorFilter } from '@ephox/sugar';
import { listSelector } from './Selection';
import { getDomElements, getLastOrDefault } from './Utils';

interface ScopeInformation {
  readonly targets: ListElement[];
  readonly start: ListElement;
  readonly end: ListElement;
}

const getScopeInformation = (
  scope: Scope,
  currList: ListElement
): ScopeInformation => {
  if (scope === 'current') {
    return {
      targets: [currList],
      start: currList,
      end: currList
    };
  }

  // reverse to keep ancestor lists in outer-to-inner order
  const ancestors = getAncestorLists(currList);
  const firstAncestor = getLastOrDefault(ancestors, currList);
  if (scope === 'ancestor') {
    return {
      targets: [...ancestors, currList],
      start: firstAncestor,
      end: currList
    };
  }

  const descendants = getDescendantLists(currList);
  const lastDescendant = getLastOrDefault(descendants, currList);
  if (scope === 'descendant') {
    return {
      targets: [currList, ...descendants],
      start: currList,
      end: lastDescendant
    };
  }

  // scope === 'all'
  return {
    targets: [...ancestors, currList, ...descendants],
    start: firstAncestor,
    end: lastDescendant
  };
};

const getDescendantLists = (list: ListElement): ListElement[] =>
  getDomElements(
    SelectorFilter.descendants(SugarElement.fromDom(list), listSelector)
  );

const getAncestorLists = (list: ListElement): ListElement[] =>
  getDomElements(
    SelectorFilter.ancestors(SugarElement.fromDom(list), listSelector)
  );

export { getScopeInformation };
