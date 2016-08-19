import React from 'react';
var ReactRouter = require('react-router');
var browserHistory = ReactRouter.browserHistory;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
class InboxItem extends React.Component{
  sortByDate(a, b) {
      return a.time>b.time ? -1 : a.time<b.time ? 1 : 0;
  }
  messageSummary(conversations){
    var lastMessage = conversations.sort(this.sortByDate)[0];
    return lastMessage.who + ' said: "' + lastMessage.text + '" @ ' + lastMessage.time.toDateString();
  }
  render(){
    return (
      <tr>
        <td><Link to={'/conversation/'+ encodeURIComponent(this.props.index) }>{this.messageSummary(this.props.details.conversations)}</Link></td>
        <td>{this.props.index}</td>
        <td>{this.props.details.orders.sort(this.sortByDate)[0].status}</td>
      </tr>
    )
  }
}

export default InboxItem;
