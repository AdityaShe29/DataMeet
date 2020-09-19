import React, { Component } from 'react';
import { Sparklines, SparklinesBars } from 'react-sparklines';
import { ProgressBar, Dropdown } from 'react-bootstrap';
import {Line, Bar, Doughnut, Pie, Scatter} from 'react-chartjs-2';

// import DatePicker from 'react-datepicker';
// import { Dropdown } from 'react-bootstrap';




export class Dashboard extends Component {
  data = {
    labels: ["Happy", "Sad", "Surprised", "Confused"],
    datasets: [{
      label: '# of Votes',
      data: [10, 11, 50, 30],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
      fill: false
    }]
};

options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }

};


  doughnutPieData = {
    datasets: [{
      data: [10, 10, 50, 30],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
    }],
  
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Happy',
      'Sad',
      'Surprised',
      'Confused'
    ]
  };
  
  doughnutPieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      startDate : new Date(),
      todos: [
        {
            id: 1,
            task: 'Pick up kids from school',
            isCompleted: false
        },
        {
            id: 2,
            task: 'Prepare for presentation',
            isCompleted: false
        },
        {
            id: 3,
            task: 'Print Statements',
            isCompleted: false
        },
        {
            id: 4,
            task: 'Create invoice',
            isCompleted: false
        },
        {
            id: 5,
            task: 'Call John',
            isCompleted: false
        }
    ],
    inputValue: '',
    }
    this.statusChangedHandler = this.statusChangedHandler.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  } 
  statusChangedHandler(event, id) {
    const todo = {...this.state.todos[id]};
    todo.isCompleted = event.target.checked;

    const todos = [...this.state.todos];
    todos[id] = todo;

    this.setState({
        todos: todos
    })
}

addTodo (event) {
    event.preventDefault();

    const todos = [...this.state.todos];
    todos.unshift({
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        task: this.state.inputValue,
        isCompleted: false
        
    })



    this.setState({
        todos: todos,
        inputValue: ''
    })
}

removeTodo (index) {
    const todos = [...this.state.todos];
    todos.splice(index, 1);

    this.setState({
        todos: todos
    })
}

inputChangeHandler(event) {
    this.setState({
        inputValue: event.target.value
    });
}

toggleProBanner() {
  document.querySelector('.proBanner').classList.toggle("hide");
}

