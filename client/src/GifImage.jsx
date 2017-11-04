import React from 'react'
import ReactDOM from 'react-dom'

class GifImage extends React.Component {
  constructor(props){
    super(props);
    props.gifprops.url = props.gifprops.url.replace('.gifv', '.mp4');

  }
  componentDidMount(){
    console.log('this should be url ', this.props.gifprops.url)
  }

  // handleClick (){
  //   var context = this;
  //   this.props.onClick(context.props.gifprops.score)
  // }
  render() {
      return (
      <div>
        <video preload="auto" autoPlay="autoplay" loop="loop" score={this.props.gifprops.score} onClick={(e)=>{

                console.log('whats e.target' , this.props.gifprops.score)
                this.props.onClick(this.props.gifprops.score)}} >
          <source
            src={ this.props.gifprops.url}
            type="video/mp4">
          </source>


        </video>

      </div>
    );
  }
}

export default GifImage;
