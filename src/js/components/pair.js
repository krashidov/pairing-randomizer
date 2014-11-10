/*** @jsx React.DOM */
var React = require('react');
var DataActionCreators = require('../actions/DataActionCreators');
var PairStore = require('../stores/PairStore');


var Pair = React.createClass({
    render: function() {
        return (
            <div className="row" onKeyPress={this.handleKeyPress}>
                <label className="col-sm-2 control-label">Pair {this.props.pairNumber}:</label>
                <div className="col-md-4">
                    <input type="text" className="form-control" value={this.props.pairOne} ref="pair0" onChange={this.handleChange} autoFocus></input>
                </div>
                <div className="col-md-4">
                    <input type="text" className="form-control" value={this.props.pairTwo} ref="pair1" onChange={this.handleChange}></input>
                </div>
            </div>
        );
    },

    focus: function () {
        return [this.refs.pair0.getDOMNode().value, this.refs.pair1.getDOMNode().value]
    },

    handleChange: function() {
        PairStore.getAll();
        debugger;
        DataActionCreators.editPair(this.props.pairNumber-1, this.focus());
    },

    handleKeyPress: function(event) {
        debugger;
    }

});

module.exports = Pair;

