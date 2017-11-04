// //once login, send off to the server
//   //get request to see if logged in or not
// import React from 'react'
// import ReactDOM from 'react-dom'
//
// class Login extends React.Component {
//   constructor(props){
//     super(props);
//     this.state={
//       isLoginPage: true,
//       isSignUpPage: false,
//       username: '',
//       password: ''
//     }
//   }
//
//   componentDidMount(){
//
//   }
//
//   handleSubmit(){
//     $.post('/login',{'username': this.state.username,
//                       'password': this.state.password },function(data){
//                         console.log('this is data posted ', data);
//                       })
//   }
//
//   handleSignUp(){
//     $.post('/signup',{'username': this.state.username,
//                       'password': this.state.password },function(data){
//                         console.log('this is data posted ', data);
//                       })
//   }
//   showSignUpPage(){
//     this.setState({
//       isLoginPage: false,
//       isSignUpPage: true,
//       username: '',
//       password: ''
//     })
//   }
//
//   showLoginPage(){
//     this.setState({
//       isLoginPage: true,
//       isSignUpPage: false,
//       username: '',
//       password: ''
//     })
//   }
//
//   render(){
//     const signUpPage = (
//               <h2>Sign up</h2>
//               <form onSubmit={this.handleSignUp} className="signup_form">
//                   <div>
//                     <label for="username">Username:</label>
//                     <input id="username" type="text" name="username" onChange={(e)=>this.setState({username:e.target.value})}>
//                   </div>
//                   <div>
//                     <label for="password">Password:</label>
//                     <input id="password" type="password" name="password" onChange={(e)=>this.setState({password:e.target.value})}>
//                   </div>
//                   <div>
//                     <input type="submit" value="Sign up">
//                   </div>
//               </form>
//               <p>
//                 <button type="submit" onClick={this.showLoginPage}>Login to your account &rarr;</button>
//               <p>
//             );
//
//
//       const loginPage = (
//             <h2>Login</h2>
//             <form onSubmit={this.handleSubmit} className="login_form">
//                 <div>
//                   <label for="username">Username:</label>
//                   <input id="username" type="text" name="username" onChange={(e)=>this.setState({username:e.target.value})}>
//                 </div>
//                 <div>
//                   <label for="password">Password:</label>
//                   <input id="password" type="password" name="password" onChange={(e)=>this.setState({password:e.target.value})}>
//                 </div>
//                 <div>
//                   <input type="submit" value="Login">
//                 </div>
//             </form>
//             <p>
//               <button type="submit" onClick={this.showSignUpPage}>Create an Account &rarr;</button>
//             <p>
//         );
//
//   return {this.state.showSignUpPage ? signUpPage : loginPage}
// }
// }
//
// export default Login;
