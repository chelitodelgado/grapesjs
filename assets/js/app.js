
const editor = grapesjs.init({
    container : '#editor',
    with: '100%',
    fromElement: true,
    showOffsets: 1,
    type: 'local', 
    // TODO: La opción de fradMode es opcional ya que si se habilita el modo responsivo se modifica y no respeta la posicion 
    // para ajustarse a la nueva pantalla a menos que el diseño creado sea unicamente para resoluciones mayores a 1300px.
    // dragMode: 'absolute', 
    
    stepsBeforeSave: 1,
    noticeOnUnload: 0,
    assetManager: {
        assets: [
            {
                type: 'image',
                src: './assets/resources/azul.jpg',
            },
            {
                type: 'image',
                src: './assets/resources/bonbon.png',
            },
            {
                type: 'image',
                src: './assets/resources/flores.jpg',
            },
            {
                type: 'image',
                src: './assets/resources/paste.jpg',
            },
            {
                type: 'image',
                src: './assets/resources/pastel.jpg',
            },
            {
                type: 'image',
                src: './assets/resources/pastel2.jpg',
            },
            {
                type: 'image',
                src: './assets/resources/pastel3.jpg',
            },
            {
                type: 'image',
                src: './assets/resources/rollos.jpg',
            },
        ],
        
    },
    storageManager: { 
        autosave: true,    
        autoload: true,
        type: 'indexeddb',
        id: 'some-id',
    },
    plugins: [
        'gjs-preset-webpage',
        'grapesjs-blocks-bootstrap4',
        'grapesjs-rally-widgets',
        'grapesjs-slider',
        'grapesjs-table',
        'grapesjs-accordion',
        'grapesjs-rte-extensions',
        'grapesjs-tabs',
        'grapesjs-accordion',
        'grapesjs-style-gradient',
        'grapesjs-style-bg',
        'grapesjs-parser-postcss',
        'grapesjs-script-editor',
        'grapesjs-typed',
        'grapesjs-indexeddb',
        'grapesjs-rulers'
        
    ],
    pluginsOpts: {
        'gjs-preset-webpage': {},
        'grapesjs-slider': {},
        'grapesjs-tabs': {},
        'grapesjs-style-gradient': {},
        'grapesjs-style-bg': { /* options */ },
        'grapesjs-script-editor': { /* options */ },
        'grapesjs-typed': { /* options */ },
        'grapesjs-rulers': { /* options */ },
        'grapesjs-blocks-bootstrap4': {
            blocks: {},
            blockCategories: {},
            labels: {},
        },
        formPredefinedActions: null,
        optionsStringSeparator: '::'
    },
    // 
    canvas: {
        styles: [
          'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css',
          'https://use.fontawesome.com/releases/v5.8.2/css/all.css',
          '../assets/css/custom.css',
        ],
        scripts: [
          '../assets/js/jquery-3.6.0.js',
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/js/mdb.min.js',
        ],
    }

});

editor.on('storage:start', startLoading);
editor.on('storage:end', endLoading);

editor.I18n.addMessages({
    en: {
      styleManager: {
        properties: {
          'background-repeat': 'Repeat',
          'background-position': 'Position',
          'background-attachment': 'Attachment',
          'background-size': 'Size',
        }
      },
    }
});

editor.StyleManager.addProperty('extra', [{
name: 'Background',
property: 'background',
type: 'bg',
}]);

editor.DomComponents.addType('image-with-link', {
    extend: 'link',
    model: {
        defaults: {
            style: {
                display: 'inline-block',
                padding: '5px',
                'min-height': '50px',
                'min-width': '50px'
            },
            components: {
                type: 'image',
            }
        }
    }
});

editor.DomComponents.addType('input', {
    isComponent: el => el.tagName == 'INPUT',
    model: {
      defaults: {
        traits: [
          // Strings are automatically converted to text types
          'name', // Same as: { type: 'text', name: 'name' }
          'placeholder',
          {
            type: 'select', // Type of the trait
            label: 'Type', // The label you will see in Settings
            name: 'type', // The name of the attribute/property to use on component
            options: [
              { id: 'text', name: 'Text'},
              { id: 'email', name: 'Email'},
              { id: 'password', name: 'Password'},
              { id: 'number', name: 'Number'},
            ]
          }, {
            type: 'checkbox',
            name: 'required',
        }],
        // As by default, traits are binded to attributes, so to define
        // their initial value we can use attributes
        attributes: { type: 'text', required: true },
      },
    },
});

var domComps = editor.DomComponents;
var dType = domComps.getType('default');
var dModel = dType.model;
var dView = dType.view;

domComps.addType('texttool', {
    model: dModel.extend(
        {
            init() {
                this.listenTo(this, 'change:type', this.doStuff);
            },
            doStuff() {
                this.get('traits').each(function (trait) {
                    console.log(trait.attributes);
                });
            },
            defaults: Object.assign({}, dModel.prototype.defaults, {
                traits: [
                    {
                        type: 'select',
                        label: 'Data',
                        name: 'type',
                        options: ['myoptions'],
                        changeProp: 1,
                    },
                ],
            }),
        },
        {
            isComponent: function (el) {
                if (el.tagName == 'texttool') {
                    return {type: 'texttool'};
                }
            },
        },
    ),

    view: dView,
});

const pn = editor.Panels;
const panelViews = pn.addPanel({
  id: 'options'
});
panelViews.get('buttons').add([{
  attributes: {
    title: 'Toggle Rulers'
  },
  context: 'toggle-rulers', 
  label: `<svg width="18" viewBox="0 0 16 16"><path d="M0 8a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5A.5.5 0 0 1 0 8z"/><path d="M4 3h8a1 1 0 0 1 1 1v2.5h1V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2.5h1V4a1 1 0 0 1 1-1zM3 9.5H2V12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9.5h-1V12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/></svg>`,
  command: 'ruler-visibility',
  id: 'ruler-visibility'
}]);



window.editor = editor;