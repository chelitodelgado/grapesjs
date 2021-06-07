import constants from './constants';
import { elHasClass } from '../../utils';

export default (dc, config = {}) => {
    const defaultType = dc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;
    const { navigationName, tabName, tabSelector, tabPaneName, tabPanesName } = constants;

    const classId = config.classNavigation;
    const type = navigationName;

    dc.addType(type, {

        model: defaultModel.extend({
            defaults: {
                ...defaultModel.prototype.defaults,
                name: 'Tabs Navigation',
                copyable: false,
                draggable: true,
                removable: false,
                droppable: tabSelector,
                tagName: 'ul',
                attributes: { role:'tablist'},
                classes: ['nav', 'nav-tabs'],
                traits: [
                    {
                        type: 'class_select',
                        options: [
                            {value: 'nav-tabs', name: 'Tabs'},
                            {value: 'nav-pills', name: 'Pills'},
                        ],
                        label: 'Type',
                    },
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Left'},
                            {value: 'nav-fill', name: 'Fill'},
                            {value: 'nav-justified', name: 'Justify'},
                        ],
                        label: 'Layout',
                    },
                ],
                
            },

            init2() {
                this.get('classes').pluck('name').indexOf(classId) < 0 && this.addClass(classId);
                //findType()

                //this.setupToggle();
                const comps = this.components();
                comps.bind('add', this.onTabAdd.bind(this));
                comps.bind('remove', this.onTabRemove.bind(this));
            },
        
            onTabAdd(comp,b,options={}){
                //console.log('add tabs',comp,parent,options)
                const panelsList = this.parent().findType(tabPanesName);
                const links = comp.findType('link');
                if (panelsList.length > 0 && links.length>0){
                    const link = links[0];
                    const panes=panelsList[0];
                    const newComp = panes.components().add({
                        type: tabPaneName,
                        attributes: {'aria-labelledby':link.getId()}
                    }, { at:panes.components().length});
                    
                    let link_attrs = link.getAttributes();
                    
                    link_attrs['id']=link.getId();
                    link_attrs['href']=`#${newComp.getId()}`;
                    link_attrs['aria-controls']=newComp.getId();
                    
                    link.setAttributes(link_attrs);
                    link.set('attributes',link_attrs);

                    const newCompAttrs=newComp.getAttributes();
                    newCompAttrs['id']=newComp.getId();
                    newComp.setAttributes(newCompAttrs);

                    if(this.components().length==1){
                        if (link.getClasses().indexOf('active')==-1){
                            link.addClass('active');
                        }
                        if(newComp.getClasses().indexOf('active')==-1){
                            newComp.addClass(['show','active']);
                        }
                    }
                }
            },
            onTabRemove(comp, params, options = {}) {
                const panelsList = this.parent().findType(tabPanesName);
                const links = comp.findType('link');

                if (panelsList.length > 0 && links.length > 0) {
                    const link = links[0];
                    const panes = panelsList[0];

                    const tabPanes = panes.components();
                    
                    const removePaneList = tabPanes.filter(pane => pane.is(tabPaneName) && pane.getAttributes()['aria-labelledby']==link.getId());
                    
                    tabPanes.remove(removePaneList);

                }
            }
        }, {
            isComponent(el) {
                if (elHasClass(el, classId)) return { type };
            },
        }),

        view: defaultView.extend({
            events: {
                'click .nav-link': 'onLinkClick',
            },

            onLinkClick(ev) {
                const links = ev.target.parentNode.parentNode.querySelectorAll('.nav-link');
                links.forEach(link =>{
                    link.classList.remove('active');
                })
                ev.target.classList.add('active');

                const tabId = ev.target.getAttribute('aria-controls');
                const panes = ev.target.parentNode.parentNode.parentNode.querySelectorAll('.tab-pane');
                panes.forEach(pane=>{
                    if (pane.getAttribute('id') == tabId){
                        pane.classList.add('show', 'active');
                    }else{ 
                        pane.classList.remove('show', 'active');
                    }
                })

            },
        })
    });
}
