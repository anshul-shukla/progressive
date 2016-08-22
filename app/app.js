window.SE=function(e){"use strict";function t(e,t){var r=e[t];if(!r)throw t+" required";return r}function r(e){if(!e)throw g;var r=t(e,"clientId"),o=t(e,"channelUrl"),n=t(e,"complete"),d=window.location.protocol,w=d.substring(0,d.length-1),u=(d+"//"+window.location.host).toLowerCase();if(c=t(e,"key"),i=r,a=o,0!==a.toLowerCase().indexOf(u))throw"channelUrl must be under the current domain";s=h+"/oauth/dialog?redirect_uri="+l(h+"/oauth/login_success?assisted="+r+"&protocol="+w+"&proxy="+l(a)),setTimeout(function(){n({"version":"22576"})})}function o(t,r,o,n){for(var i,s="sec"+u++,a=m,d=function(a){return window[s]=e,i.parentNode.removeChild(i),a.error_id?(n({"errorName":a.error_name,"errorMessage":a.error_message}),void 0):(o({"accessToken":t,"expirationDate":r,"networkUsers":a.items}),void 0)};window[s]||w.getElementById(s);)s="sec"+u++;window[s]=d,a+="?pagesize=100&access_token="+l(t)+"&key="+l(c)+"&callback="+l(s),i=w.createElement("script"),i.type="text/javascript",i.src=a,i.id=s,w.getElementsByTagName("head")[0].appendChild(i)}function n(e){if(!e)throw g;var r,n,a,c,w,m=t(e,"success"),f=e.scope,v="",k=u++,x=s+"&client_id="+i+"&state="+k,y=e.error;if(f&&"[object Array]"!==Object.prototype.toString.call(f))throw"scope must be an Array";f&&(v=f.join(" ")),v.length>0&&(x+="&scope="+l(v)),c=function(t){if(t.origin===h&&t.source===a){var n,i,s,d,w=t.data.substring(1).split("&"),l={};for(s=0;s<w.length;s++)d=w[s].split("="),l[d[0]]=d[1];if(+l.state===k)return r&&window.removeEventListener("message",c),a.close(),(i=l.access_token)?(n=l.expires,n&&(n=new Date((new Date).getTime()+1e3*n)),e.networkUsers?o(i,n,m,y):m({"accessToken":i,"expirationDate":n}),void 0):(y&&y({"errorName":l.error,"errorMessage":l.error_description}),void 0)}},!window.postMessage||!window.addEventListener||(/MSIE (\d+\.\d+)/.exec(d)||[])[1]<=9?(n=function(){if(a){if(a.closed)return clearInterval(w),void 0;var e=a.frames["se-api-frame"];e&&(clearInterval(w),c({"origin":h,"source":a,"data":e.location.hash}))}},w=setInterval(n,50)):(r=!0,window.addEventListener("message",c)),a=window.open(x,p,"width=660,height=480")}var i,s,a,c,d=window.navigator.userAgent,w=window.document,l=window.encodeURIComponent,u=1,p="sew"+u++,h="https://stackexchange.com",m="https://api.stackexchange.com/2.0/me/associated",g="must pass an object";return{"authenticate":n,"init":r}}();


var React = require('react');
var classNames = require('classnames');
import ReactHighcharts from 'react-highcharts';
import $ from 'jquery';
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var browserHistory = ReactRouter.browserHistory;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;


class App extends React.Component{

  constructor(props){
      super(props);
      this.getUser = this.getUser.bind(this);
      this.getBadges = this.getBadges.bind(this);
      this.getReputation = this.getReputation.bind(this);
      this.login = this.login.bind(this);
      this.renderUser = this.renderUser.bind(this);
      this.renderBadges = this.renderBadges.bind(this);
      this.getReputation = this.getReputation.bind(this);
      this.badgeWrapper = this.badgeWrapper.bind(this);
      this.createBadge = this.createBadge.bind(this);
      this.state = {
        imgUrl : null,
        name : "",
        reputation : 0,
        age :0,
        location : "",
        website : "",
        link : "",
        badge_counts : {
          bronze: 0,
          silver: 0,
          gold: 0
        },
        badges : [],
        config : {
          chart: {
           type: 'area'
         },
          title: {
           text: 'Reputation Change Last 6 Month',
         },
          xAxis: {
            name:"Date",
             categories: []
         },
         yAxis: {
            title: {
                text: 'Reputation'
            }
        },
         series: [{
            name:"Reputation",
            color: '#f69c55',
             data: []
         }]
       },
       repo : []
      };
      this.getUser();
}

