import constants from './constants';
import { elHasClass } from '../../utils';

export default (dc, config = {}) => {
  const defaultType = dc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const { tabName, navigationSelector, tabPaneName } = constants;
  const classId = config.classTab;
  const type = tabName;

  dc.addType(type, {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        name: 'Tab',
        style: { 'min-width': '10px', 'padding-left': '2px', 'padding-right': '2px' },
        tagName: 'li',
        copyable: true,
        draggable: navigationSelector,
        attributes: { role: 'presentation' },
        components: [
          {
            type: 'link',
            classes: ['nav-link'],
            copyable: false,
            attributes: {
              role: "tab",
              'aria-selected': false,
              'data-toggle': 'tab',
              'aria-controls': 'tab'
            },
            removable: false,
            draggable: false,
            content: 'New Tab'
          }
        ]
      },

      init2() {
        this.get('classes').pluck('name').indexOf(classId) < 0 && this.addClass(classId);

        //const comps = this.components();
        //comps.bind('change:attributes:id', this.onLinkIdChange.bind(this));
        const tabLinks = this.findType('link').filter(link => link.getAttributes()['role'] == 'tab');
        tabLinks.forEach(link => {
          link.bind('change:attributes:id', this.onLinkIdChange.bind(this));
        });
      },
      onLinkIdChange(comp) {
        //update the pane aria-labelledby
        console.log('onLinkIdChange');
        const linkAttrs = comp.getAttributes();
        const paneId = linkAttrs['aria-controls'];
        const pane = this.parent().parent().findType(tabPaneName).find(item => item.getId() == paneId);
        if (pane) { 
          const paneAttrs = pane.getAttributes();
          paneAttrs['aria-labelledby'] = comp.getId();
          pane.setAttributes(paneAttrs);
        }
      }
    }, {
      isComponent(el) {

        if (el.tagName == 'LI' && elHasClass(el, classId) && el.children && el.children.length > 0 && el.children[0].hasAttribute('role') && el.children[0].getAttribute('role') == 'tab') {

          return { type };
        }
      },
    }),

    view: defaultView
  });
}
