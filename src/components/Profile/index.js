import React from 'react';
import {connect} from "react-redux";
import _ from "lodash";
import Container from "react-bootstrap/Container";

import Header from "../Header";
import EditableJoke from "../EditableJoke";

import {addToFavorite, updateJoke, cancelJoke} from "../../store/actions/jokes";


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: _.cloneDeep(this.props.app.favorite),
            editArray: {},
        };
    }

    addToFavorite = (joke) => {
        this.props.addToFavorite(joke, true);
    };

    updateJoke = (joke) => {
        this.props.updateJoke(joke);
        const {editArray} = this.state;
        let updated = _.reject(editArray, joke);
        this.setState({
            editArray: updated,
        });
    };

    render() {
        const {app: {favorite}} = this.props;
        return (
            <Container>
                <Header/>
                {!_.cloneDeep(this.props.app.favorite).length ? <p>First you need add jokes to favorite!</p> :
                    _.cloneDeep(this.props.app.favorite).map((item) => {
                        let isFavorite = _.find(favorite, ['id', item.id]);
                        return (
                            <div key={item.id}>
                                <EditableJoke
                                    isFavorite={isFavorite}
                                    item={item}
                                    isEditable={true}
                                    addToFavorite={this.addToFavorite}
                                    updateJoke={this.updateJoke}
                                />
                            </div>
                        )
                    })}
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        app: state.app
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addToFavorite: (joke, isFavorite) => dispatch(addToFavorite(joke, isFavorite)),
        cancelJoke: () => dispatch(cancelJoke()),
        updateJoke: (joke) => dispatch(updateJoke(joke))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
