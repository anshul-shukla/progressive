var React = require('react');
var ReactDOM = require('react-dom');
var samples =  require('./sample-data');

var ReactRouter = require('react-router');
var browserHistory = ReactRouter.browserHistory;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;

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

var InboxPane = React.createClass({

  renderInboxItem : function(human){
    return <InboxItem key={human} index={human} details={this.props.humans[human]}/>; //setSelectedConversation = {this.props.setSelectedConversation}
  },
  render : function() {
    return (
      <div id="inbox-pane">
        <h1>Inbox</h1>
        <table>
          <thead>
            <tr>
              <th>Chat Received</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.humans).map(this.renderInboxItem)}
          </tbody>
        </table>
      </div>
    )
  }
});

var InboxItem = React.createClass({
  sortByDate: function(a, b) {
      return a.time>b.time ? -1 : a.time<b.time ? 1 : 0;
  },
  messageSummary: function(conversations){
    var lastMessage = conversations.sort(this.sortByDate)[0];
    return lastMessage.who + ' said: "' + lastMessage.text + '" @ ' + lastMessage.time.toDateString();
  },
  render: function(){
    return (
      <tr>
        <td><Link to={'/conversation/'+ encodeURIComponent(this.props.index) }>{this.messageSummary(this.props.details.conversations)}</Link></td>
        <td>{this.props.index}</td>
        <td>{this.props.details.orders.sort(this.sortByDate)[0].status}</td>
      </tr>
    )
  }
});

var ConversationPane = React.createClass({
  loadConversationData : function(human){
      return this.setState({
        conversation: samples.humans[human].conversations
      });
  },
 // handle when User navigate from /conversation/:id
  componentWillMount : function(){
      this.loadConversationData(this.props.params.human);
  },
  //wjen user change only data
  componentWillReceivedProps : function(){
    this.loadConversationData(this.props.params.human);
  },
  renderMessage : function(val){
    return <Message who={val.who} text={val.text} key={val.time.getTime()} />;
  },
  render: function(){
    return (
      <div id="conversation-pane">
        <h1>Conversations</h1>
        <h3>{this.props.params.human}</h3>
        <div id="messages">
          {this.state.conversation.map(this.renderMessage)}
        </div>
      </div>
    )
  }
});

var Message =React.createClass({
  render : function(){
    return (
      <p>{this.props.who} said: "{this.props.text}"</p>
    )
  }
})


var StorePane = React.createClass({
  renderStore : function(store){
      return <Store key={store} index={store} details={this.props.stores[store]} />
  },
  render : function(){
    return (
      <div id="stores-pane">
        <h1>Stores and Ovens</h1>
        <ul>
          {Object.keys(this.props.stores).map(this.renderStore)}
        </ul>
      </div>
    )
  }
})

var Store = React.createClass({
  getCount : function(status){
    return this.props.details.orders.filter(function(n){
      return n.status === status;
    }).length;
  },
  render : function(){
    return (
        <li>
          <p>{this.props.index}</p>
          <p>Orders Confirmed: {this.getCount("Confirmed")}</p>
          <p>Orders In The Oven: {this.getCount("In The Oven")}</p>
          <p>Orders Delivered: {this.getCount("Delivered")}</p>
        </li>
      )
  }

})
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/conversation/:human" component={ConversationPane}>
      </Route>
    </Route>
  </Router> , document.getElementById('main'));
