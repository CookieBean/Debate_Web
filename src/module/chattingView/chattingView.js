import React, { Component } from 'react';
import { Input } from 'react-bootstrap';
import './chattingView.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

class ChattingView extends Component {
    constructor(props) {
        super(props);
        this.state = {msg:'', channel:this.props.channel, chatList:[], appStartTime:Date.now()};
        this.send = this.send.bind(this);
        this.keysend = this.keysend.bind(this);
        this,inputMSG = this.inputMSG.bind(this);
    }
    componentDidMount() {
        let cursor = this;
        socket.emit('channelJoin', this.state.channel);
        socket.on('receive', function (data) {
            cursor.setState({chatList:cursor.state.chatList.concat([data])});
            document.querySelector(".chattingView-chat").scrollTop=document.querySelector(".chattingView-chat").scrollHeight;
        });
    }
    componentWillReceiveProps(changeProps) {
        socket.emit('channelLeave', this.state.channel);
        this.setState({channel:changeProps.channel},()=>{
            this.setState({chatList:[]});
            socket.emit('channelJoin', this.state.channel);
        });
    }
    send() {
        socket.emit('send', {msg:this.state.msg, channel:this.state.channel});
        this.setState({msg:''});
        document.querySelector(".inputMsg").value="";
    }
    keysend(event) {
        if(event.keyCode == 13) {
            socket.emit('send', {msg:this.state.msg, channel:this.state.channel});
            this.state({msg:''});
            document.querySelector(".inputMsg").value="";
        }
    }
    inputMSG(event) {
        this.setState({msg:event.target.value});
    }
    render() {
        let list = this.state.charList.map((item, index) => {
            let date = new Date(item.chat.date);
            return (
                <div className="body">
                    <div className="chattingView-chatbox">
                        <div className="chattingView-chat">{list}</div>
                    </div>
                    <div className="input-group chattingView-input">
                        <input type="text" className="form-control inputMsg" placeholder="input message..." onChange={this.inputMsg} onKeyDown={this.keysend} />
                        <button type="button" className="btn btn-primary" onClick={this.send}>입력</button>
                    </div>
                </div>
            );
        });
    }
}

export default ChattingView;