import { Component } from 'inferno'

class ModalEditPhoto extends Component {
  constructor() {
    super()
    this.state = {
      meta: {}
    }
  }
  componentWillMount() {
    this.setState({ meta: this.props.image.meta })
  }
  submitForm(e) {
    e.preventDefault()
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
    this.props.categories.forEach(category => {
      if (e.target[category].checked)
        meta.category.push(category)
    })
    fetch(`${this.props.url}admin/edit/${this.props.image._id}`, {
      body: JSON.stringify(meta),
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setTimeout(() => {
        this.props.updateGallery()
        this.props.setModal('editPhoto', false)
      }, 500)
    }).catch(() => {
      this.setState({ editStatus: "failed" })
    })
  }
  updateMeta(key, value) {
    const meta = { ...this.state.meta }
    meta[key] = value
    console.log(meta)
    this.setState({ meta })
  }
  updateCategory(category) {
    const categories = this.state.meta.category
    const isChecked = categories.includes(category)
    if (isChecked) {
      const index = categories.indexOf(category)
      categories.splice(index, 1)
    } else {
      categories.push(category)
    }
    this.setState({ meta: { category: categories } })
  }
  render() {
    const { image } = this.props
    const updateCategory = this.updateCategory.bind(this)
    return (
      <div className="Modal">
        <form
          className="Modal__window"
          onSubmit={e => this.submitForm(e)}>
          <div
            className="Modal__close"
            onClick={() => this.props.setModal("editPhoto", false)}>
            × </div>
          <div className="AddPhoto">
            <div className="AddPhoto__photo">
              <img src={`/images/gallery/${image._id}/large.jpg`} alt="" />
            </div>
            <div className="AddPhoto__meta">
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  rows="3">
                  {this.state.meta.description}
                </textarea>
                <div className="categories">
                  <label htmlFor="category">Category</label>
                  {this.props.categories.map(category =>
                    <div className="checkbox">
                      <input
                        name={category}
                        type="checkbox"
                        onClick={() => updateCategory(category)}
                        checked={this.state.meta.category.includes(category)}
                      />
                      <label htmlFor={category}>{category}</label>
                    </div>
                  )}
                </div>
                <label htmlFor="camera">Camera</label>
                <input
                  name="camera"
                  type="text"
                  defaultValue={this.state.meta.camera}
                />
                <label htmlFor="lens">Lens</label>
                <input
                  name="lens"
                  type="text"
                  defaultValue={this.state.meta.lens}
                ></input>
                <div className="AddPhoto__meta--inputs">
                  <div className="AddPhoto__meta--inputs--input">
                    <label htmlFor="iso">ISO</label>
                    <input
                      name="iso"
                      type="number"
                      defaultValue={this.state.meta.iso}
                    ></input>
                  </div>
                  <div className="AddPhoto__meta--inputs--input">
                    <label htmlFor="aperture">Aperture</label>
                    <input
                      name="aperture"
                      type="number"
                      step="0.1"
                      defaultValue={this.state.meta.aperture}
                    ></input>
                  </div>
                  <div className="AddPhoto__meta--inputs--input">
                    <label htmlFor="shutterSpeed">Shutter Speed</label>
                    <input
                      name="shutterSpeed"
                      type="text"
                      defaultValue={this.state.meta.shutterSpeed}
                    ></input>
                  </div>
                  <div className="AddPhoto__meta--inputs--input">
                    <label htmlFor="focalLength">Focal Length</label>
                    <input
                      name="focalLength"
                      type="number"
                      defaultValue={this.state.meta.focalLength}
                    ></input>
                  </div>
                </div>
                <button type="submit">Save Changes</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default ModalEditPhoto