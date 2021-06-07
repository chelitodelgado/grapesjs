import constants from './constants';
import { elHasClass } from '../../utils';
import ellipsisIcon from "raw-loader!../../icons/ellipsis-h-solid.svg";
import circleIcon from "raw-loader!../../icons/circle-solid.svg";
import windowIcon from "raw-loader!../../icons/window-maximize-solid.svg";

export const TabsBlock = (bm, c) => {
  const { tabName,tabsName, navigationName, tabSelector, tabPaneName, tabPanesName } = constants;
  bm.add('tabs', {
    label: `
            ${ellipsisIcon}
            <div>${c.labels.tabs}</div>
        `,
    category: 'Components',

    content: { type: tabsName}
  });
  bm.add(tabName, {
    label: `
            ${circleIcon}
            <div>${c.labels.tab}</div>
        `,
    category: 'Components',
    content: {
      type: tabName,
    }
  });
 
};

export default (dc, config = {}) => {
  const defaultType = dc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const { navigationName, navigationSelector, tabsName,tabName, tabSelector, tabPaneName, tabPanesName } = constants;

  const classId = config.classTabs;
  const type = tabsName;

  dc.addType(type, {

    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        name: 'Tabs',
        draggable: true,
        droppable: navigationSelector,
        tagName: 'div',
        classes: ['tabs'],
        components: [
          {
            type: navigationName,
          },
          {
            type: tabPanesName
          }
        ]
      },
      init2(){
        this.setupTab();
      },
      setupTab() {
        console.log('tags setuptabs');
        const tabs=this.findType(tabName);
        if(tabs.length<=0){
          const tabNavs=this.findType(navigationName);
          if(tabNavs.length>0){
            const tabNav=tabNavs[0];

            let count=3;
            while(count-->0){
              tabNav.components().add({
                type: tabName
              });
            }
            
          }
        }else{ 
          const tabPanes=this.findType(tabPaneName);
          const firstLink=tabs[0].components().find(link => link.is('link') && link.getAttributes()['role'] == 'tab');
          if(firstLink){
            let tabPane = tabPanes.find(pane => pane.getAttributes()['aria-labelledby'] == firstLink.getId());
            if(!tabPane){
              for(let i=0;i<tabs.length;i++){ 
                let link = tabs[i].components().find(link => link.is('link') && link.getAttributes()['role'] == 'tab');
                tabPane = tabPanes[i];
                let linkAttrs=link.getAttributes();
                linkAttrs['href'] = `#${tabPane.getId()}`;
                linkAttrs['id']=link.getId();
                linkAttrs['aria-controls'] = tabPane.getId();
                link.setAttributes(linkAttrs);

                let tabPaneAttrs=tabPane.getAttributes();
                tabPaneAttrs['aria-labelledby'] = link.getId();
                tabPaneAttrs['id']=tabPane.getId();
                tabPane.setAttributes(tabPaneAttrs);
              }
            }
          }
        }
      },
    }, {
      isComponent(el) {
        if (elHasClass(el, classId)) return { type };
      },
    }),

    view: defaultView
  });
}