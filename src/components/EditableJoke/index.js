import React from 'react';
import _ from "lodash";

import fullHeart from "../../img/heart-svgrepo-com (1).svg";
import heart from "../../img/heart-svgrepo-com.svg";
import pencil from "../../img/pencil-svgrepo-com.svg";
import save from "../../img/check-mark-svgrepo-com.svg";
import cancel from "../../img/cancel-svgrepo-com.svg";

class EditableJoke extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            joke: this.props.item,
            deepValue: _.cloneDeep(this.props.item),
            isEditing: false
        };
    }

    addToFavorite = (joke) => {
        this.props.addToFavorite(joke, true);
    };

    editJoke = () => {
        this.setState({
            isEditing: !this.state.isEditing
        })
    };

    updateJoke = () => {
        this.props.updateJoke(this.state.joke);
        this.editJoke();
    };

    cancelJoke = () => {
        this.setState({
            joke: _.cloneDeep(this.props.item),
        });
        this.editJoke();
    };

    onChange = (e) => {
        const {joke} = this.state;
        joke.value = e.target.value;
        this.setState({
            joke,
        });
    };

    render() {
        const {
            isFavorite,
            addToFavorite,
            isEditable,
        } = this.props;
        const {isEditing, joke} = this.state;
        return (
            <>
                {isEditing ?
                    <>
                        <input
                            style={{width: "100%"}}
                            type="text"
                            defaultValue={joke.value}
                            onChange={(e) => this.onChange(e, joke.id)}
                        />
                        <img
                            onClick={() => this.updateJoke(joke)}
                            className="add-to-favorite-img"
                            src={save}
                            alt="save"
                        />
                        <img
                            onClick={() => this.cancelJoke(joke)}
                            className="add-to-favorite-img"
                            src={cancel}
                            alt="save"
                        />
                    </> : <>
                        <p className="jokes-value">{joke.value}</p>
                        <img
                            onClick={() => addToFavorite(joke)}
                            className="add-to-favorite-img"
                            src={!!isFavorite ? fullHeart : heart}
                            alt="heart"
                        />
                        {isEditable &&
                        <img
                            onClick={() => this.editJoke(joke)}
                            className="add-to-favorite-img"
                            src={pencil}
                            alt="heart"
                        />}
                    </>}

            </>
        )
    }
}

export default EditableJoke;
