import React from 'react';
import './App.css';
import api from './api';
// import PostView from './Components/PostView'

import Container from '@material-ui/core/Container';
// import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';






class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      who:'',
      title: '',
      content: '',
      results: [],
    }
  }

  deletealert = (item) => {
    if (window.confirm('신청곡을 취소하시겠습니까?')){
      this.handlingDelete(item)
    } else {
      return false
    }
  }

  updatealert = (id, _who, _title, _content) => {
    if (window.confirm('신청곡을 수정하시겠습니까?')){
      if (_who === "" || _title === "" || _content === ""){
        window.alert("신청인, 가수, 신청곡을 작성하세요!!")
      } else {
        this.handlingUpdate(id, _who, _title, _content)
      }
    } else {
      return false
    }
  }

  componentDidMount() {
    this.getPosts()
  }

  async getPosts() {
    const _results = await api.getAllPosts()
    console.log(_results)
    // _results.data 아무 것도 없음!
    this.setState({results: _results.data})
    // console.log(_results)
  }


  handlingChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  
  handlingSubmit = async (event) => {
    event.preventDefault() // event 기능 --> 막는다
    let result = await api.createPost({who: this.state.who, title: this.state.title, content: this.state.content})
    console.log("완료됨!", result)
    this.setState({who:'', title:'', content:''}) // 쓰고나서 input 초기화
    this.getPosts()
  }

  handlingDelete = async (id) => {
    // console.log(event.target)
    await api.deletePost(id)
    this.getPosts()
  }

  handlingUpdate = async (id,_who, _title, _content) => {
    await api.updatePost(id, _who, _title, _content)
    this.setState({who:'', title:'', content:''})
    this.getPosts()
  }

  render() {
    const fontstyle = {
      fontSize: 15,
      fontWeight: "900", 
    }
  return (
    <div className="App">
      <Container maxWidth="lg">
        <h1>🎤노래 신청🎤</h1>
        <div className="flex-row">
          <div className="PostSection">
            <h1>무슨 노래??</h1>
            <Card className={'card'}>
                <CardContent>
                <Typography>
            <form className="PostingForm" onSubmit={this.handlingSubmit}>
              <h3>신청인</h3>
              <TextField 
                id="standard-basic"
                name = "who"
                value = {this.state.who}
                onChange = {this.handlingChange}
              />
              <h3>가수</h3>
              <TextField 
                id="standard-basic"
                name = "title"
                value = {this.state.title}
                onChange = {this.handlingChange}
              />
              <h3>노래 제목</h3>
              <TextField 
                id="standard-basic"
                name = "content"
                value = {this.state.content}
                onChange = {this.handlingChange}
              />
              <p></p>
              <Button variant="contained" color="primary" type="submit">신청곡 추가</Button>
            </form>
            </Typography>
          </CardContent>
          </Card>
          </div>

          <div className="ViewSection">
            <h1>신청곡 리스트</h1>
              <TableContainer component={Paper}>
                <Table arai-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={fontstyle}>순서</TableCell>
                      <TableCell style={fontstyle}>신청인</TableCell>
                      <TableCell style={fontstyle}>가수</TableCell>
                      <TableCell style={fontstyle}>노래 제목</TableCell>
                      <TableCell style={fontstyle}>삭제</TableCell>
                      <TableCell style={fontstyle}>수정</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  { this.state.results.map((post) =>
                    <TableRow key={post.id}>
                      <TableCell component="th" scope="row">
                        {post.id}
                      </TableCell>
                      <TableCell style={fontstyle}>{post.who}</TableCell>
                      <TableCell style={fontstyle}>{post.title}</TableCell>
                      <TableCell style={fontstyle}>{post.content}</TableCell>
                      <TableCell><Button  variant="outlined" color="secondary" onClick={(event)=>this.deletealert(post.id)} >Delete</Button></TableCell>
                      <TableCell><Button  variant="outlined" onClick={(event)=>this.updatealert(post.id, this.state.who, this.state.title, this.state.content)} >Update</Button></TableCell>
                    </TableRow>
                  )}
                  </TableBody>
                </Table>
              </TableContainer>
          </div>
        </div>
      </Container>
    </div>
  );
  }
}

export default App;
