import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reducer, {initialState} from "./components/reducer/Reducer";
import { StateProvider } from './components/reducer/StateProvider';
import reportWebVitals from "./reportWebVitals";
const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer}>
            <App />
        </StateProvider>
    </React.StrictMode>,
);
document.body.style.backgroundColor = `#151515`;
document.body.style.color = "white";
reportWebVitals();

