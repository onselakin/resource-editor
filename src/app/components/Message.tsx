import * as React from 'react';
import IStoreConsumer from './IStoreConsumer';
import { Button, Dropdown, Header, Icon, Modal } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';

@inject('uiStore')
@inject('domainStore')
@observer
export class Message extends React.Component<IStoreConsumer, {}> {

    render() {
        return <Modal open={this.props.uiStore.messageVisible} size='mini'
            header={this.props.uiStore.messageHeader}
            content={this.props.uiStore.messageContent}
            actions={[{ key: 'done', content: 'OK', positive: true }]}
            onActionClick={() => this.props.uiStore.hideMessage()}
        />
    }
}

