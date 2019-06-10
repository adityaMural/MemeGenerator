import React from 'react';
import './style.css';


class MemeGenerator extends React.Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.rand = this.rand.bind(this)
    }
    
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const memes = response.data.memes
                this.setState({ allMemeImgs: memes })
            })
    }
    
   
    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }
    rand(event)
    {
        event.preventDefault();
        this.setState(prevState=> ({randomImg:prevState.allMemeImgs[Math.floor(Math.random() * this.state.allMemeImgs.length)].url}))
        
    
    }
    render() {
        return (
            <div>
                <form className="meme-form">
                    <input 
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    /> 
                    <input 
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    /> 
                
                    <button onClick={this.rand}>Gen</button>
                </form>
            <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator