import mobx, { observable, action } from 'mobx';
import { observer } from 'mobx-react';

export default class UIStore {
    @observable locationSelectorVisible: boolean = false;
    
    @observable messageVisible: boolean = false;
    @observable messageHeader: any;
    @observable messageContent: any;

    @action
    showMessage(header: string, content: any) {
        this.messageVisible = true;
        this.messageContent = content;
    }

    @action
    hideMessage() {
        this.messageHeader = null;
        this.messageContent = null;
        this.messageVisible = false;
    }
}