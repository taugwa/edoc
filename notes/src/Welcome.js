import React, {Component} from "react";


class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Welcome: "",
        };
    }
    componentDidMount() {
        fetch("http://localhost:3000/Welcome",{
            method:"POST",
            crossDomain:true,
            headers:{
              "Content-Type":"application/json",
              Accept:"application/json",
              "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
            token: window.localStorage.getItem("token"),  
            }),
          }).then((res) => res.json())
          .then((data) => {
            console.log(data,"Welcome");
            this.setState({Welcome: data.data});
          });
        }
    
    render() {
        return (
            <div> 
                Welcome: <h1>{this.state.Welcome.Username} !</h1>
            </div>
        )
    }
}
export default Welcome;