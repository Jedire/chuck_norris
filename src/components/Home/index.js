import React from 'react';
import {connect} from "react-redux";
import _ from 'lodash'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import Header from "../Header";
import EditableJoke from "../EditableJoke";

import {getCategoriesAsync, getJokeAsync, addToFavorite} from "../../store/actions/jokes";

import "./css/index.css";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: ""
        };
    }

    handleChange = (event) => {
        this.setState({category: event.target.value});
    };

    addToFavorite = (joke) => {
        let isFavorite = _.find(this.props.app.favorite, ['id', joke.id]);
        this.props.addToFavorite(joke, isFavorite);
    };

    getJoke = () => {
        this.props.getJokeAsync(this.state.category);
    };

    componentDidMount() {
        this.props.getCategoriesAsync()
    }

    render() {
        const {app: {categories, jokes, favorite}} = this.props;
        return (
            <Container>
                <Header/>
                <div className="jokes-category_container">
                    <Row>
                        <Col sm={6}>
                            <h1>Select category</h1>
                            <select
                                value={this.state.category}
                                onChange={this.handleChange}
                                className="get_joke-select"
                            >
                                {categories.map((item) => {
                                    return <option key={item} value={item}>{item}</option>
                                })}
                            </select>
                            <button
                                disabled={this.state.category === ""}
                                onClick={this.getJoke}
                                className="get_joke-btn">
                                Get JOKE
                            </button>
                        </Col>
                        <Col sm={6}>
                            <div className="jokes-container">
                                {_.map(jokes, (item)=>{
                                    let isFavorite = _.find(favorite, ['id', item.id]);
                                    return (
                                        <div className="jokes-value-container" key={item.id}>
                                            <EditableJoke
                                                isEditable={false}
                                                item={item}
                                                isFavorite={isFavorite}
                                                addToFavorite={this.addToFavorite}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </Col>
                    </Row>
                </div>
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
        getCategoriesAsync: () => dispatch(getCategoriesAsync()),
        getJokeAsync: (category) => dispatch(getJokeAsync(category)),
        addToFavorite: (joke, isFavorite) => dispatch(addToFavorite(joke, isFavorite))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
