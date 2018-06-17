import { Component } from 'inferno'

class ModalDeletePhoto extends Component {
  constructor() {
    super()
    this.state = {
      error: false
    }
  }
  deletePhoto(id) {
    fetch(this.props.url + `admin/delete/${id}`, {
      method: 'POST',
      credentials: 'include'
    }).then(() => {
      this.props.updateGallery()
      this.props.setModal('deletePhoto', false)
    }).catch(err => {
      console.log(err)
      this.setState({ error: true })
    })
  }
  render() {
    const { id } = this.props
    return (
      <div className="Modal">
        <div className="Modal__window DeletePhoto">
          <p>Delete this photo?</p>
          <img className="DeletePhoto__image"
            src={`/images/gallery/${this.props.id}/thumbnail.jpg`}
            alt="" />
          {this.state.error ?
            <p className="Error">Error deleting photo</p>
            : ''}
          <div>
            <button
              onClick={() => this.props.setModal('deletePhoto', false)}>
              Cancel
              </button>
            <button
              onClick={() => this.deletePhoto(id)}
              className="warning">
              Delete
              </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalDeletePhoto