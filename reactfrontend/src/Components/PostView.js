import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import '../App';
/*
const dummy_prop = {
    title: '테스트용 타이틀입니다',
    content: '테스트용 글입니다'
}
*/

export default class PostView extends Component {
    render() {
        const {id, who, title, content} = this.props
        return (
            <TableRow key={id}>
                <TableCell component="th" scope="row"><b>{id}</b></TableCell>
                <TableCell>{who}</TableCell>
                <TableCell>{title}</TableCell>
                <TableCell>{content}</TableCell>
            </TableRow>
        )
    }
}