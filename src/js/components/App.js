/*** @jsx React.DOM */

var React = require('react');
var PairStore = require('../stores/PairStore');
var ActionCreator = require('../actions/DataActionCreators');
var Pair = require('./Pair');
var PairForm = require('./pairForm');
var Results = require('./results');

var App = React.createClass({

  _onChange: function() {
    this.setState(PairStore.getAll());
  },

  _onButtonClick: function(e) {
    var newTitle = prompt('Enter new title:');
    if (newTitle) {
      ActionCreator.updateTitle(newTitle);
    }
  },

  getInitialState: function() {
    var data = PairStore.getAll();
    return {
      title: data.title || "pairing-randomizer"
    }
  },

  componentDidMount: function() {
    PairStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PairStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var pairs = PairStore.getAll();
    return (
      <div className="container">
        <h1>Hello, welcome to the {this.state.title}!</h1>
        <PairForm></PairForm>
        <Results></Results>
      </div>
    );
  }

});

module.exports = App;
