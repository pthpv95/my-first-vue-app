/* eslint-disable no-console */
import oidc from 'oidc-client';

const userManager = new oidc.UserManager({
  userStore: new oidc.WebStorageStateStore(),
  authority: 'http://localhost:5050',
  client_id: 'spa',
  redirect_uri: 'http://localhost:8080/#/callback',
  response_type: 'id_token token',
  scope: 'openid api1 profile',
  post_logout_redirect_uri: window.location.origin + '/index.html',
  silent_redirect_uri: "http://localhost:8080/silentRenew.html",
  accessTokenExpiringNotificationTime: 10,
  automaticSilentRenew: false,
  filterProtocolClaims: true,
  loadUserInfo: true
});

oidc.Log.logger = console;
oidc.Log.Level = oidc.Log.INFO;

export default class AuthService {
  renewTokenManually(){
    return new Promise((resolve, reject) => {
      userManager.signinSilent().then((user) => {
        if(user){
          return resolve(user)
        }else{
          this.signIn(null);
          return resolve(null)
        }
      }).catch((error) => {
        return reject(error)
      })
    })
  }

  getToken(){
    return new Promise((resolve, reject) => {
      userManager.getUser().then((user) => {
        if(user == null){
          this.signIn(null)
          return resolve(null)
        }else{
          return resolve(user)
        }
      }).catch((error) => {
        return reject(error)
      })
    })
  }

  getSignIn(){
    return new Promise((resolve, reject) => {
      userManager.getUser().then((user) => {
        if(user == null){
          this.signIn(null)
          return resolve(false)
        }else{
          localStorage.setItem('access_token', user.access_token)
          return resolve(true)
        }
      }).catch((error) => {
        return reject(error)
      })
    })
  }

  // Get the profile of the user logged in
  getProfile(){
    return new Promise((resolve, reject) => {
      userManager.getUser().then((user) => {
        if (user == null) {
          this.signIn(null)
          return resolve(null)
        } else{          
          return resolve(user.profile)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  // Redirect of the current window to the authorization endpoint.
  signIn(){
    userManager.signinRedirect().catch((err) => {
      console.log(err)
    })
  }

  signinRedirectCallback(signinParams){
    return new Promise((resolve, reject) => {
      userManager.signinRedirectCallback(signinParams).then((user) => {
        if(user){
          resolve(user)
        }else{
          this.signIn()
          resolve(null)
        }
      }).catch((error) => {
        return reject(error)
      })
    })
  }

  // Redirect of the current window to the authorization endpoint.
  signOut(){
    userManager.signoutRedirect().catch((err) => {
      console.log(err)
    })
  }
}

