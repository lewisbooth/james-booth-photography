import { Component } from 'inferno'
import ModalLogin from './ModalLogin'
import ModalLightbox from './ModalLightbox'
import ModalAddPhoto from './ModalAddPhoto'
import ModalEditPhoto from './ModalEditPhoto'
import ModalDeletePhoto from './ModalDeletePhoto'

class Modals extends Component {
  render() {
    const { modals, setModal, url, updateGallery, image } = this.props
    return (
      <div className="Modals">
        {modals.lightbox !== false ?
          <ModalLightbox
            setModal={setModal}
            image={image}
            index={modals.lightbox} /> : ""}
        {modals.login ?
          <ModalLogin
            setModal={setModal}
            url={url} /> : ""}
        {modals.addPhoto ?
          <ModalAddPhoto
            categories={this.props.categories}
            setModal={setModal}
            updateGallery={updateGallery}
            url={url} /> : ""}
        {modals.editPhoto !== false ?
          <ModalEditPhoto
            categories={this.props.categories}
            setModal={setModal}
            updateGallery={updateGallery}
            image={image}
            url={url} /> : ""}
        {modals.deletePhoto ?
          <ModalDeletePhoto
            setModal={setModal}
            updateGallery={updateGallery}
            url={url}
            id={modals.deletePhoto} /> : ""}
      </div>
    );
  }
}

export default Modals;