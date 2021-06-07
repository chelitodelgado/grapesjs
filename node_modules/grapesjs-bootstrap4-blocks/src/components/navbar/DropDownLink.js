import dropdownIcon from "raw-loader!@/icons/dropdown-link.svg";

export const DropDownLinkBlock = (bm, label) => {
  bm.add('dropdown_link', {
    label: `
            ${dropdownIcon}
            <div>${label}</div>
        `,
    'custom-name':'Dropdown Link',
    category: 'Components',
    draggable: '.navbar-nav',
    droppable:false,
    attributes: { class:'nav-item dropdown'},
    content: `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown
        </a>
        <ul class="dropdown-menu" aria-labelledby="">
          <li><a class="dropdown-item" href="#"><span>Action</span></a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </li>
    `
  });
}