getCurrentDate(separator=''){

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
  }
  
  render () {
    return (
      <div>
        <div className="page-header">
          <h3 class = "page-title">View Your Class's Analytics</h3>
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="!#">DataMeet</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Student Analytics</li>
          </ol>
        </div>
        <div className="row">
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Real Time Student Emotions (Bar Chart)</h4>
                                <Bar data={this.data} options={this.options} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Real Time Student Emotions (Doughnut Chart)</h4>
                                <Doughnut data={this.doughnutPieData} options={this.doughnutPieOptions} />  
                            </div>
                        </div>
                    </div>
                </div>
        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
            <div className="card card-statistics">
              <div className="card-body">
                <div className="clearfix">
                  <div className="float-left">
                  <img src={require("../../assets/images/ThumbsUp_Logo2.svg")} padding = "15px" width = "60px" alt="logo" />
                  </div>
                  <div className="float-right">
                    <p className="mb-1 text-right text-dark">Percent of Class <br></br>Who Say They Got It</p>
                    <div className="fluid-container">
                      <h3 className="font-weight-medium text-right mb-0 text-dark">35%</h3>
                    </div>
                  </div>
                </div>
                <p className="text-muted mt-3 mb-0">
                  <i className="mdi mdi-bookmark-outline mr-1" aria-hidden="true"></i> As per student submissions </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
            <div className="card card-statistics">
              <div className="card-body">
                <div className="clearfix">
                  <div className="float-left">
                  <img src={require("../../assets/images/ThumbsDown_Logo.svg")} padding = "15px" width = "60px" alt="logo" />
                  </div>
                  <div className="float-right">
                    <p className="mb-0 text-right text-dark">Percent of Class <br></br>Who Still Need Help</p>
                    <div className="fluid-container">
                      <h3 className="font-weight-medium text-right mb-0 text-dark">65%</h3>
                    </div>
                  </div>
                </div>
                <p className="text-muted mt-3 mb-0">
                  <i className="mdi mdi-bookmark-outline mr-1" aria-hidden="true"></i> As per student submissions </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
            <div className="card card-statistics">
              <div className="card-body">
                <div className="clearfix">
                  <div className="float-left">
                    <i className="mdi mdi-poll-box text-success icon-lg"></i>
                  </div>
                  <div className="float-right">
                    <p className="mb-0 text-right text-dark">Total Meeting<br></br>Time Analyzed</p>
                    <div className="fluid-container">
                      <h3 className="font-weight-medium text-right mb-0 text-dark">45</h3>
                    </div>
                  </div>
                </div>
                <p className="text-muted mt-3 mb-0">
                  <i className="mdi mdi-calendar mr-1" aria-hidden="true"></i> In Minutes </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
            <div className="card card-statistics">
              <div className="card-body">
                <div className="clearfix">
                  <div className="float-left">
                    <i className="mdi mdi-account-box-multiple text-info icon-lg"></i>
                  </div>
                  <div className="float-right">
                    <p className="mb-0 text-right text-dark">Total Number <br></br>Of Students</p>
                    <div className="fluid-container">
                      <h3 className="font-weight-medium text-right mb-0 text-dark">43</h3>
                    </div>
                  </div>
                </div>
                <p className="text-muted mt-3 mb-0">
                  <i className="mdi mdi-reload mr-1" aria-hidden="true"></i> Across Only This Class </p>
              </div>
            </div>
          </div>
        </div>
        {/*}
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="card-title mb-0">Product Analysis</h2>
                  <div className="wrapper d-flex">
                    <div className="d-flex align-items-center mr-3">
                      <span className="dot-indicator bg-success"></span>
                      <p className="mb-0 ml-2 text-muted">Product</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="dot-indicator bg-primary"></span>
                      <p className="mb-0 ml-2 text-muted">Resources</p>
                    </div>
                  </div>
                </div>
                <div className="chart-container">
                <Line data={this.areaData} options={this.areaOptions}  datasetKeyProvider={this.datasetKeyProvider} height={80} />
                </div>
              </div>
            </div>
          </div>
        </div>
    */}
        <div className="row">
          <div className="col-xl-4 col-lg-6 col-sm-6  grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Todo</h4>
                <form  className="add-items d-lg-flex" onSubmit={this.addTodo}>
                  <input 
                      type="text" 
                      className="form-control h-auto" 
                      placeholder="What do you need to do today?" 
                      value={this.state.inputValue} 
                      onChange={this.inputChangeHandler}
                      required />
                  <button type="submit" className="btn btn-primary font-weight-bold ml-0 mt-2 mt-lg-0">Add</button>
                </form>
                <div className="list-wrapper">
                  <ul className="d-flex flex-column todo-list todo-padding-lg">
                    {this.state.todos.map((todo, index) =>{
                        return <ListItem 
                        isCompleted={todo.isCompleted}
                        changed={(event) => this.statusChangedHandler(event, index)}
                        key={todo.id}
                        remove={() => this.removeTodo(index) }
                        >{todo.task}</ListItem>
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Schedules</h4>
                <div className="shedule-list d-xl-flex align-items-center justify-content-between mb-3">
                  <h3>{this.getCurrentDate('/')}</h3>
                  <small>21 Events</small>
                </div>
                <div className="event border-bottom py-3">
                  <p className="mb-2 font-weight-medium">Skype call with class</p>
                  <div className="d-flex align-items-center">
                    <div className="badge badge-success">3:45 PM</div>
                    <small className="text-muted ml-2">Cambridge, Massachusetts</small>
                    
                  </div>
                </div>
                <div className="event py-3 border-bottom">
                  <p className="mb-2 font-weight-medium">Skype call with class</p>
                  <div className="d-flex  align-items-center">
                    <div className="badge badge-warning">5:00 PM</div>
                    <small className="text-muted ml-2">Cambridge, Massachusetts</small>
                    
                  </div>
                </div>
                <div className="event py-3">
                  <p className="mb-2 font-weight-medium">Help Session with Charlie</p>
                  <div className="d-flex  align-items-center">
                    <div className="badge badge-danger">7:30 PM</div>
                    <small className="text-muted ml-2">San Diego, CA</small>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-sm-6 grid-margin stretch-card">
          <div className="card">
              <div className="card-body">
                <h4 className="card-title">Average Class Emotion</h4>
                <p>One image to collectively show your class's understanding.</p>
                <div width = '100%'>
                <img width = '100%' src = {require("../../assets/images/FlatIcon_Neutral.svg")}></img> 
                </div>
                </div>
              </div>
          </div>
          {/*
          <div className="col-xl-4 col-lg-12 col-sm-12 grid-margin stretch-card">
            <div className="row flex-grow">
              <div className="col-xl-12 col-lg-6 col-sm-6 grid-margin-0 grid-margin-xl stretch-card">
                <div className="card card-revenue">
                  <div className="card-body">
                    <div className="d-flex w-100 h-100 justify-content-between align-items-center">
                      <div className="mr-auto">
                        <p className="highlight-text text-white"> $168.90 </p>
                        <p className="text-white"> This Month </p>
                        <div className="badge badge-pill"> 18% </div>
                      </div>
                      <div className="ml-auto mt-2 mt-xl-0">
                        <Sparklines data={[4,3,10,9,4,3,8,6,7,8]} style={{ width: "110px", height:"70px" }}>
                          <SparklinesBars barWidth = {4} style={{ fill: "#fff" }} />
                        </Sparklines>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-xl-12 col-lg-6 col-sm-6 stretch-card">
                <div className="card card-revenue-table mt-4 mt-sm-0 mt-xl-4">
                  <div className="card-body">
                    <div className="revenue-item d-flex">
                      <div className="revenue-desc">
                        <h6>Member Profit</h6>
                        <p className="font-weight-light"> Average Weekly Profit </p>
                      </div>
                      <div className="revenue-amount">
                        <p className="text-secondary"> +168.900 </p>
                      </div>
                    </div>
                    <div className="revenue-item d-flex">
                      <div className="revenue-desc">
                        <h6>Total Profit</h6>
                        <p className="font-weight-light"> Weekly Customer Orders </p>
                      </div>
                      <div className="revenue-amount">
                        <p className="text-primary"> +6890.00 </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          */}
        </div>
        
        {/*
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-5 d-flex align-items-center">
                    <Doughnut data={this.usersDoughnutChartData} options={this.usersDoughnutChartOptions} width= {180} />
                  </div>
                  <div className="col-md-7">
                    <h4 className="card-title font-weight-medium mb-0 d-none d-md-block">Active Users</h4>
                    <div className="wrapper mt-4">
                      <div className="d-flex justify-content-between mb-2">
                        <div className="d-flex align-items-center">
                          <p className="mb-0 font-weight-medium">67,550</p>
                          <small className="text-muted ml-2">Email account</small>
                        </div>
                        <p className="mb-0 font-weight-medium">80%</p>
                      </div>
                        <ProgressBar variant="primary" now={80}/>
                    </div>
                    <div className="wrapper mt-4">
                      <div className="d-flex justify-content-between mb-2">
                        <div className="d-flex align-items-center">
                          <p className="mb-0 font-weight-medium">21,435</p>
                          <small className="text-muted ml-2">Requests</small>
                        </div>
                        <p className="mb-0 font-weight-medium">34%</p>
                      </div>
                        <ProgressBar variant="success" now={34}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-7">
                    <h4 className="card-title font-weight-medium mb-3">Amount Due</h4>
                    <h1 className="font-weight-medium mb-0 text-dark">$5998</h1>
                    <p className="text-muted">Milestone Completed</p>
                    <p className="mb-0">Payment for next week</p>
                  </div>
                  <div className="col-md-5 d-flex align-items-end mt-4 mt-md-0">
                    <Bar data={this.amountDueBarData} options={this.amountDueBarOptions} />    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body py-5">
                <div className="d-flex flex-row justify-content-center align-items">
                  <i className="mdi mdi-facebook text-facebook icon-lg"></i>
                  <div className="ml-3">
                    <h6 className="text-facebook font-weight-semibold mb-0">2.62 Subscribers</h6>
                    <p className="text-muted card-text">You main list growing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body py-5">
                <div className="d-flex flex-row justify-content-center align-items">
                  <i className="mdi mdi-google-plus text-google icon-lg"></i>
                  <div className="ml-3">
                    <h6 className="text-google font-weight-semibold mb-0">3.4k Followers</h6>
                    <p className="text-muted card-text">You main list growing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body py-5">
                <div className="d-flex flex-row justify-content-center align-items">
                  <i className="mdi mdi-twitter text-twitter icon-lg"></i>
                  <div className="ml-3">
                    <h6 className="text-twitter font-weight-semibold mb-0">3k followers</h6>
                    <p className="text-muted card-text">You main list growing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Orders</h4>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th> # </th>
                        <th> First name </th>
                        <th> Progress </th>
                        <th> Amount </th>
                        <th> Sales </th>
                        <th> Deadline </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-weight-medium"> 1 </td>
                        <td> Herman Beck </td>
                        <td>
                          <ProgressBar variant="success" striped now={25}/>
                        </td>
                        <td> $ 77.99 </td>
                        <td className="text-danger"> 53.64% <i className="mdi mdi-arrow-down"></i>
                        </td>
                        <td> May 15, 2015 </td>
                      </tr>
                      <tr>
                        <td className="font-weight-medium"> 2 </td>
                        <td> Messsy Adam </td>
                        <td>
                          <ProgressBar variant="danger" striped now={75}/>
                        </td>
                        <td> $245.30 </td>
                        <td className="text-success"> 24.56% <i className="mdi mdi-arrow-up"></i>
                        </td>
                        <td> July 1, 2015 </td>
                      </tr>
                      <tr>
                        <td className="font-weight-medium"> 3 </td>
                        <td> John Richards </td>
                        <td>
                          <ProgressBar variant="warning" striped now={90}/>
                        </td>
                        <td> $138.00 </td>
                        <td className="text-danger"> 28.76% <i className="mdi mdi-arrow-down"></i>
                        </td>
                        <td> Apr 12, 2015 </td>
                      </tr>
                      <tr>
                        <td className="font-weight-medium"> 4 </td>
                        <td> Peter Meggik </td>
                        <td>
                          <ProgressBar variant="primary" striped now={50}/>
                        </td>
                        <td> $ 77.99 </td>
                        <td className="text-danger"> 53.45% <i className="mdi mdi-arrow-down"></i>
                        </td>
                        <td> May 15, 2015 </td>
                      </tr>
                      <tr>
                        <td className="font-weight-medium"> 5 </td>
                        <td> Edward </td>
                        <td>
                          <ProgressBar variant="danger" striped now={35}/>
                        </td>
                        <td> $ 160.25 </td>
                        <td className="text-success"> 18.32% <i className="mdi mdi-arrow-up"></i>
                        </td>
                        <td> May 03, 2015 </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}
        {/*
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Manage Tickets</h5>
                <div className="fluid-container">
                  <div className="row ticket-card mt-3 pb-2 border-bottom pb-3 mb-3">
                    <div className="col-md-1">
                      <img className="img-sm rounded-circle mb-4 mb-md-0 d-block mx-md-auto" src={require("../../assets/images/faces/face1.jpg")} alt="profile" /> </div>
                    <div className="ticket-details col-md-9">
                      <div className="d-lg-flex">
                        <p className="text-dark font-weight-semibold mr-2 mb-0 no-wrap">James :</p>
                        <p className="text-primary mr-1 mb-0">[#23047]</p>
                        <p className="mb-0 ellipsis">Donec rutrum congue leo eget malesuada.</p>
                      </div>
                      <p className="text-gray ellipsis mb-2">Donec rutrum congue leo eget malesuada. Quisque velit nisi, pretium ut lacinia in, elementum id enim vivamus. </p>
                      <div className="row text-gray d-md-flex d-none">
                        <div className="col-4 d-flex">
                          <small className="mb-0 mr-2 text-muted text-muted">Last responded :</small>
                          <small className="Last-responded mr-2 mb-0 text-muted text-muted">3 hours ago</small>
                        </div>
                        <div className="col-4 d-flex">
                          <small className="mb-0 mr-2 text-muted text-muted">Due in :</small>
                          <small className="Last-responded mr-2 mb-0 text-muted text-muted">2 Days</small>
                        </div>
                      </div>
                    </div>
                    <div className="ticket-actions col-md-2">
                      <div className="btn-group dropdown">
                        <Dropdown>
                          <Dropdown.Toggle className="btn btn-success btn-sm">
                            Manage
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="navbar-dropdown preview-list">
                            <Dropdown.Item>
                              Quick reply
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Another action
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Resolve Issue
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Close Issue
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <div className="row ticket-card mt-3 pb-2 border-bottom pb-3 mb-3">
                    <div className="col-md-1">
                      <img className="img-sm rounded-circle mb-4 mb-md-0 d-block mx-md-auto" src={require("../../assets/images/faces/face2.jpg")} alt="profile" /> </div>
                    <div className="ticket-details col-md-9">
                      <div className="d-lg-flex">
                        <p className="text-dark font-weight-semibold mr-2 mb-0 no-wrap">Stella :</p>
                        <p className="text-primary mr-1 mb-0">[#23135]</p>
                        <p className="mb-0 ellipsis">Curabitur aliquet quam id dui posuere blandit.</p>
                      </div>
                      <p className="text-gray ellipsis mb-2">Pellentesque in ipsum id orci porta dapibus. Sed porttitor lectus nibh. Curabitur non nulla sit amet nisl. </p>
                      <div className="row text-gray d-md-flex d-none">
                        <div className="col-4 d-flex">
                          <small className="mb-0 mr-2 text-muted">Last responded :</small>
                          <small className="Last-responded mr-2 mb-0 text-muted">3 hours ago</small>
                        </div>
                        <div className="col-4 d-flex">
                          <small className="mb-0 mr-2 text-muted">Due in :</small>
                          <small className="Last-responded mr-2 mb-0 text-muted">2 Days</small>
                        </div>
                      </div>
                    </div>
                    <div className="ticket-actions col-md-2">
                      <div className="btn-group dropdown">
                        <Dropdown>
                          <Dropdown.Toggle className="btn btn-success btn-sm">
                            Manage
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="navbar-dropdown preview-list">
                            <Dropdown.Item>
                              Quick reply
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Another action
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Resolve Issue
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Close Issue
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <div className="row ticket-card mt-3">
                    <div className="col-md-1">
                      <img className="img-sm rounded-circle mb-4 mb-md-0 d-block mx-md-auto" src={require("../../assets/images/faces/face3.jpg")} alt="profile" /> </div>
                    <div className="ticket-details col-md-9">
                      <div className="d-lg-flex">
                        <p className="text-dark font-weight-semibold mr-2 mb-0 no-wrap">John Doe :</p>
                        <p className="text-primary mr-1 mb-0">[#23246]</p>
                        <p className="mb-0 ellipsis">Mauris blandit aliquet elit, eget tincidunt nibh pulvinar.</p>
                      </div>
                      <p className="text-gray ellipsis mb-2">Nulla quis lorem ut libero malesuada feugiat. Proin eget tortor risus. Lorem ipsum dolor sit amet.</p>
                      <div className="row text-gray d-md-flex d-none">
                        <div className="col-4 d-flex">
                          <small className="mb-0 mr-2 text-muted">Last responded :</small>
                          <small className="Last-responded mr-2 mb-0 text-muted">3 hours ago</small>
                        </div>
                        <div className="col-4 d-flex">
                          <small className="mb-0 mr-2 text-muted">Due in :</small>
                          <small className="Last-responded mr-2 mb-0 text-muted">2 Days</small>
                        </div>
                      </div>
                    </div>
                    <div className="ticket-actions col-md-2">
                      <div className="btn-group dropdown">
                        <Dropdown>
                          <Dropdown.Toggle className="btn btn-success dropdown-toggle btn-sm">
                            Manage
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="navbar-dropdown preview-list">
                            <Dropdown.Item>
                              Quick reply
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Another action
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Resolve Issue
                            </Dropdown.Item>
                            <Dropdown.Item>
                              Close Issue
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}
      </div> 
    );
  }
}
const ListItem = (props) => {
  return (
      <li className={(props.isCompleted ? 'completed' : null)}>
          <div className="form-check form-check-success m-0 align-items-start">
              <label htmlFor="" className="form-check-label font-weight-medium"> 
                  <input className="checkbox" type="checkbox" 
                      checked={props.isCompleted} 
                      onChange={props.changed} 
                      /> {props.children} <i className="input-helper"></i>
              </label>
          </div>
          <i className="remove mdi mdi-close-circle-outline" onClick={props.remove}></i>
      </li>
  )
};
export default Dashboard;