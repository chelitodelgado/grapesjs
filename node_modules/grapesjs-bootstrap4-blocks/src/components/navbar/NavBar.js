import navBarIcon from "raw-loader!@/icons/nav-bar.svg";
import brandLogo from "raw-loader!@/icons/bootstrap-brand.svg";

export const NavBarBlock = (bm, label) => {
  const style =`
  <style>
    .navbar-brand{
      min-height:30px;
      min-width:50px;
    }
    .navbar-collapse{
      justify-content:flex-end;
    }
  </style>
  `;
  bm.add('navbar', {
    label: `
      ${navBarIcon}
      <div>${label}</div>
    `,
    category: 'Components',
    content: `
    <nav class="navbar navbar-expand-lg navbar-light">
      <a class="navbar-brand" href="#">
        ${brandLogo}
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown link
            </a>
            <div class="dropdown-menu" aria-labelledby="">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    ${style}
    `
  });
};

export default (editor)=>{
  const comps = editor.DomComponents;
  const defaultType = comps.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  comps.addType('navbar', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': 'NavBar',
        tagName: 'nav',
        draggable: true,
        droppable: true
      })
    }, {
      isComponent(el) {
        if (el && el.tagName=='NAV' && el.classList && (el.classList.contains('navbar') || el.classList.contains('h-navbar'))) {
          return { type: 'navbar' };
        }
      }
    }),
    view: defaultView
  });
}