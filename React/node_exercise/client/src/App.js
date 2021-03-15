import React, { useEffect, useState } from 'react';
import './App.css';
import Customers from './components/Customers';
import CustomersAdd from './components/CustomersAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { withStyles } from '@material-ui/core/styles';


function App(){
  // 고객 데이터는 처음에 비어있다가 계속 변경됨...!
  const [ customers, setCustomers ] = useState('');

  const stateRefresh =()=>{
    setCustomers(
      customers = ''
    );
    callApi()
      .then(res => setCustomers(res))
      .catch(err => console.log(err))
  }

  useEffect(()=>{
    callApi()
      .then(res => setCustomers(res))
      .catch(err => console.log(err))
  }, [customers]);

  
  const callApi = async() =>{
    const response = await fetch('api/customers');
    const body = await response.json(); //서버에서 불러온 데이터베이스를 json형태로 body라는 변수에 담아줌
    return body;
  }

  return(
    <div>
      <CustomersAdd stateRefresh={stateRefresh} />
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
                {customers ? customers.map(c => {
                  return(<Customers 
                    key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>)
                }): ""}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default App;
