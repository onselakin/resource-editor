import { observable, action, computed } from 'mobx';
const resources = require('../resources.json');
import * as _ from 'lodash';

export default class DomainStore {
    @observable resources: any;

    @observable languages = [
        { code: 'en', flag: 'gb', name: 'English', active: true },
        { code: 'fr', flag: 'fr', name: 'French', active: false },
        { code: 'de', flag: 'de', name: 'German', active: false },
        { code: 'jp', flag: 'jp', name: 'Japan', active: false },
        { code: 'tr', flag: 'tr', name: 'Turkish', active: true },
    ];

    @computed
    get activeLanguages(): any {
        return _.filter(this.languages, l => l.active);
    }

    @computed
    get resourceList(): any {
        const populate = (o: any, n: string, list: any) => {
            _.forOwn(o, (v: any, k: any) => {
                if (_.isPlainObject(v)) {
                    populate(v, !_.isEmpty(n) ? n + '.' + k : k, list);
                } else {
                    if (!_.includes(list, n))
                        list.push(n);
                }
            });
        }

        const list: string[] = [];
        populate(this.resources, '', list);
        return list;
    }

    @action
    loadResources(json: any) {

        // const list = (o: any): any => _.flatMapDeep(
        //     _.filter(_.keys(o), k => _.isPlainObject(o[k])),
        //     k => ({ title: k, children: list(o[k]) }));
        // console.log(list(resources));
        const languages: string[] = [];
        const recurse = (o: any) => {
            _.forOwn(o, (v: any, k: any) => {
                if (!_.isPlainObject(v)) {
                    if (!_.includes(languages, k)) languages.push(k);
                } else {
                    recurse(v);
                }
            });
        }
        recurse(json);
        _.forEach(languages, l => this.addLanguage(l));

        this.resources = json;
    }

    @action addLanguage(code: string) {
        _.filter(this.languages, l => l.code === code)[0].active = true;
    }
}