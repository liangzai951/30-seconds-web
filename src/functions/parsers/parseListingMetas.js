import _ from 'lang';
const _l = _('en');

const parseListingMetas = requirables =>
  requirables
    .map(rq => ({
      featured: rq.meta.featured,
      archived: rq.meta.archived,
      unlisted: rq.meta.unlisted,
      blog: rq.meta.blog,
      link: {
        internal: true,
        url: `/${rq.meta.slugPrefix.slice(0, rq.meta.slugPrefix.indexOf('/'))}/p/1`,
      },
      name: rq.meta.blog ? _l('Blog') : _l`codelang.${rq.meta.language.long}`,
      style: {
        background: rq.meta.theme && rq.meta.theme.backColor,
        color: rq.meta.theme && rq.meta.theme.foreColor,
      },
      icon: rq.meta.theme && rq.meta.theme.iconName,
      slugPrefix: `/${rq.meta.slugPrefix.slice(0, rq.meta.slugPrefix.indexOf('/'))}`,
      count: _l`snippetCount.${rq.data.length}`,
      tags: [...new Set(rq.data.map(snippet => snippet.attributes.tags[0]))].sort((a, b) => a.localeCompare(b)),
    }));

export default parseListingMetas;
