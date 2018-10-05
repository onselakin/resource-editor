import * as React from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import IStoreConsumer from './IStoreConsumer';
import { saveAs } from 'file-saver';
const fileDialog = require('file-dialog')

@inject('uiStore')
@inject('domainStore')
@observer
export class Menu extends React.Component<IStoreConsumer, {}> {

    loadResources() {
        fileDialog().then((files: any) => {
            let file = files[0];
            if (file.type !== 'application/json') {
                this.props.uiStore.showMessage('Invalid File', 'Please choose a resource file in JSON format.');
                return;
            }
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                this.props.domainStore.loadResources(JSON.parse(reader.result));
            }
        });
    }

    saveResources() {
        const blob = new Blob([JSON.stringify(this.props.domainStore.resources)], { type: "application/json;charset=utf-8" });
        saveAs(blob, "resources.json");
    }

    showLanguageSelection() {
        this.props.uiStore.locationSelectorVisible = true;
        console.log(this.props.domainStore.resources);
    }

    render() {
        return <Segment inverted height={40}>
            {
                !this.props.domainStore.resources &&
                <Button icon labelPosition="left" onClick={() => this.loadResources()}>
                    <Icon name="file" />
                    Open Resource File
                </Button>
            }
            {
                this.props.domainStore.resources &&
                <Button icon labelPosition="left" onClick={() => this.saveResources()}>
                    <Icon name="save" />
                    Save Resource File
                </Button>
            }
            <Button icon floated="right" labelPosition="left" onClick={() => this.showLanguageSelection()} >
                <Icon name="add" />
                Add Language
            </Button>
        </Segment>
    }
}

