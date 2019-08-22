import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../Loading';
import FakeDelay from '../FakeDelay';

const LoadableAnotherComponent = Loadable({
    loader: () => FakeDelay(2000).then(() => import('../LoadableComponent.jsx')),
    loading: Loading
});

class MyComponent extends React.Component {
    render() {
        return <LoadableAnotherComponent />;
    }
}

export default MyComponent;