  renderReputation(response){
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];

    var chart = this.refs.chart.getChart();
    this.state.repo = response.items.map((item)=> item.reputation_change);
    chart.xAxis[0].update({
      categories : response.items.map((item)=> item.creation_date).map((d) => monthNames[new Date(Number(d + "000")).getMonth()] ).reverse()
    })
    chart.series[0].update({
      data : this.state.repo.map((a,i)=> this.state.repo.slice(0,i+1).reduce((x,y)=>x+y))
    })

  }



  renderUser(response){
    this.setState({
      imgUrl : response.items[0].profile_image,
      name : response.items[0].display_name,
      reputation : response.items[0].reputation,
      age :response.items[0].age,
      location : response.items[0].location,
      website :response.items[0].website_url,
      link :response.items[0].link,
      badge_counts : {
        bronze: response.items[0].badge_counts.bronze,
        silver: response.items[0].badge_counts.silver,
        gold: response.items[0].badge_counts.gold
      }
    })
  }

  renderBadges(response){
    this.setState({
      badges : response.items.map(this.createBadge)
    });
    this.getReputation();
  }

  createBadge(item){
    console.log(item)
    return {
      name : item.name,
      rank : item.rank
    }
  }

 getUser(response){
   console.log(response);
     var jsPromise = Promise.resolve($.ajax('http://api.stackexchange.com/2.2/users/'+ 1768910 +'?order=desc&sort=reputation&site=stackoverflow'));
     jsPromise.then((response) => {
       this.renderUser(response);
       this.getBadges();
     },(response) => {

       });

 }
 getBadges(){
     var jsPromise = Promise.resolve($.ajax('https://api.stackexchange.com/2.2/users/1768910/badges?order=desc&sort=type&site=stackoverflow'));
     jsPromise.then((response) => {
       this.renderBadges(response);
     },(response) => {

       });
 }

 getReputation(){
   var jsPromise = Promise.resolve($.ajax('https://api.stackexchange.com/2.2/users/1768910/reputation-history?page=1&pagesize=100&site=stackoverflow'));
   jsPromise.then((response) => {
     this.renderReputation(response);
   },(response) => {

     });
 }

 badgeWrapper(badge){
   return <Badge name={badge.name} rank={badge.rank} key={badge.name}/>
 }


  login(){
    var obj = {
        success: this.getUser,
        error: function(data) { console.log(data); },
        scope: ['read_inbox'],
        networkUsers: true
    }
    SE.init({
        clientId: 7738,
        key: 'vdY0o8PsE)EMIldkG92Ldg((',
        channelUrl: 'http://localhost',
        complete: function (data) { console.log(data) }
    });
    SE.authenticate(obj);

  }
  render() {
    return (
      <div>
          <div>
            <button onClick= {this.login} >
              <span className="fTile">stack</span>
              <span className="lTile">overflow</span>
            </button>
          </div>
          <div className="details">
            <ul>
              <li>
                  <div className="left"><img src={this.state.imgUrl} /></div>
                  <div className="right">
                    <div className="name">{this.state.name}</div>
                    <div>
                      <div className="batch gold">{this.state.badge_counts.gold}</div>
                      <div className="batch silver">{this.state.badge_counts.silver}</div>
                      <div className="batch bronze">{this.state.badge_counts.bronze}</div>
                    </div>
                  </div>
              </li>
              <li>
              <div className="left">Reputation : </div>
              <div className="right">{this.state.reputation}</div>
              </li>
              <li>
              <div className="left">Age : </div>
              <div className="right">{this.state.age}</div>
              </li>
              <li>
              <div className="left">Location : </div>
              <div className="right">{this.state.location}</div>
              </li>
              <li>
              <div className="left">Website : </div>
              <div className="right">{this.state.website}</div>
              </li>
              <li>
              <div className="left">Link : </div>
              <div className="right"><a href={this.state.website} >{this.state.website}</a></div>
              </li>
            </ul>
          </div>
          <div className="badges details"><h4>Badge</h4>{this.state.badges.map(this.badgeWrapper)}</div>
          <div className="details chart"><ReactHighcharts config = {this.state.config} ref="chart"></ReactHighcharts></div>
      </div>
    )
  }
}

export default class Badge extends React.Component{
  render(){
    var className = classNames('badge',this.props.rank);
    return (
      <div className={className}>{this.props.name}</div>
    )
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}></Route>


  </Router> , document.getElementById('main'));
