var React = require('react');
var ReactDOM = require('react-dom');
var samples =  require('./sample-data');

var ReactRouter = require('react-router');
var browserHistory = ReactRouter.browserHistory;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;

import ConversationPane from './components/conversation';
import StorePane from './components/storePane';
import InboxPane from './components/inboxPane';

var App = React.createClass({

 getInitialState : function(){
   return {
     humans : {},
     stores : {}
   }
 },
 loadSampleData : function(){
   this.setState(samples);
 },
 render : function() {
    return (
      <div>
        <div id="header"></div>
        <button onClick={this.loadSampleData}>load sample data</button>
        <div className="container">
          <div className="column">
            <InboxPane  humans={this.state.humans} />
          </div>
          <div className="column">
            {this.props.children || "select the conversation from the inbox."}
           </div>
          <div className="column">
            <StorePane stores={this.state.stores}/>
          </div>
        </div>
      </div>
    )
  }
});

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/conversation/:human" component={ConversationPane}>
      </Route>
    </Route>
  </Router> , document.getElementById('main'));
