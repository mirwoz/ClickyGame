import React, { Component } from "react";
import Nav from "../Nav";
import Header from "../Header";
import Container from "../Container";
import Item from "../Item";
import data from "../../data.json";


class Game extends Component {
    state = {
        data,
        score: 0,
        topScore: 0
    };

    componentDidMount() {
        this.setState({ data: this.shuffleData(this.state.data) });
    }

    shuffleData = data => {
        let i = data.length - 1;
        while (i > 0) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = data[i];
            data[i] = data[j];
            data[j] = temp;
            i--;
        }
        return data;
    };

    correctGuess = newData => {
        const { topScore, score } = this.state;
        const newScore = score + 1;
        const newTopScore = Math.max(newScore, topScore);

        this.setState({
            data: this.shuffleData(newData),
            score: newScore,
            topScore: newTopScore
        });
    };

    incorrectGuess = data => {
        this.setState({
            data: this.resetData(data),
            score: 0
        });
    };

    resetData = data => {
        const resetData = data.map(item => ({ ...item, clicked: false }));
        return this.shuffleData(resetData);
    };

  

    handleItemClick = id => {
        let guessedCorrectly = false;
        const newData = this.state.data.map(item => {
            const newItem = { ...item };
            if (newItem.id === id) {
                if (!newItem.clicked) {
                    newItem.clicked = true;
                    guessedCorrectly = true;
                }
            }
            return newItem;
        });
        guessedCorrectly
            ? this.correctGuess(newData)
            : this.incorrectGuess(newData);
    };

    render() {
        return (
            <div>
                <Nav score={this.state.score} topScore={this.state.topScore} />
                <Header />
                <Container>
                    {this.state.data.map(item => (
                        <Item
                            key={item.id}
                            id={item.id}
                            handleClick={this.handleItemClick}
                            image={item.image}
                        />
                    ))}
                </Container>
            </div>
        );
    }
}

export default Game;