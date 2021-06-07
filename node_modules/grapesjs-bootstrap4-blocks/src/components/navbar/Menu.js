import menuIcon from "raw-loader!@/icons/menu.svg";

export const MenuBlock = (bm, label) => {
  bm.add('menu', {
    label: `
      ${menuIcon}
      <div>${label}</div>
    `,
    category: 'Components',
    content: `
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#">MenuItem1</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">MenuItem2</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    `
  });
};

export default (editor) => {
  const comps = editor.DomComponents;
  const defaultType = comps.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  comps.addType('menu', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        'custom-name': 'Menu',
        classes: ['navbar-nav'],
        droppable:'.nav-item',
      },

    }, {
      isComponent(el) {
        if (el && el.tagName == 'UL' && el.classList && el.classList.contains('navbar-nav')) {
          return { type: 'menu' }
        }
      }
    }),
    view: defaultView
  });
}