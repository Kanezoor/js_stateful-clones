'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];
  let clonedState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const addState = { ...clonedState };

      for (const key in action.extraData) {
        addState[key] = action.extraData[key];
      }

      clonedState = addState;
    }

    if (action.type === 'removeProperties') {
      const removeState = { ...clonedState };

      for (const key of action.keysToRemove) {
        delete removeState[key];
      }

      clonedState = removeState;
    }

    if (action.type === 'clear') {
      const clearState = { ...clonedState };

      for (const key in clonedState) {
        delete clearState[key];
      }

      clonedState = clearState;
    }
    results.push(clonedState);
  }

  return results;
}

module.exports = transformStateWithClones;
