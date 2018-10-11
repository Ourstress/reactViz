import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem>Private Residential Property Price Index<Checkbox checked onChange={this.props.togglePRPI}/></MenuItem>
          <MenuItem>HDB Resale Price Index <Checkbox checked onChange={this.props.toggleHRPI}/></MenuItem>
          <MenuItem>SIBOR rate <Checkbox onChange={this.props.toggleSibor1mth}/></MenuItem>
          <MenuItem>Show data <Checkbox onChange={this.props.toggleMarkSeries}/></MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;