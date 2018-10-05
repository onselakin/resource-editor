import UIStore from '../stores/UIStore';
import DomainStore from '../stores/DomainStore';

export default interface IStoreConsumer {
    uiStore?: UIStore;
    domainStore?: DomainStore
}
