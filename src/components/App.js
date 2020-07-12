import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.scss";

import Navcustom from "./NavBar/NavBar.component";
import Search from "./Search/Search.component";
import Loader from "./Spinner/Loader.component";
import Footer from "./Footer/Footer.component";
import DropdownBtn from "./Dropdown/DropDown.component";
import RenderList from "./RenderList/RenderList.component";
import Pagination from "./Pagination/Pagination.component";

// Libraries
import moment from "moment";

// Api
import { getTopStories } from "../api/api";

class App extends React.Component {
  state = {
    posts: [
      {
        user: null,
        id: null,
        date: null,
        title: null,
        type: null,
        url: null,
        points: null,
        comments: null,
      },
    ],

    searchTerm: "",
    isLoading: true,
    searchTopic: ["All", "Stories"],
    searchBy: ["Popularity", "Date"],
    searchFor: [
      "All Time",
      "Last 24h",
      "Past Week",
      "Past Month",
      "Past Year",
      "Custom Range",
    ],
    currentList: "Stories",
    currentBy: "Popularity",
    lastPost: "All Time",
    currentPage: 1,
    hitsPerPage: 10,
  };

  getStoryIds = async () => {
    return await getTopStories().then((res) => {
      const response = res.map((s) => s);
      return response;
    });
  };

  setStories = () => {
    this.getStoryIds()
      .then((res) => {
        res.map((story) => {
          this.setState((prevState) => ({
            posts: [
              ...prevState.posts,
              {
                user: story.by,
                id: story.id,
                date: moment.unix(story.time).format("YYYY-MM-DD"),
                title: story.title,
                type: story.type,
                url: story.url,
                points: story.score,
                comments: story.kids,
              },
            ],
            isLoading: false,
          }));
          return null;
        });
      })
      .catch((error) => console.log(error));
    if (!this.state.posts[0].length) {
      this.state.posts.splice(0, 1);
    }
  };

  componentDidMount() {
    this.setStories();
  }

  componentDidUpdate(prevState) {
    if (this.state.posts !== prevState.posts) {
      return null;
    } else {
      this.setStories();
    }
  }

