import React from 'react'
import '../global.js';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImages:null,
      isTransition: false,
    };
  }
  async componentDidMount() {

    let imagesArray = await this.pullImages();   

    const listImages = imagesArray.map((image) =>
      <div key={image.id} className='background-image' style={{backgroundImage: 'url(' + image.urls.regular + ')'}}>
      </div>
    );
    this.setState({'backgroundImages':listImages});
    
  }

  pullImages(){
    return new Promise((resolve, reject) => {
      const url = global.api.url+'/photos?per_page=15'+global.api.id;
        fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
        }).then((response) => response.json())
          .then((res) => {
            // console.log(res);
            resolve(res);
          })
          .catch((error) => {
            console.error(error);
            resolve([]);
          });
    });
  }

  goToApp =() =>{
    // console.log(this.state.isTransition);
    this.setState({'isTransition':true});
    let self = this;
    setTimeout(function(){
       self.props.history.push('/poster-maker');
    },1500);
  }

  render() {


    return (
      <div className={ this.state.isTransition ? "welcome-page inTransition" : "welcome-page" }>
        <div className="background-images-holder">
          {this.state.backgroundImages}
        </div>
        <div className="welcome-info-holder">
          <div className="welcome-info">
            <h1>PostrMakr</h1>
            <h2>Create a beautiful posters from Unsplash images!</h2>
            <div className="button-row">
              <button className="button inverse" onClick={this.goToApp}>Let's Get Started!</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome