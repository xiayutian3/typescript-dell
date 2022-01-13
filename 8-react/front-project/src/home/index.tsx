import React, { Component } from "react";
import { Button, message } from "antd";
import axios from "axios";
import { Navigate } from "react-router-dom";
import ReactEcharts from "echarts-for-react";
import moment from "moment";
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

// interface State {
//   isLogin: boolean;
// }
//泛型第一个是props类型，第二个是state的类型 (state的类型推导)
// class Home extends Component<{}, State> {
//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       isLogin: true,
//     };
//   }

interface CourseItem {
  title: string;
  year: string;
}

interface State {
  load: boolean;
  isLogin: boolean;
  data: {
    [key: string]: CourseItem[];
  };
}

//可以这样，就会把react中的state类型复写掉(state的类型推导)
class Home extends Component {
  state: State = {
    load: false,
    isLogin: true,
    data: {},
  };

  // 退出登录
  handleLoginClick = (e: React.MouseEvent) => {
    axios.get("/api/logout").then((res) => {
      if (res.data?.data) {
        this.setState({
          isLogin: false,
        });
      }
    });
  };

  //爬取数据
  handleCrowllerClick = () => {
    axios.get("/api/getdata").then((res) => {
      if (res.data?.data) {
        message.success("爬取成功");
      } else {
        message.error("爬取失败");
      }
    });
  };
  //echarts 图标  echarts.EChartsOption的类型注解
  getOption: () => echarts.EChartsOption = () => {
    const { data } = this.state;
    //收集标题
    const courseNames: string[] = [];
    const times: string[] = [];
    const tempData: {
      [key: string]: string[];
    } = {};
    for (let i in data) {
      times.push(moment(Number(i)).format("MM-DD HH:mm"));
      const item = data[i];
      item.forEach((innerItem) => {
        const {title, year} = innerItem
        if (courseNames.indexOf(title) === -1) {
          courseNames.push(title);
        }
        tempData[title]? tempData[title]?.push(year): (tempData[title] = [year])
      });
    }
    // console.log('courseNames: ', courseNames);
    const result:any[] = []
    for(let i in tempData){
      result.push({
        name: i,
        type: "line",
        data: tempData[i]
      })
    }
    return {
      title: {
        text: "学习治疗",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: courseNames,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: times,
      },
      yAxis: {
        type: "value",
      },
      series: result
    };
  };

  componentDidMount() {
    axios.get("/api/isLogin").then((res) => {
      if (!res.data?.data) {
        this.setState({
          isLogin: false,
          load: true,
        });
      } else {
        this.setState({
          load: true,
        });
      }
    });

    //获取展示数据
    axios.get("/api/showdata").then((res) => {
      if (res.data?.data) {
        console.log(res.data.data);
        this.setState({
          data: res.data.data,
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
            <div className="buttons">
              <Button type="primary" onClick={this.handleCrowllerClick}>
                爬取
              </Button>
              {/* <Button type="primary">展示</Button> */}
              <Button type="primary" onClick={this.handleLoginClick}>
                退出
              </Button>
            </div>

            <ReactEcharts option={this.getOption()}></ReactEcharts>
          </div>
        );
      }
      return null;
    }
    return <Navigate to="/login" />;
  }
}

export default Home;