  onKeyUp = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
  };

  setCurrentList = (e) => {
    this.setState({
      currentList: e.target.text,
      currentPage: 1,
    });
  };

  setCurrentBy = async (e) => {
    await this.setState({
      currentBy: e.target.text,
    });
    await this.orderBy();
  };

  setLastPost = async (e) => {
    await this.setState({
      lastPost: e.target.text,
    });
    await this.renderLastPosts();
  };

  orderBy = () => {
    if (this.state.currentBy === "Date") {
      this.setState({
        posts: this.state.posts.sort(
          (a, b) =>
            new Date(...b.date.split("/").reverse()) -
            new Date(...a.date.split("/").reverse())
        ),
      });
    }

    if (this.state.currentBy === "Popularity") {
      this.setState({
        posts: this.state.posts.sort((a, b) => (a.points < b.points ? 1 : -1)),
      });
    }
  };

  renderLastPosts = () => {
    // Get current posts
    const indexOfLastPost = this.state.currentPage * this.state.hitsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.hitsPerPage;
    const currentPosts = this.state.posts.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    if (this.state.currentList === "Stories") {
      switch (this.state.lastPost) {
        case "Last 24h":
          let postFilteredOneDay = currentPosts.filter((post) => {
            const lastDay = moment()
              .subtract(1, "days")
              .endOf("day")
              .format("YYYY-MM-DD");
            return lastDay <= post.date;
          });
          return postFilteredOneDay;
        case "Past Week":
          let postFilteredWeek = currentPosts.filter((post) => {
            const lastWeek = moment()
              .subtract(1, "weeks")
              .endOf("week")
              .format("YYYY-MM-DD");
            return lastWeek <= post.date;
          });
          return postFilteredWeek;
        case "Past Month":
          let postFilteredMonth = currentPosts.filter((post) => {
            const lastMonth = moment()
              .subtract(1, "months")
              .endOf("month")
              .format("YYYY-MM-DD");
            return lastMonth <= post.date;
          });
          return postFilteredMonth;
        case "Past Year":
          let postFilteredYear = currentPosts.filter((post) => {
            const lastYear = moment()
              .subtract(1, "years")
              .endOf("year")
              .format("YYYY-MM-DD");
            return lastYear <= post.date;
          });
          return postFilteredYear;
        case "Custom Range":
          break;
        default:
          return <div>Default state</div>;
      }
    } else {
      switch (this.state.lastPost) {
        case "Last 24h":
          let postFilteredOneDay = currentPosts.filter((post) => {
            const lastDay = moment()
              .subtract(1, "days")
              .endOf("day")
              .format("YYYY-MM-DD");
            return lastDay <= post.date;
          });
          return postFilteredOneDay;
        case "Past Week":
          let postFilteredWeek = currentPosts.filter((post) => {
            const lastWeek = moment()
              .subtract(1, "weeks")
              .endOf("week")
              .format("YYYY-MM-DD");
            return lastWeek <= post.date;
          });
          return postFilteredWeek;
        case "Past Month":
          let postFilteredMonth = currentPosts.filter((post) => {
            const lastMonth = moment()
              .subtract(1, "months")
              .endOf("month")
              .format("YYYY-MM-DD");
            return lastMonth <= post.date;
          });
          return postFilteredMonth;
        case "Past Year":
          let postFilteredYear = currentPosts.filter((post) => {
            const lastYear = moment()
              .subtract(1, "years")
              .endOf("year")
              .format("YYYY-MM-DD");
            return lastYear <= post.date;
          });
          return postFilteredYear;
        case "Custom Range":
          break;
        default:
          return <div>Default state</div>;
      }
    }
  };

  setCurrentPage = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  paginate = (pageNumber) => {
    this.setCurrentPage(pageNumber);
  };

  renderDomLoadingTime() {
    let startTime = window.performance.now();
    let endTime = window.performance.now();
    let time = endTime - startTime;
    return time.toFixed(3);
  }

  renderResultsNumber = () => {
    switch (this.state.currentList) {
      case "All":
        return this.state.posts.length;
      case "Stories":
        return this.state.posts.length;
      default:
        return null;
    }
  };

  hanldeChangeHitsPerPage = (e) => {
    this.setState({ hitsPerPage: parseInt(e.target.value) });
  };

  hanldeChangeCurrentList = (e) => {
    this.setState({ currentList: e.target.value });
  };

  handleChangeCurrentBy = (e) => {
    this.setState({
      currentBy: e.target.value,
    });
    this.orderBy();
  };

  handleChangeLastPost = async (e) => {
    await this.setState({ lastPost: e.target.value });
    await this.renderLastPosts();
  };

  render() {
    // Get current posts
    const indexOfLastPost = this.state.currentPage * this.state.hitsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.hitsPerPage;
    const currentPosts = this.state.posts.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    this.renderDomLoadingTime();
    if (this.state.isLoading) {
      return <Loader text={"Loading..."} />;
    } else {
      return (
        <div className="App">
          <Router basename="/">
            <Row>
              <Col sm={12} className="bg-grey">
                <Navcustom />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "15px",
                    width: "80%",
                    margin: "auto",
                  }}
                >
                  <Search
                    searchTerm={this.state.searchTerm}
                    onKeyUp={(e) => this.onKeyUp(e)}
                  />
                  <Row
                    className="filter"
                    style={{ display: "block-inline", minWidth: "10%" }}
                  >
                    <Col sm={12} md={8} lg={6}>
                      <div className="d-flex dropdowns">
                        <p style={{ fontSize: "1rem", color: "#737373" }}>
                          By{" "}
                        </p>
                        <DropdownBtn
                          onClick={(e) => {
                            this.setCurrentBy(e);
                            this.orderBy(e);
                          }}
                          defaultValue={this.state.currentBy}
                          dropChilds={this.state.searchBy}
                        />
                        <p
                          style={{
                            fontSize: "1rem",
                            color: "#737373",
                            marginLeft: "10px",
                          }}
                        >
                          For{" "}
                        </p>
                        <DropdownBtn
                          onClick={(e) => this.setLastPost(e)}
                          defaultValue={this.state.lastPost}
                          dropChilds={this.state.searchFor}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
                <Switch>
                  <Route exact path="/">
                    <RenderList
                      currentList={this.state.currentList}
                      renderLastPost={() => this.renderLastPosts()}
                      lastPost={this.state.lastPost}
                      posts={currentPosts}
                      searchTerm={this.state.searchTerm}
                    />
                    <Pagination
                      hitsPerPage={this.state.hitsPerPage}
                      totalPosts={this.renderResultsNumber()}
                      currentPage={this.state.currentPage}
                      paginate={this.paginate}
                      posts={currentPosts}
                      style={{ width: "60%", margin: "auto" }}
                    />
                  </Route>
                </Switch>
              </Col>
              <Col sm={12} className="p-0">
                <Footer />
              </Col>
            </Row>
          </Router>
        </div>
      );
    }
  }
}

export default App;
