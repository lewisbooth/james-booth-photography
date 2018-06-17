import { Component } from 'inferno'
import Nav from './Nav'
import Gallery from './Gallery'
import Profile from './Profile'
import Footer from './Footer'
import AdminBar from './AdminBar'
import Modals from './Modals'
import './stylus/main.css'

class App extends Component {
  constructor() {
    super()
    const development =
      window.location.toString().includes('localhost')
    this.publicURL = development ?
      "http://localhost:1250/" :
      "https://jamesboothphotography.me.uk/"
    this.state = {
      loggedIn: false,
      modals: {
        login: false,
        addPhoto: false,
        editPhoto: false,
        deletePhoto: false,
        lightbox: false,
      },
      gallery: new Array(20).fill({ meta: "2" })
    }
  }
  setModal(modal, active = true) {
    if (modal === "lightbox")
      if (active === this.state.gallery.length)
        active = 0
      else if (active === -1)
        active = this.state.gallery.length - 1
    const modals = { ...this.state.modals }
    modals[modal] = active
    this.setState({ modals })
  }
  componentDidMount() {
    this.updateGallery()
    this.checkLogin()
  }
  checkLogin() {
    fetch(this.publicURL + "checklogin", {
      credentials: 'include'
    }).then(res => res.json())
      .then(data => {
        const loggedIn = data.name || false
        if (loggedIn !== this.state.loggedIn)
          this.setState({ loggedIn })
      })
  }
  updateGallery() {
    fetch(this.publicURL + "images")
      .then(res => res.json())
      .then(res => {
        this.setState({
          gallery: res.images,
          galleryError: false
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          galleryError: "Error loading images"
        })
      })
  }
  logOut() {
    fetch(this.publicURL + "logout", {
      credentials: 'include'
    }).then(res => {
      window.scrollTo(0, 0)
      window.location.reload()
    })
  }
  render() {
    let image
    if (this.state.modals.lightbox !== false)
      image = this.state.gallery[this.state.modals.lightbox]
    if (this.state.modals.editPhoto !== false)
      image = this.state.gallery[this.state.modals.editPhoto]
    return (
      <div className={`App ${this.state.loggedIn ? "admin" : ""}`}>
        <Modals
          url={this.publicURL}
          modals={this.state.modals}
          image={image}
          updateGallery={this.updateGallery.bind(this)}
          setModal={this.setModal.bind(this)} />
        <AdminBar
          setModal={this.setModal.bind(this)}
          username={this.state.loggedIn} />
        <Nav />
        <Gallery
          url={this.publicURL}
          loggedIn={this.state.loggedIn}
          setModal={this.setModal.bind(this)}
          images={this.state.gallery}
          error={this.state.galleryError}
        />
        <Profile />
        <Footer
          setModal={this.setModal.bind(this)}
          loggedIn={this.state.loggedIn}
          logOut={this.logOut.bind(this)} />
      </div>
    )
  }
}

export default App