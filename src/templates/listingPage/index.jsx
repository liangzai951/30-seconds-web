import React from 'react';
import { connect } from 'react-redux';
import Meta from 'atoms/meta';
import Shell from 'organisms/shell';
import SnippetList from 'organisms/snippetList';
import PropTypes from 'prop-types';
import {
  Paginator as PaginatorPropType,
  Sorter as SorterPropType,
  Snippet as SnippetPropType
} from 'typedefs';
import { pushNewPage } from 'state/navigation';
import _ from 'lang';
const _l = _('en');

// Used to produce a description
const templateData = {
  pageType: 'listing',
};

/**
 * Renders the /list/p/1 page and any other listing pages.
 */
const ListingPage = ({
  pageContext: {
    logoSrc,
    splashLogoSrc,
    paginator,
    sorter,
    snippetList,
    listingName,
    listingTitle,
    snippetCount,
    listingType,
    listingLanguage,
    listingTag,
    listingSublinks = [],
  },
  dispatch,
}) => {
  React.useEffect(() => {
    dispatch(
      pushNewPage(
        listingName,
        `${paginator.baseUrl}/${paginator.slugOrderingSegment}/${paginator.pageNumber}`
      )
    );
  }, []);

  const isFirstListingPage = listingType === 'main' && paginator.pageNumber === 1;
  const isHomePage = isFirstListingPage && paginator.slugOrderingSegment === 'p';

  return (
    <>
      <Meta
        logoSrc={ splashLogoSrc }
        title={ isHomePage ? '' : listingName }
        description={ _l`site.pageDescription${{...templateData, snippetCount, listingType, listingLanguage, listingTag }}` }
        canonical={ isHomePage ? '/' : '' }
      />
      <Shell
        logoSrc={ logoSrc }
        isSearch={ false }
        isListing
        withIcon={ true }
        withTitle={ true }
      >
        {
          isFirstListingPage ? (
            <>
              <h1 className='home-title'>
                <img
                  src={ logoSrc }
                  alt={ _l('Logo') }
                  className='home-logo'
                />
                <span className='home-title-text'>
                  { _l('site.title') }
                </span>
              </h1>
              <p className='home-sub-title'>
                { _l('site.description') }
              </p>
            </>
          ) : null
        }
        <SnippetList
          listingName={ listingTitle }
          listingType={ listingType }
          snippetList={ snippetList }
          paginator={ paginator }
          sorter={ sorter }
          listingSublinks={ listingSublinks }
        />
      </Shell>
    </>
  );
};

ListingPage.propTypes = {
  /** pageContext is passed from Gatsby to the page */
  pageContext: PropTypes.shape({
    /** URI for the logo image */
    logoSrc: PropTypes.string.isRequired,
    /** URI for the splash logo image */
    splashLogoSrc: PropTypes.string.isRequired,
    /** Paginator component data */
    paginator: PaginatorPropType,
    /** Sorter component data */
    sorter: SorterPropType,
    /** List of snippets to be displayed */
    snippetList: PropTypes.arrayOf(SnippetPropType),
    /** Name of this listing page */
    listingName: PropTypes.string,
    /** Title of this listing page */
    listingTitle: PropTypes.string,
    /**  Number of indexed snippets */
    snippetCount: PropTypes.number,
    /** Type metadata for the listing description */
    listingType: PropTypes.string,
    /** Language metadata for the listing description */
    listingLanguage: PropTypes.string,
    /** Tag metadata for the listing description */
    listingTag: PropTypes.string,
    /** Links to sublists */
    listingSublinks: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  /** Dispatch function of the Redux stotre */
  dispatch: PropTypes.func,
};

export default connect(
  // eslint-disable-next-line
  state => ({}),
  null
)(ListingPage);
