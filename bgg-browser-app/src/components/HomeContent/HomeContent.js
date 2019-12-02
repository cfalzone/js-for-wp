import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';

import HomeIcon from '@material-ui/icons/Home';

import GitHubCircleIcon from 'mdi-material-ui/GithubCircle';

import EmptyState from '../EmptyState';
import BGGBrowser from '../BGGBrowser';

const styles = (theme) => ({
  emptyStateIcon: {
    fontSize: theme.spacing(12)
  },

  button: {
    marginTop: theme.spacing(1)
  },

  buttonIcon: {
    marginRight: theme.spacing(1)
  }
});

class HomeContent extends Component {
  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { user, userData } = this.props;

    if (user) {
      
      if (userData && userData.username) {
        return (
          <BGGBrowser username={userData.username} />
        );
      } else {
        return (
          <EmptyState
            icon={<HomeIcon className={classes.emptyStateIcon} color="action" />}
            title="Home"
            description="Edit your settings and add your BGG username"
          />
        );
      }
    }

    return (
      <EmptyState
        title={process.env.REACT_APP_NAME}
        description="I should put some description here"
        button={
          <Fab className={classes.button}
              color="secondary"
              href="https://github.com/cfalzone/js-for-wp/tree/master/bgg-browser-app"
              rel="noopener noreferrer"
              target="_blank"
              variant="extended">
            <GitHubCircleIcon className={classes.buttonIcon} />
            GitHub
          </Fab>
        }
      />
    );
  }
}

HomeContent.propTypes = {
  // Styling
  classes: PropTypes.object.isRequired,

  // Properties
  user: PropTypes.object
};

export default withStyles(styles)(HomeContent);
