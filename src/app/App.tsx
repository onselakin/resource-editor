import * as React from 'react';
import * as ReactDOM from 'react-dom';
import UIStore from './stores/UIStore';
import DomainStore from './stores/DomainStore';
import { Provider } from 'mobx-react';
import { Menu } from './components/Menu';
import { Editor } from './components/Editor';
import { LanguageSelector } from './components/LanguageSelector';
import { Message } from './components/Message';

import 'semantic-ui-css/semantic.min.css';
import './app.css';

declare let module: any

const domainStore = new DomainStore();
const uiStore = new UIStore();

const App = () => (
    <Provider uiStore={uiStore} domainStore={domainStore}>
        <div className="box">
            <div className="row header">
                <Menu />
            </div>
            <div className="row content">
                <Editor />
            </div>
            <div className="row footer">
                <LanguageSelector />
                <Message />
            </div>
        </div>
    </Provider>
);

ReactDOM.render(<App />,
    document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
