import * as React from 'react';
import IStoreConsumer from './IStoreConsumer';
import { Button, Dropdown, Header, Icon, Modal } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import * as _ from 'lodash';

@inject('uiStore')
@inject('domainStore')
@observer
export class LanguageSelector extends React.Component<IStoreConsumer, {}> {

    @observable
    selectedLanguageCode: string;

    onChangeLanguage(value: any) {
        this.selectedLanguageCode = value;
    }

    @action
    activateLanguage() {
        this.props.domainStore.addLanguage(this.selectedLanguageCode)
        this.props.uiStore.locationSelectorVisible = false;
    }

    render() {

        const languageOptions = _.map(_.filter(this.props.domainStore.languages, l => !l.active), l => ({
            key: l.code,
            value: l.code,
            flag: l.flag,
            text: l.name
        }));

        return <Modal open={this.props.uiStore.locationSelectorVisible} size='mini'>
            <Header icon='flag' content='Add Language' />
            <Modal.Content>
                <Dropdown placeholder='Choose Language' 
                    icon='filter' labeled button 
                    className='icon' 
                    style={{ width: '100%' }} 
                    options={languageOptions}
                    onChange={(e, data) => this.onChangeLanguage(data.value)} />
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' inverted onClick={() => this.props.uiStore.locationSelectorVisible = false}>
                    <Icon name='remove' /> Cancel
                </Button>
                <Button color='green' inverted onClick={() => this.activateLanguage()}>
                    <Icon name='checkmark' /> OK
                </Button>
            </Modal.Actions>
        </Modal>
    }
}

