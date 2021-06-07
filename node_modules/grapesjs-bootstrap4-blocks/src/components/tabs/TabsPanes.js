import constants from './constants';
import { elHasClass } from '../../utils';

export default (dc, config = {}) => {
    const defaultType = dc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;
    const { tabPanesName, navigationName, tabPaneSelector, tabPaneName, tabName } = constants;
    const classId = config.classTabPanes;
    const type = tabPanesName;

    dc.addType(type, {

        model: defaultModel.extend({
            defaults: {
                ...defaultModel.prototype.defaults,
                name: 'Tabs Panes',
                tagName: 'div',
                copyable: false,
                draggable: false,
                removable: false,
                droppable: tabPaneSelector,
                classes: ['tab-content']
            },

            init2() {
                this.get('classes').pluck('name').indexOf(classId) < 0 && this.addClass(classId);
            },
            
        }, {
            isComponent(el) {
                if (elHasClass(el, classId)) return { type };
            },
        }),

        view: defaultView
    });
}
