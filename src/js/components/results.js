/*** @jsx React.DOM */

var React = require('react');
var PairStore = require('../stores/PairStore');

var Results = React.createClass({
    displayName: 'Results',

  _onChange: function() {
    this.setState({results: PairStore.getResults()});
  },

  getInitialState: function() {
    return {
        results: PairStore.getResults()
    };
  },


  componentDidMount: function() {
    PairStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PairStore.removeChangeListener(this._onChange);
  },

    render: function () {
        debugger;
        // return (<div>{this.state.results}</div>);
        var results = this.state.results.map(function(result, index) {
            return (<tr>
                        <td>{index + 1}</td>
                        <td>{result[0]}</td>
                        <td>{result[1]}</td>
                    </tr>);
        });
        if(this.state.results.length > 0){
            return (
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Dev 1 Name</th>
                            <th>Dev 2 Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results}
                    </tbody>
                </table>
            );
        }
        return (<div></div>);
    }
});

module.exports = Results;