import React from 'react';
import Message from './message';
var samples =  require('./../sample-data');



class ConversationPane extends React.Component{
  constructor(props){
    super(props);
    this.loadConversationData = this.loadConversationData.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
  }

  loadConversationData(human){
      return this.setState({
        conversation: samples.humans[human].conversations
      });
  }
 // handle when User navigate from /conversation/:id
  componentWillMount(){
      this.loadConversationData(this.props.params.human);
  }
  //wjen user change only data
  componentWillReceivedProps(){
    this.loadConversationData(this.props.params.human);
  }
  renderMessage(val){
    return <Message who={val.who} text={val.text} key={val.time.getTime()} />;
  }
  render(){
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
}
export default ConversationPane;
