import React from 'react';
import { connect } from 'react-redux';
import Meta from 'atoms/meta';
import Shell from 'organisms/shell';
import PropTypes from 'prop-types';
import _ from 'lang';
import SearchResults from 'organisms/searchResults';
import { pushNewPage } from 'state/navigation';
const _l = _('en');

// Used to produce a description
const templateData = {
  pageType: 'search',
};

/**
 * Renders the /search page.
 */
const SearchPage = ({
  pageContext: {
    logoSrc,
    splashLogoSrc,
    snippetCount,
    recommendedSnippets,
  },
  searchQuery,
  dispatch,
}) => {
  React.useEffect(() => {
    dispatch(pushNewPage('Search', '/search'));
  }, []);

  return (
    <>
      <Meta
        logoSrc={ splashLogoSrc }
        description={ _l`site.pageDescription${{...templateData, snippetCount }}` }
        title={ searchQuery.length === 0 ? _l('Search') : _l`Search results for${searchQuery}` }
      />
      <Shell
        logoSrc={ logoSrc }
        isSearch
        isListing={ false }
        withIcon={ false }
        withTitle={ true }
      >
        <SearchResults recommendedSnippets={ recommendedSnippets }/>
      </Shell>
    </>
  );
};

SearchPage.propTypes = {
  /** pageContext is passed from Gatsby to the page */
  pageContext: PropTypes.shape({
    /** URI for the logo image */
    logoSrc: PropTypes.string.isRequired,
    /** URI for the splash logo image */
    splashLogoSrc: PropTypes.string.isRequired,
    /** Number of indexed snippets */
    snippetCount: PropTypes.number,
    /** List of recommended snippets */
    recommendedSnippets: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  /** Search query */
  searchQuery: PropTypes.string,
  /** Dispatch function of the Redux stotre */
  dispatch: PropTypes.func,
};

export default connect(
  state => ({
    searchQuery: state.search.searchQuery,
  }),
  null
)(SearchPage);
