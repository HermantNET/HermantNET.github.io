// @flow
import React from "react"
import "./Gallery.scss"

type Props = {}

type State = {
  photos: Array<{ img: string, thumb: string | typeof undefined }>,
  activePhoto: number,
  add: boolean,
}

export default class Gallery extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      photos: [
        { img: "https://www.what-dog.net/Images/faces2/scroll001.jpg", thumb: undefined },
        {
          img:
            "https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/Common-dog-behaviors-explained.jpg?itok=FSzwbBoi",
          thumb: undefined,
        },
      ],
      activePhoto: -1,
      add: false,
    }
  }

  selectPhoto = (photoIndex: number) => {
    this.setState({
      activePhoto: photoIndex,
    })
  }

  add = () => {
    this.setState({
      add: true,
    })
  }

  addImage = () => {
    this.setState({
      photos:
        this.url.value.trim() !== ""
          ? this.state.photos.concat({ img: this.url.value, thumb: this.thumb.value })
          : this.state.photos,
      add: false,
    })
  }

  render() {
    if (this.state.activePhoto > -1) {
      return (
        <div className="gallery">
          <div>
            <img
              className="gal-display"
              src={this.state.photos[this.state.activePhoto].img}
              onClick={this.selectPhoto.bind(this, -1)}
            />
            <p>Click the image to return to the Gallery.</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="gallery">
          <div className="gal-span">
            <p>Click an image to view.</p>
          </div>
          {this.state.photos.map((photo, index) => (
            <div key={index}>
              <img className="gal-thumb" src={photo.thumb || photo.img} onClick={this.selectPhoto.bind(this, index)} />
            </div>
          ))}
          {this.state.add ? (
            <div className="gal-span">
              <input
                type="text"
                placeholder="Image URL"
                ref={input => {
                  this.url = input
                }}
              />
              <input
                type="text"
                placeholder="Image thumbnail URL"
                ref={input => {
                  this.thumb = input
                }}
              />
              <button onClick={this.addImage}>Add Image</button>
            </div>
          ) : (
            <div className="gal-span" onClick={this.add}>
              <h1>+</h1>
              <p>Add Image</p>
            </div>
          )}
        </div>
      )
    }
  }
}
