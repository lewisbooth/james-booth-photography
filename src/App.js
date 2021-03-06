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
      window.location.toString().indexOf('localhost') > -1 ||
      window.location.toString().indexOf('localhost') > -1
    const gallery = []
    for (let i = 0; i < 20; i++) {
      gallery.push({})
    }
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
      categories: [],
      gallery,
      activeFilter: "",
      filteredGallery: []
    }
  }
  modalIsActive() {
    let active = false
    Object.keys(this.state.modals)
      .forEach(key => {
        if (this.state.modals[key] !== false) active = true
      })
    return active
  }
  setActiveFilter(activeFilter) {
    if (activeFilter === this.state.activeFilter)
      activeFilter = ""
    this.setState({ activeFilter })
    this.updateFilteredGallery()
  }
  updateFilteredGallery() {
    const filteredGallery = this.state.gallery.filter(image => {
      return (image.meta.category.indexOf(this.state.activeFilter) > -1
        || this.state.activeFilter === "")
    })
    if (filteredGallery === this.state.filteredGallery)
      return
    this.setState({ filteredGallery })
  }
  setModal(modal, active = true) {
    // Rotate lightbox index around end of array
    if (modal === "lightbox")
      if (active === this.state.filteredGallery.length)
        active = 0
      else if (active === -1)
        active = this.state.filteredGallery.length - 1
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
    fetch(this.publicURL + "checklogin/", {
      credentials: 'include'
    }).then(res => res.json())
      .then(data => {
        const loggedIn = data.name || false
        if (loggedIn !== this.state.loggedIn)
          this.setState({ loggedIn })
      })
  }
  generateCategories(gallery) {
    let categories = []
    gallery.forEach(image => {
      image.meta.category.forEach(category => {
        if (categories.indexOf(category) === -1)
          categories.push(category)
      })
    })
    return categories
  }
  updateGallery() {
    fetch(this.publicURL + "images/")
      .then(res => res.json())
      .then(res => {
        this.setState({
          gallery: res.gallery,
          galleryError: false,
          categories: this.generateCategories(res.gallery)
        })
        this.updateFilteredGallery()
      })
      .catch(err => {
        console.log(err)
        this.setState({
          galleryError: "Error fetching images"
        })
      })
  }
  swapImages(start, finish) {
    if (this.state.activeFilter !== "") {
      const startId = this.state.filteredGallery[start]._id
      const finishId = this.state.filteredGallery[finish]._id
      this.state.gallery.forEach((image, i) => {
        if (image._id === startId)
          start = i
        if (image._id === finishId)
          finish = i
      })
    }
    fetch(`${this.publicURL}admin/swap/${start}/${finish}`, {
      credentials: 'include',
      method: "POST"
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          gallery: res.gallery,
          galleryError: false
        })
        this.updateFilteredGallery()
      })
      .catch(err => {
        console.log(err)
        this.setState({
          galleryError: "Error swapping images"
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
      currentImage = this.state.filteredGallery[this.state.modals.lightbox]
    if (this.state.modals.editPhoto !== false)
      currentImage = this.state.filteredGallery[this.state.modals.editPhoto]
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
          categories={this.state.categories}
          updateGallery={this.updateGallery.bind(this)}
          setModal={this.setModal.bind(this)} />
        <AdminBar
          setModal={this.setModal.bind(this)}
          username={this.state.loggedIn} />
        <Nav />
        <Gallery
          url={this.publicURL}
          loggedIn={this.state.loggedIn}
          categories={this.state.categories}
          activeFilter={this.state.activeFilter}
          setModal={this.setModal.bind(this)}
          swapImages={this.swapImages.bind(this)}
          setActiveFilter={this.setActiveFilter.bind(this)}
          images={this.state.filteredGallery}
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