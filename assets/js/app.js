
const editor = grapesjs.init({
    container : '#editor',
    with: '100%',
    fromElement: true,
    showOffsets: 1,
    type: 'local',     
    autosave: true,    
    autoload: true,    
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
    storageManager: { autoload: 0 },
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
        
    ],
    pluginsOpts: {
        'gjs-preset-webpage': {},
        'grapesjs-slider': {},
        'grapesjs-tabs': {},
        'grapesjs-style-gradient': {},
        'grapesjs-blocks-bootstrap4': {
            blocks: {
            },
            blockCategories: {
            },
            labels: {
            },
          },

    },
    // 
    canvas: {
        styles: [
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
        ],
        scripts: [
          'https://code.jquery.com/jquery-3.3.1.slim.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js'
        ],
    }

});



window.editor = editor;