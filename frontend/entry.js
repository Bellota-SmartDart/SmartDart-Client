import './styles/init.scss';
//import './styles/style.css';

import React from "react";
import ReactDOM from 'react-dom';

import Main from "./game/MainViewer.jsx";
import BallotarController from "./BallotarController.jsx";

var controller = new BallotarController();

ReactDOM.render(<Main BallotarController={controller}/>, document.getElementById('main-app'));