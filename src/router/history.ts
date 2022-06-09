import {createBrowserHistory, ReactLocation} from "react-location";

const history = createBrowserHistory(),
    location = new ReactLocation({history});

export {history, location};
