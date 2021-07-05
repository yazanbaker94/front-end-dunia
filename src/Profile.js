import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

export class Profile extends Component {
    componentDidMount = () => {
        if(this.props.auth0.isAuthenticated) {
          this.props.auth0.getIdTokenClaims()
          .then(res => {
            const jwt = res.__raw;
            const config = {
              headers: {"Authorization" : `Bearer ${jwt}`},
              method: 'get',
              baseURL: process.env.REACT_APP_SERVER_URL,
              url: '/authorize'
            }
            axios(config)
              .then(response =>{ console.log(response.data)})
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
        }
      }
    render() {
        return (
            <div>
                {
                    this.props.auth0.isAuthenticated&&
                    <>
                    <h1>{this.props.auth0.user.name}</h1>
                    <img src={this.props.auth0.user.picture} alt={this.props.auth0.user.name}/>
                    <h1>{this.props.auth0.user.email}</h1>
                    </>

                }
                
            </div>
        )
    }
}

export default withAuth0(Profile);