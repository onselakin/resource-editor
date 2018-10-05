import * as React from 'react';
import IStoreConsumer from './IStoreConsumer';
import { Flag, FlagNameValues, Icon, Input, Label, Menu, Table } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';
import * as _ from 'lodash';

@inject('uiStore')
@inject('domainStore')
@observer
export class Editor extends React.Component<IStoreConsumer, {}> {

    getResourceValue(path: string) {
        const value = _.get(this.props.domainStore.resources, path);
        if (_.isEmpty(value)) {
            return path;
        }
        return value;
    }

    @action
    changeValue(value: string, path: string) {
        _.set(this.props.domainStore.resources, path, value);
    }

    render() {
        if (!this.props.domainStore.resources) {
            return <div />
        }

        return <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Key</Table.HeaderCell>
                    {
                        _.map(this.props.domainStore.activeLanguages, l =>
                            <Table.HeaderCell><Flag name={l.flag as FlagNameValues} /> {l.name}</Table.HeaderCell>
                        )
                    }
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    _.map(this.props.domainStore.resourceList, i =>
                        <Table.Row>
                            <Table.Cell>
                                <Label color="blue" size="large">{i}</Label>
                            </Table.Cell>
                            {
                                _.map(this.props.domainStore.activeLanguages, l =>
                                    <Table.Cell>
                                        <Input fluid
                                            error={(this.getResourceValue(`${i}.${l.code}`) == `${i}.${l.code}`)}
                                            value={this.getResourceValue(`${i}.${l.code}`)}
                                            onChange={(e, data) => this.changeValue(data.value, `${i}.${l.code}`)}
                                        />
                                    </Table.Cell>
                                )
                            }
                        </Table.Row>
                    )
                }
            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan={this.props.domainStore.activeLanguages.length + 1}>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    }
}
