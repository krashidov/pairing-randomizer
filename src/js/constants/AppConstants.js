var keyMirror = require('react/lib/keyMirror');

module.exports = {

  CHANGE_EVENT: 'change',

  ActionTypes: keyMirror({
    UPDATE_TITLE: 'UPDATE_TITLE',
    RECEIVE_DATA: 'RECEIVE_DATA',
    ADD_PAIR: 'ADD_PAIR',
    EDIT_PAIR: 'EDIT_PAIR',
    RANDOMIZE: 'RANDOMIZE'
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
