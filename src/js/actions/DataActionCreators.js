var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');
var DataStore = require('../stores/PairStore');

module.exports = {

  updateTitle: function(text) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.UPDATE_TITLE,
      text: text
    });
  },

  addPair: function(pairs){
    AppDispatcher.handleViewAction({
        type: Constants.ActionTypes.ADD_PAIR
    });
  },

  editPair: function (pairIndex, pairs) {
    AppDispatcher.handleViewAction({
        type: Constants.ActionTypes.EDIT_PAIR,
        pairs: pairs,
        index: pairIndex
    });
  },

  randomize: function(){
    AppDispatcher.handleViewAction({
        type: Constants.ActionTypes.RANDOMIZE
    });
  }
};
