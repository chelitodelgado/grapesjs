import constants from './constants';
import { elHasClass } from '../../utils';

export default (dc, config = {}) => {
  const defaultType = dc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const { tabPaneName, tabPanesSelector } = constants;
  const classId = config.classTabPane;
  const type = tabPaneName;

  dc.addType(type, {

    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        name: 'Tab Pane',
        copyable: false,
        draggable: false,
        removable: false,
        classes: ['tab-pane', 'fade'],
        attributes: { role:'tabpanel'},
        traits: [
          'id',
          {
            type: 'class_select',
            options: [
              {value: 'fade', name: 'Fade'},
              {value: '', name: 'None'},
            ],
            label: 'Animation',
          },
          {
            type: 'class_select',
            options: [
              {value: '', name: 'Inactive'},
              {value: 'active', name: 'Active'},
            ],
            label: 'Is Active',
          },
        ],
        components:`
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <p>Edit your tab content here</p>
              </div>
            </div>
          </div>
        `
      },

      init2() {
        this.get('classes').pluck('name').indexOf(classId) < 0 && this.addClass(classId);
        this.bind('change:attributes:id', this.onIdChange.bind(this));
      },
      onIdChange(pane,b, options = {}){
        console.log('tab pane', pane.getId(), pane);
        const paneAttrs = pane.getAttributes();
        const linkId = paneAttrs['aria-labelledby'];
        const link=this.parent().parent().findType('link').find(item=>item.getId()==linkId && item.getAttributes()['role']=='tab');
        if(link){
          let linkAttrs = link.getAttributes();
          linkAttrs['href']=`#${pane.getId()}`;
          linkAttrs['aria-controls']=pane.getId();
          link.setAttributes(linkAttrs);
        }
      }
    }, {
      isComponent(el) {
        if (elHasClass(el, classId)) return { type };
      },
    }),

    view: defaultView,
  });
}
