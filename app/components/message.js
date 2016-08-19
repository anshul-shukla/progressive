import React from 'react';
class Message extends React.Component{
render(){
    return (
      <p>{this.props.who} said: "{this.props.text}"</p>
    )
  }
}
export default Message;
