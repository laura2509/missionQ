import React from 'react';
import Routes from 'components/routes';

class App extends React.Component {

    render(): JSX.Element {

        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-custom fixed-top">
                    <a className="navbar-brand" href="/">Mission Q</a>
                </nav>
                <div className="container">
                    <div className="app-content">
                        <Routes />
                    </div>
                </div>
            </div>

        );
    }
}

export default App;
