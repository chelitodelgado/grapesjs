
import menuLinkIcon from "raw-loader!@/icons/menu-link.svg";

export const MenuLinkBlock = (bm, label) => {
  bm.add('menu_link', {
    label: `
      ${menuLinkIcon}
      <div>${label}</div>
    `,
    category: 'Components',
    attributes: { class: 'nav-item' },
    content: `
      <li class="nav-item">
        <a class="nav-link" href="#">Menu Item</a>
      </li>
    `
  });
};

export default (editor) =>{
  const comps = editor.DomComponents;
  const defaultType = comps.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  comps.addType('menu_link', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'MenuLink',
        classes: ['nav-item'],
        style: { 'min-width': '10px' },
        draggable: '.navbar-nav',
        droppable: 'a'
      },
      
    }, {
      isComponent(el) {
        if (el && el.tagName == "LI" && el.children && el.children.length > 0 && !el.children[0].hasAttribute('role') && el.classList && (el.classList.contains('nav-item') && !el.classList.contains('dropdown') )) {
          return { type: 'menu_link' }
        }
      }
    }),
    view: defaultView
  });
}