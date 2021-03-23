import React, { useState }from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

function CustomersAdd () {
    const classes = useStyles;
    const [ customers={
        file : null,
        userName : '',
        birthday : '',
        gender : '',
        job : '',
        fileName : ''
    }, setCustomers ] = useState('');


    
    return(
        <div className={classes.root}>
            {/* <Button varient="outlined" color="primary">고객 추가하기</Button> */}
            <div>고객 추가</div>
            이미지 : <input type="file" name="file"/>{customers.file === "" ? "이미지 선택" : customers.file} <br/>
            이름 : <input name="userName" value={customers.userName}/> <br/>
            생년월일 : <input name="birthday" value={customers.birthday}/> <br/>
            성별 : <input name="gender" value={customers.gender}/> <br/>
            직업 : <input name="job" value={customers.job}/> <br/>

        </div>
    );
}

export default CustomersAdd;