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
      window.location.toString().includes('localhost') ||
      window.location.toString().includes('192.')
    console.log(window.location.origin)
    this.publicURL = development ?
      `http://${window.location.hostname}:1250/` :
      "https://jamesboothphotography.me.uk/"
    this.state = {
      loggedIn: false,
      modalActive: false,
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
  modalIsActive() {
    let active = false
    Object.keys(this.state.modals)
      .forEach(key => {
        if (this.state.modals[key]) active = true
      })
    return active
  }
  setModal(modal, active = true) {
    // Rotate lightbox index around end of array
    if (modal === "lightbox")
      if (active === this.state.gallery.length)
        active = 0
      else if (active === -1)
        active = this.state.gallery.length - 1
    const modals = {}
    // Reset all modals to false
    Object.keys(this.state.modals)
      .forEach(key => modals[key] = false)
    // Enable/disable requested modal
    modals[modal] = active
    this.setState({ modals, modalActive: active })
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
          galleryError: this.publicURL + "images"
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
    let currentImage
    if (this.state.modals.lightbox !== false)
      currentImage = this.state.gallery[this.state.modals.lightbox]
    if (this.state.modals.editPhoto !== false)
      currentImage = this.state.gallery[this.state.modals.editPhoto]
    if (this.modalIsActive())
      document.body.classList.add('Modal__active')
    else
      document.body.classList.remove('Modal__active')
    return (
      <div className={`App ${this.state.loggedIn ? "admin" : ""}`}>
        <Modals
          url={this.publicURL}
          modals={this.state.modals}
          image={currentImage}
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