import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    Alert,
    Button,
    Form,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    Label,
    ModalHeader,
    NavLink,
} from 'reactstrap';
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from '../../redux/types';