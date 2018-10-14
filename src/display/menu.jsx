import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
    PRPI: true,
    HRPI: true,
    Sibor1mth: false,
    markedSeries: false    
  };
  handlePRPI = () => {
    this.setState({PRPI: !this.state.PRPI})
    this.props.togglePRPI()
  }
  handleHRPI = () => {
    this.setState({HRPI: !this.state.HRPI})
    this.props.toggleHRPI()
  } 
  handleSibor1mth = () => {
    this.setState({Sibor1mth: !this.state.Sibor1mth})
    this.props.toggleSibor1mth()
  } 
  handleMarkedSeries = () => {
    this.setState({markedSeries: !this.state.markedSeries})
    this.props.toggleMarkSeries()
  } 
  
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {anchorEl,PRPI, HRPI,Sibor1mth,markedSeries} = this.state;

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
          <MenuItem>Private Residential Property Price Index<Checkbox data-usage="checkbox" checked={PRPI} onChange={this.handlePRPI}/></MenuItem>
          <MenuItem>HDB Resale Price Index <Checkbox data-usage="checkbox" checked={HRPI} onChange={this.handleHRPI}/></MenuItem>
          <MenuItem>SIBOR rate <Checkbox data-usage="checkbox" checked={Sibor1mth} onChange={this.handleSibor1mth}/></MenuItem>
          <MenuItem>Show data <Checkbox data-usage="checkbox" checked={markedSeries} onChange={this.handleMarkedSeries}/></MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;