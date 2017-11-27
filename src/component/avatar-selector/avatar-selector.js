import React, {Component} from 'react';
import {Grid, List} from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends Component {

  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const avatarList = ['boy', 'girl', 'woman', 'man']
      .map(item => ({
        icon: require(`../img/${item}.png`),
        text: item
      }));
    const gridHeader = this.state.icon ?
      (<div>
        <span>Selected avatar:</span>
        <img style={{width: 20}} src={this.state.icon}/>
      </div>) :
      (<div>Please select avatar:</div>);
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            onClick={
              item => {
                this.setState(item);
                this.props.selectAvatar(item.text);
              }
            }
          />
        </List>
      </div>
    )
  }
}

export default AvatarSelector;