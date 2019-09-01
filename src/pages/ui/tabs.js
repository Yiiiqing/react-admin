import React from 'react'
import {Card, Button, Tabs, message, Icon} from 'antd'
import'./ui.less'
const TabPane = Tabs.TabPane

export default class Tab extends React.Component{

    newTabIndex = 0;
    handleCallback = (key) =>{
        message.info("Hi, 你选择了页签: " + key)
    }
    componentWillMount(){
        const panes = [
            {
                title:'Tab 1',
                content:'昨天我和女朋友分手了',
                key:'1'
            },
            {
                title:'Tab 2',
                content:'今天很难过',
                key:'2'
            },
            {
                title:'Tab 3',
                content:'以后怎么办',
                key:'3'
            }
        ]
        this.setState({
            activeKey: panes[0].key,
            panes
        })
    }
    onChange = (activeKey) =>{
        this.setState({
            activeKey
        })
    }
    onEdit = (targetKey,action ) =>{
        this[action](targetKey)
    }
    //key千万不能写死
    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
      };
    
    remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
        //记录要删除的页的索引
        if (pane.key === targetKey) {
        lastIndex = i - 1;
        }
    });
    //过滤,
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    //仅当打开的和删除的一样,不然打开的保持不变
    if (panes.length && activeKey === targetKey) {
        //要删除的是第二个以后
        if (lastIndex >= 0) {
        //将前一个tab激活
        activeKey = panes[lastIndex].key;
        } else {
        //删除的是第一个
        activeKey = panes[0].key;
        }
    }
    this.setState({ panes, activeKey });
    };

    render(){
        return(
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">
                        昨天我和女朋友分手了
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                        今天很难过
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                        以后怎么办
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span>{<Icon type="plus"/>}Tab 1</span>} key="1">
                        昨天我和女朋友分手了
                        </TabPane>
                        <TabPane tab={<span>{<Icon type="edit"/>}Tab 2</span>} key="2" disabled>
                        今天很难过
                        </TabPane>
                        <TabPane tab={<span>{<Icon type="delete"/>}Tab 3</span>} key="3">
                        以后怎么办
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs 
                    // defaultActiveKey="1" 
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((panel)=>{
                                return <TabPane
                                        tab={panel.title}
                                        key={panel.key}
                                        />
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}