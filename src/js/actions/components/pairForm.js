/*** @jsx React.DOM */

var React = require('react');
var DataActionCreators = require('../actions/DataActionCreators');
var Pair = require('./pair');
var PairStore = require('../stores/PairStore');
var _ =require('lodash');


var PairForm = React.createClass({
    render: function() {
        this.pairs = PairStore.getAll().map(function (pair, index) {
            return (<Pair pairNumber={index + 1} nameOne={pair[0]} nameTwo={pair[1]} ref={'pair' + index }></Pair>);
        });

        return (
            <form className="form-horizontal" role="form" onSubmit={this.handleSubmit} >
                {this.pairs}
                <div className="row">
                    <div className="col-md-offset-2 col-md-1">
                        <button onClick={this.addNewPair} className="btn btn-primary"> + Add Pair</button>
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-info">Randomize</button>
                    </div>
                </div>
            </form>
        );
    },

    addNewPair: function(event){
        event.preventDefault();
        newPair = this.refs['pair' + (this.pairs.length - 1)].focus();

        if(newPair[0] !== '' && newPair[1] !== ''){
            DataActionCreators.addPair(newPair);
        }
    },

    handleSubmit: function(){
        event.preventDefault();
        DataActionCreators.randomize();
    }
});

module.exports = PairForm;

