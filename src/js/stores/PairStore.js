var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var merge = require('react/lib/merge');
var _ = require('lodash');

var _data = [['','']];
var _results = [];
// add private functions to modify data
function addPair() {
    _data.push(['','']);
}

function editPair(index, pairs){
    _data[index] = pairs;
}

function isExistingPair(pair) {
    return ( _.contains(pair, _data) || _.contains([pair[1], pair[0]], _data));
}

function randomizePairs(){
    var randomList = _.shuffle(_.flatten(_data));
    var randomList = _.filter(randomList, function(element){
        return element !== '';
    })
    var pairSize = 2;
    results = [];

    for(var i =0;  i< randomList.length; i+=2){
        randomPair =  randomList.slice(i, i + pairSize);
        if (isExistingPair(randomPair)){
            randomList = _.shuffle(randomList);
            i = 0;
            break;
        }
        results.push(randomPair);
    }
    _results = results;
}

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
