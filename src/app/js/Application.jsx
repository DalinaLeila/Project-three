import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";

import Auth from "./Auth";
import Home from "./Home";
import Discover from "./Discover";

import Navigation from "./Navigation";
import Profile from "./Profile";
import NotFound from "./NotFound";

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this._setUser(true),

      isOpen: false

      post: this._setPost(true)

    };

    this._setUser = this._setUser.bind(this);
    this._setPost = this._setPost.bind(this);
    this._resetUser = this._resetUser.bind(this);
    this._toggle = this._toggle.bind(this);
    this._resetPost = this._resetPost.bind(this);

  }


  
  componentDidMount() {
    this._setUser();
    this._setPost();
  }
      _toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }


  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation user={this.state.user} open={this.state.isOpen} toggle={this._toggle}  />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  setUser={this._setUser}
                  user={this.state.user}
                  setPost={this._setPost}
                  post={this.state.post}
                />
              )}
            />
            <Route
              exact
              path="/discover"
              render={() => (
                <Discover
                  setUser={this._setUser}
                  user={this.state.user}
                  setPost={this._setPost}
                  post={this.state.post}
                />
              )}
            />
            <Route
              exact
              path="/profile"
              render={() => (
                <Profile
                  user={this.state.user}
                  setUser={this._setUser}
                  setPost={this._setPost}
                />
              )}
            />
            <Route
              exact
              path="/profile/:username"
              render={() => (
                <Profile
                  user={this.state.user}
                  setUser={this._setUser}
                  setPost={this._setPost}
                />
              )}
            />
            <Route
              path="/auth"
              render={() => (
                <Auth setUser={this._setUser} resetUser={this._resetUser} />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }



_resetUser() {
  this.setState({
    user: null
  });
}


  _resetPost() {
    this.setState({
      post: null
    });
  }

  _setUser(init) {
    const token = localStorage.getItem("identity");
    if (token) {
      const decoded = jwtDecode(token);
      delete decoded.iat;
      if (init) return decoded;
      this.setState({ user: decoded });
    } else {
      return null;
    }

  }

  _setPost(init) {
    const token = localStorage.getItem("postIdentity");
    if (token) {
      const decoded = jwtDecode(token);
      delete decoded.iat;
      if (init) return decoded;
      this.setState({ post: decoded });
    } else {
      return null;
    }
  }
}
}

export default Application;
