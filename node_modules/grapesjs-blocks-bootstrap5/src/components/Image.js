import imageIcon from 'raw-loader!../icons/image-solid.svg';

export const ImageBlock = (bm, label) => {
  bm.add('bs-image', {
    label: `
            ${imageIcon}
            <div>${label}</div>
        `,
    category: 'Media',
    content: {
      type: 'bs-image',
    },
  });
};

export default (domComponent) => {
  const img_src_default = 'https://dummyimage.com/800x500/999/222';
  const imageType = domComponent.getType('image');
  const { model } = imageType;
  const { view } = imageType;
  const type = 'bs-image';

  domComponent.addType(type, {
    model: model.extend({
      defaults: {
        ...model.prototype.defaults,
        'custom-name': 'Image',
        tagName: 'img',
        resizable: 1,
        attributes: {
          src: img_src_default,
        },
        classes: ['img-fluid'],
        traits: [
          {
            type: 'text',
            label: 'Source (URL)',
            name: 'src',
          },
          {
            type: 'text',
            label: 'Alternate text',
            name: 'alt',
          },
        ].concat(model.prototype.defaults.traits),
      },
    }, {
      isComponent(el) {
        if (el && el.tagName === 'IMG') {
          return { type };
        }
      },
    }),
    view,
  });
};
