import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import GifImage from './GifImage.jsx'
import Login from './loginPage.jsx'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      imagesArr : [],
      score : 0,
      mostUpvotes: 0,
      isLoggedin: false
    }
    this.handleClick = this.handleClick.bind(this)
  }



componentDidMount(){
  var context = this;
  var oldArr = this.state.imagesArr.slice();
  console.log('arr length in state before get ', oldArr.length)
  $.get('/data',function(data){
    data.forEach(function(gif){
      oldArr.push(gif);
    });
    context.setState({
      imagesArr : oldArr
    }
    )
    console.log('arr length after ', context.state.imagesArr.length)
    var highestUpvote = context.state.imagesArr[0].score;
    console.log('this is highest upvote ', highestUpvote)
    context.state.imagesArr.forEach(function(gif){
      if(gif.score > highestUpvote){
        highestUpvote = gif.score;
      }
    })
    console.log('this is highst after ', highestUpvote)
    context.setState({
      mostUpvotes: highestUpvote
    })
  })

}



handleClick(score){
//to-do: check if the clicked gif has highest score(upvotes), score +1
    //repopulate gifs on the page
console.log('clicked score' , score)
// var context = this;

if(score===this.state.mostUpvotes){
  console.log('highest upvote clicked!!')
  alert('\uD83D\uDE00 \uD83D\uDE00 \uD83D\uDE00 YOU GOT IT! \uD83D\uDE00 \uD83D\uDE00 \uD83D\uDE00')
  this.setState({
    score : ++this.state.score
  })
}else {
  alert('\uD83D\uDE45 \uD83D\uDE45 \uD83D\uDE45 \uD83D\uDE45 \uD83D\uDE45 \uD83D\uDE45')
};
var context = this;
var newArr = [];

$.get('/data',function(data){
  data.forEach(function(gif){
    // console.log('these should be unseen gifs ' ,gif)
    newArr.push(gif);
  });
  // console.log(' this is before we update gif Arr ', context.state.imagesArr)
  context.setState({
    imagesArr : newArr
  })
  // console.log('this is after ', context.state.imagesArr)
  var highestUpvote = context.state.imagesArr[0].score;
  context.state.imagesArr.forEach(function(gif){
    if(gif.score > highestUpvote){
      highestUpvote = gif.score;
    }
  })
  context.setState({
    mostUpvotes: highestUpvote
  })
})
}

renderLoginPage(){
  this.setState({
    isLoggedin: true
  })
  return (
    <Login/>
  )
}

render() {
  var context = this;
  return(
    <div className="gif-gallery">
      <div className="score"> Your Score: {this.state.score}</div>
      <div className="gifs">
        {this.state.imagesArr.map(function(gif){
          return <GifImage gifprops={gif} onClick={context.handleClick} highestUpvote={context.state.mostUpvotes} key={gif.id}/>
        })}
      </div>
    </div>
  );

  }
}
//
// ReactDOM.render(
//   <Router history={browserHistory}>
    // <Route path='/' component={MasterPage}>
    // </Route>

//   </Router>,
//   document.getElementById('app-container')
// );


ReactDOM.render(<App/>,document.getElementById('App'));
