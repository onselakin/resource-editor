import * as React from 'react';
import IStoreConsumer from './IStoreConsumer';
import { inject } from 'mobx-react';
import * as _ from 'lodash';
import { Accordion } from 'semantic-ui-react'

@inject('uiStore')
@inject('domainStore')
export class Tree extends React.Component<IStoreConsumer, {}> {

    render() {
        return <Accordion styled />;
    }
}
