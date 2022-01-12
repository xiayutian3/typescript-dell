import React, { Component } from "react";
import { Button } from "antd";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "./style.css";

// // const Home:React.FC = ()=>{
// //也可以这样
// const Home: () => JSX.Element = () => {
//   return (
//     <div className="home-page">
//       <Button type="primary">爬取</Button>
//       <Button type="primary">展示</Button>
//       <Button type="primary">退出</Button>
//     </div>
//   );
// };

//class语法组件

interface State {
  isLogin: boolean;
}
//泛型第一个是props类型，第二个是state的类型 (state的类型推导)
// class Home extends Component<{}, State> {
//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       isLogin: true,
//     };
//   }

//可以这样，就会把react中的state类型复写掉(state的类型推导)
class Home extends Component {
  state = {
    load: false,
    isLogin: true,
  };

  componentDidMount() {
    axios.get("/api/isLogin").then((res) => {
      if (!res.data?.data) {
        this.setState({
          isLogin: false,
          load: true,
        });
      }
    });
  }

  render() {
    const { isLogin, load } = this.state;
    if (isLogin) {
      if (load) {
        return (
          <div className="home-page">
            <Button type="primary">爬取</Button>
            <Button type="primary">展示</Button>
            <Button type="primary">退出</Button>
          </div>
        );
      }
      return null;
    }
    return <Navigate to='/login' />
  }
}

export default Home;
