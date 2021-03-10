import React from 'react';
import './App.css';
import Customers from './components/Customers';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { withStyles } from '@material-ui/core/styles';

const customers =[
  {
    id : 1,
      image : "https://placeimg.com/64/64/1",
      name: "홍길동",
      birthday: "000808",
      gender: "남자",
      job: "성인"
  },
  {
    id : 2,
    image : "https://placeimg.com/64/64/2",
    name: "김철수",
    birthday: "990227",
    gender: "여자",
    job: "대학생"
  }
]

function App(){
  
  return(
    <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {customers.map(c => {
                  return(<Customers 
                    key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>)
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
  );
}

export default App;
