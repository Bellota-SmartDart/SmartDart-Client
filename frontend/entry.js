import './styles/init.scss';

import React from "react";
import ReactDOM from 'react-dom';

import Main from "./game/MainViewer.jsx";
import BallotarController from "./BallotarController.jsx";

var controller = new BallotarController();

ReactDOM.render(<Main/>, document.getElementById('main-app'));