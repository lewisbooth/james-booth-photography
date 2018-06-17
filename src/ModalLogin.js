import { Component } from 'inferno';

class ModalLogin extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      password: '',
      loginFailed: false
    }
  }
  submitLoginForm(e) {
    e.preventDefault()
    const loginData = {
      name: this.state.name,
      password: this.state.password
    }
    fetch(this.props.url + "login", {
      body: JSON.stringify(loginData),
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        window.scrollTo(0, 0)
        window.location.reload()
      } else {
        this.setState({ loginFailed: true })
      }
    })
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value, loginFailed: false })
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value, loginFailed: false })
  }
  render() {
    return (
      <div className="Modal">
        <form className="Modal__window" onSubmit={(e) => { this.submitLoginForm(e) }}>
          <div className="Modal__close" onClick={() => this.props.setModal("login", false)}>×</div>
          <label htmlFor="name">name</label>
          <input name="name" type="name" value={this.state.name} onInput={(e) => this.handleNameChange(e)} required />
          <label htmlFor="password">Password</label>
          <input name="password" type="password" value={this.state.password} onInput={(e) => this.handlePasswordChange(e)} required />
          {this.state.loginFailed ?
            <p className="Error">
              Login failed, please try again.
            </p>
            : null}
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }
}

export default ModalLogin;