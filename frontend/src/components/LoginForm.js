import React from 'react'
class LoginForm extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        login: false,
        register: false
      }
    }
  
    toggleLogin = () => {
      this.props.resetNotification()
      this.setState({login: !this.state.login})
    }

    toggleRegister = () => {
      this.props.resetNotification()
      this.setState({register: !this.state.register})
    }    

    render() {
      if (this.state.login){
        return(
          <div>
            <h2>Kirjaudu sisään</h2>
            <form onSubmit={(event) => this.props.onLoginSubmit(event, this.props.history)}>
              <div>
                käyttäjänimi
                  <input
                  type="text"
                  name="username"
                  value={this.props.username}
                  onChange={this.props.handleChange}
                />
              </div>
              <div>
                salasana
                  <input
                  type="password"
                  name="password"
                  value={this.props.password}
                  onChange={this.props.handleChange}
                />
              </div>
              <button type="submit">kirjaudu</button>
            </form>
            <button onClick={this.toggleLogin}>takaisin</button>
            <div> {this.props.notification} </div>
          </div>
        )
      }else if(this.state.register){
        return(
          <div>
            <h2>Rekisteröidy</h2>
            <form onSubmit={(event) => this.props.onRegisterSubmit(event, this.props.history)}>
              <div>
                käyttäjänimi
                  <input
                  type="text"
                  name="username"
                  value={this.props.username}
                  onChange={this.props.handleChange}
                />
              </div>
              <div>
                salasana
                  <input
                  type="password"
                  name="password"
                  value={this.props.password}
                  onChange={this.props.handleChange}
                />
              </div>
              <div>
                osoite
                  <input
                  type="address"
                  name="address"
                  value={this.props.address}
                  onChange={this.props.handleChange}
                />
              </div>
              <button type="submit">rekisteröidy</button>
            </form>
            <button onClick={this.toggleRegister}>takaisin</button>
            <div> {this.props.notification} </div>
          </div>
        )
      }else{
        return(
          <div>
            <button onClick={this.toggleLogin}>kirjaudu sisään</button>
            <button onClick={this.toggleRegister}>rekisteröidy</button>
            <div> Kirjaudu tai rekisteröidy, jotta voit tehdä tilauksen</div>
          </div>
        )
      }
    }
  }

export default LoginForm