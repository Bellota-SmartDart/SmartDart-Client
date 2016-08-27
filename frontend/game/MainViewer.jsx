import React from "react";
import $ from 'jquery';
import cookie from 'react-cookie';

class MainViewr extends React.Component {
    render() {
        console.log('MainViewr render');
        return (
            <div className="mainViewer">
                반가워요~
            </div>
        );
    }
}

export default MainViewr;