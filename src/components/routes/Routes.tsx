import Post from 'pages/post';
import Posts from 'pages/posts';
import React, { FC } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

const Routes: FC = (): JSX.Element => {
    const { pathname } = useLocation();
    const propsMessage ='Hello from';
    
    return (
        <Switch>
            <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
            <Route exact path="/posts">
                <Posts propsMessage={propsMessage}/>
            </Route>
            <Route exact path="/posts/:postId">
                <Post propsMessage={propsMessage} />
            </Route>
            <Redirect exact from='/' to='/posts' />
        </Switch>
    );

};

export default Routes;