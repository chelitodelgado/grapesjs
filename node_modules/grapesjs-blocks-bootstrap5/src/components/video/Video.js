import videoIcon from 'raw-loader!../../icons/youtube-brands.svg';

export const VideoBlock = (bm, label) => {
  bm.add('bs-video', {
    label: `
            ${videoIcon}
            <div>${label}</div>
        `,
    category: 'Media',
    content: {
      type: 'bs-video',
    },
  });
};

export default (domComponent) => {
  const videoType = domComponent.getType('video');
  const { model } = videoType;
  const { view } = videoType;
  const type = 'bs-embed-responsive';

  domComponent.addType(type, {
    model: model.extend({
      defaults: {
        ...model.prototype.defaults,
        'custom-name': 'Video',
        resizable: false,
        droppable: false,
        draggable: false,
        copyable: false,
        provider: 'so',
        classes: ['embed-responsive-item'],
      },
    }, {
      isComponent(el) {
        if (el && el.className === 'embed-responsive-item') {
          const result = {
            provider: 'so',
            type,
          };
          const isYtProv = /youtube\.com\/embed/.test(el.src);
          const isYtncProv = /youtube-nocookie\.com\/embed/.test(el.src);
          const isViProv = /player\.vimeo\.com\/video/.test(el.src);
          const isExtProv = isYtProv || isYtncProv || isViProv;
          if (el.tagName == 'VIDEO' || (el.tagName == 'IFRAME' && isExtProv)) {
            if (el.src) result.src = el.src;
            if (isExtProv) {
              if (isYtProv) result.provider = 'yt';
              else if (isYtncProv) result.provider = 'ytnc';
              else if (isViProv) result.provider = 'vi';
            }
          }
          return result;
        }
      },
    }),
    view,
  });
};
