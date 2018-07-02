import { Component } from 'inferno'

class ModalEditPhoto extends Component {
  constructor() {
    super()
    this.state = {
      meta: {},
      categories: [],
    }
  }
  componentWillMount() {
    this.setState({
      meta: this.props.image.meta,
      categories: this.props.image.meta.category
    })
  }
  submitForm(e) {
    e.preventDefault()
    const cleanCategories = this.state.categories
      .filter(string => string.match(/[a-zA-Z]/g))
    const meta = {
      description: e.target.description.value,
      category: cleanCategories,
      camera: e.target.camera.value,
      lens: e.target.lens.value,
      iso: e.target.iso.value,
      aperture: e.target.aperture.value,
      shutterSpeed: e.target.shutterSpeed.value,
      focalLength: e.target.focalLength.value
    }
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
  handleCategoryInput(e) {
    const { categories } = this.state
    const key = e.target.dataset.key
    const newValue = e.target.value
    categories[key] = newValue
    this.setState({ categories })
  }
  addCategory(e) {
    e.preventDefault()
    let { categories } = this.state
    if (categories[categories.length - 1] === "")
      return
    categories.push("")
    this.setState({ categories })
  }
  deleteCategory(e) {
    e.preventDefault()
    let { categories } = this.state
    const index = e.target.dataset.key
    categories.splice(index, 1)
    this.setState({ categories })
  }
  render() {
    const { image } = this.props
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
                <label>Categories</label>
                <div className="categories">
                  {this.state.categories.map((category, i) =>
                    <div>
                      <input
                        name={category}
                        data-key={i}
                        value={category}
                        onInput={e => this.handleCategoryInput(e)}
                      />
                      <button
                        data-key={i}
                        onClick={e => this.deleteCategory(e)}>
                        ×
                        </button>
                    </div>
                  )}
                </div>
                <button onClick={e => this.addCategory(e)}>
                  Add category
                </button>
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