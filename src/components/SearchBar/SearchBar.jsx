/* eslint-disable */
import React, { Component } from 'react';
import './searchbar.css';
import search from '../images/search.png';
import mobMap from "../images/mobMap.png"
class SearchBar extends Component {
    state = {
        matches: window.matchMedia("(min-width: 480px)").matches,
    }
    componentDidMount() {
        const handler = e => this.setState({ matches: e.matches });
        window.matchMedia("(min-width: 480px)").addListener(handler);
    }
    render() {
        return (
            <React.Fragment>
                {!this.state.matches &&
                    (
                        <div className="SearchBarContainer">
                            {this.props.children}
                        </div>
                    )
                }
                {this.state.matches &&
                    <div className="SearchBarContainer">
                        {this.props.children}
                    </div>

                }
            </React.Fragment>
        );
    }
}

export default SearchBar;