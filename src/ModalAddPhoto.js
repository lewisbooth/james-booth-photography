import { Component } from 'inferno'

class ModalAddPhoto extends Component {
  constructor() {
    super()
    this.state = {
      uploadStatus: null,
      imageData: null,
      categories: ["People", "Landscape", "Street", "Studio", "Animals", "Black & White"],
      meta: {}
    }
  }
  submitForm(e) {
    e.preventDefault()
    this.setState({ uploadStatus: "uploading" })
    const meta = {
      description: e.target.description.value,
      category: [],
      camera: e.target.camera.value,
      lens: e.target.lens.value,
      iso: e.target.iso.value,
      aperture: e.target.aperture.value,
      shutterSpeed: e.target.shutterSpeed.value,
      focalLength: e.target.focalLength.value
    }
    this.state.categories.forEach(category => {
      if (e.target[category].checked)
        meta.category.push(category)
    })
    const data = new FormData()
    data.append('meta', JSON.stringify(meta))
    data.append('file', e.target.file.files[0])
    fetch(this.props.url + "admin/new", {
      body: data,
      method: 'POST',
      credentials: 'include'
    }).then(res => {
      setTimeout(() => {
        this.props.updateGallery()
        this.props.setModal('addPhoto', false)
      }, 500)
    }).catch(() => {
      this.setState({ uploadStatus: "failed" })
    })
  }
  handleFileInput(e) {
    e.preventDefault()
    var file = e.target.files[0]
    if (!file)
      return this.setState({ imageData: false })
    var reader = new FileReader()
    reader.onloadend = e =>
      this.setState({
        imageData: e.target.result
      })
    reader.readAsDataURL(file)
  }
  render() {
    return (
      <div className="Modal">
        {this.state.uploadStatus === "uploading" ?
          <div className="Modal">
            <p>Uploading...</p>
          </div> : ""
        }
        <form
          className="Modal__window"
          onSubmit={e => this.submitForm(e)}>
          <div
            className="Modal__close"
            onClick={() => this.props.setModal("addPhoto", false)}>
            × </div>
          <div className="AddPhoto">
            <div className={`AddPhoto__photo ${this.state.imageData ? "" : "fade"}`}>
              <img src={this.state.imageData || ""} alt="" />
            </div>
            <div className="AddPhoto__meta">
              {this.state.imageData ?
                <label htmlFor="file">Image File</label> : ''}
              <input
                className={this.state.imageData ? "" : "AddPhoto__meta--file-drop"}
                type="file"
                id="file"
                name="file"
                accept="image/*"
                onChange={this.handleFileInput.bind(this)} />
              {!this.state.imageData ?
                <label htmlFor="file">
                  <img src="/images/icons/upload.svg" alt="Upload" />
                  Upload Image
                </label> : ''}
              {this.state.imageData ?
                <div>
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    rows="3">
                  </textarea>
                  <div className="categories">
                    <label htmlFor="category">Category</label>
                    {this.state.categories.map(category =>
                      <div className="checkbox">
                        <input name={category} type="checkbox" />
                        <label htmlFor={category}>{category}</label>
                      </div>
                    )}
                  </div>
                  <label htmlFor="camera">Camera</label>
                  <input
                    name="camera"
                    type="text"
                    placeholder="Canon 5D mkIV"
                  />
                  <label htmlFor="lens">Lens</label>
                  <input
                    name="lens"
                    type="text"
                    placeholder="Canon 70-200 f/2.8"
                  ></input>
                  <div className="AddPhoto__meta--inputs">
                    <div className="AddPhoto__meta--inputs--input">
                      <label htmlFor="iso">ISO</label>
                      <input
                        name="iso"
                        type="number"
                        placeholder="800"
                      ></input>
                    </div>
                    <div className="AddPhoto__meta--inputs--input">
                      <label htmlFor="aperture">Aperture</label>
                      <input
                        name="aperture"
                        type="number"
                        step="0.1"
                        placeholder="2.8"
                      ></input>
                    </div>
                    <div className="AddPhoto__meta--inputs--input">
                      <label htmlFor="shutterSpeed">Shutter Speed</label>
                      <input
                        name="shutterSpeed"
                        type="text"
                        placeholder="1/500"
                      ></input>
                    </div>
                    <div className="AddPhoto__meta--inputs--input">
                      <label htmlFor="focalLength">Focal Length</label>
                      <input
                        name="focalLength"
                        type="number"
                        placeholder="50"
                      ></input>
                    </div>
                  </div>
                  <button type="submit">Add Photo</button>
                </div>
                : ""}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default ModalAddPhoto