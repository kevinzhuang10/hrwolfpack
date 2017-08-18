import React from 'react';
import { Route, Switch } from 'react-router-dom';
import $ from 'jquery';
import Dashboard from './Dashboard.jsx';
import InitiatedListings from './InitiatedListings.jsx';
import JoinedListings from './JoinedListings.jsx';
import NewListings from './NewListings.jsx';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newListings: [],
			joinedListings: [],
			initiatedListings: []
		};
	}

	componentDidMount() {
		this.getNewListings();
		this.getJoinedListings();
		this.getInitiatedListings();
	    
	    this.props.socket.on('newListing', (data) => {
	    	console.log('got some new stuff', data);
	      if (data.initializer === this.props.userId) {
	      	var nInitiatedListings = this.state.initiatedListings.concat(data);
	      	this.setState({
	      		initiatedListings: nInitiatedListings
	      	});
	      } else {
	      	var nNewListings = this.state.newListings.concat(data);
	      	this.setState({
	      		newListings: nNewListings
	      	});
	      }
	    });

	}

	getNewListings() {
		$.get('/newListings', (data) => {
			this.setState({
				newListings: data
			});
		});
	}

	getJoinedListings() {
		$.get('/joinedListings', (data) => {
			this.setState({
				joinedListings: data
			});
		});
	}

	getInitiatedListings() {
		$.get('/initiatedListings', (data) => {
			this.setState({
				initiatedListings: data
			});
		});
	}

	render() {
		return (
			<div>
		        <Switch>
		          <Route exact path="/new" render={(props) => (
		            <NewListings 
		            userId={this.props.userId}
		            newListings={this.state.newListings} 
		            socket={this.props.socket}/>
		          )}/>
		          <Route exact path="/joined" render={(props) => (
		            <JoinedListings 
		            userId={this.props.userId}
		            joinedListings={this.state.joinedListings} 
		            socket={this.props.socket}/>		            
		          )}/>
		          <Route exact path="/initiated" render={(props) => (
		            <InitiatedListings 
		            userId={this.props.userId}
		            initiatedListings={this.state.initiatedListings} 
		            socket={this.props.socket}/>
		          )}/>
		        </Switch>
	        </div>
		);
	}
}

		          // <Route exact path="/" render={(props) => (
		          //   <Dashboard 
		          //   userId={this.props.userId} 
		          //   socket={this.props.socket}/>
		          // )}/>
export default Main;