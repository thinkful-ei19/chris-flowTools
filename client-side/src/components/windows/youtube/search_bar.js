import React, { Component } from 'react';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = { term: '' };
    }

    render() {
        return (
        <div>
            <input
            className="youtube__search__input"
                value={this.state.term}
                onChange={event => this.onInputChange(event.target.value)} />
        </div>
        );
    }
    //DON'T DO: this.state.value = event.target.value--- BAD!... Use setState() instead.
    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}

export default SearchBar;