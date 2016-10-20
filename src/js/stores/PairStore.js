var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var merge = require('react/lib/merge');
var _ = require('lodash');

var _data = [['','']];
var _results = [];

function addPair() {
    _data.push(['','']);
}

function editPair(index, pairs){
    _data[index] = pairs;
}

var emptyPairName = '__emptyPair__';
function pairExists (possibleDuplicatePair, pairs) {
  return _.find(pairs, function(pair) {
    return _.isEqual(pair, possibleDuplicatePair);
  });
};
function randomizePairs() {
  var i, pairSize, randomList, randomPair, results;
  randomList = _.shuffle(_.flatten(_data));
  pairSize = 2;
  results = [];
  i = 0;
  while (i < randomList.length) {
    randomPair = randomList.slice(i, i + pairSize);
    if (pairExists(randomPair, _data)) {
      randomList = _.shuffle(randomList);
      i = 0;
      results = [];
      continue;
    }
    results.push(randomPair);
    i += 2;
  }
  _results = results;
};

var PairStore = merge(EventEmitter.prototype, {

    // public methods used by Controller-View to operate on data
    getAll: function() {
        return _data;
    },
    addChangeListener: function(callback) {
        this.on(Constants.CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(Constants.CHANGE_EVENT, callback);
    },
    emitChange: function() {
        this.emit(Constants.CHANGE_EVENT);
    },
    getResults: function () {
        return _results;
    },

    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;

        switch(action.type) {
            case Constants.ActionTypes.ADD_PAIR: 
                addPair();
                PairStore.emitChange();
                break;
            case Constants.ActionTypes.EDIT_PAIR:
                editPair(action.index, action.pairs);
                PairStore.emitChange();
                break;
            case Constants.ActionTypes.RANDOMIZE:
                randomizePairs();
                PairStore.emitChange();
                break;
        }
    })

});

module.exports = PairStore;
