import React from 'react';
import Store from './store';

class StorePane extends React.Component{

  constructor(props){
    super(props);
    this.renderStore = this.renderStore.bind(this);
  }
  renderStore(store){
      return <Store key={store} index={store} details={this.props.stores[store]} />
  }
  render(){
    return (
      <div id="stores-pane">
        <h1>Stores and Ovens</h1>
        <ul>
          {Object.keys(this.props.stores).map(this.renderStore)}
        </ul>
      </div>
    )
  }
}
export default StorePane;
