import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CharitiesCard  from './shared-components/CharitiesCard';

class NewsInstance extends Component {
    constructor (props){
        super(props);
        this.state = {
            author:	"",
            id:	0,
            image:	"",
            published_date: "",
            source:	"",
            state:	"",
            summary:	"",
            title:	"",
            url:	"",
            charities: [{address: "", id: 0, affiliation: "", cause_name: "", img: "", mission: "", name: "", state: "", tax_classification: ""},
                  {address: "", id: 0, affiliation: "", cause_name: "", img: "", mission: "", name: "", state: "", tax_classification: ""},
                  {address: "", id: 0, affiliation: "", cause_name: "", img: "", mission: "", name: "", state: "", tax_classification: ""}]
        }
    }
    componentWillMount(){
        const id = this.props.match.params.id;
        this.getJSON('https:api.relievepoverty.me/v1/news/' + id)
            .then(response => {
                var obj = JSON.parse(JSON.stringify(response));
                this.setState({author: obj.author, id: obj.id, image: obj.image, published_date: obj.published_date, source: obj.source,
                state: obj.state, summary: obj.summary, title: obj.title, url: obj.url})
                this.get_related_charities(obj.state);
            });
    }

    get_related_charities(state) {
        this.getJSON('https:api.relievepoverty.me/v1/charities?state=' + state)
         .then(response => {
             var obj = JSON.parse(JSON.stringify(response));
             this.setState({charities: obj.data});
         });
   }

    getJSON(url) {
        return fetch(url).then(response => {
            return response.json();
        });
    }
    render() {
        return (
            <>
            <div class="container">
                <h1 class="my-4">{this.state.title}</h1>
                <div class="row">
                    <div class="col-md-8">
                        <img class="img-fluid" src={this.state.image} alt="" />
                    </div>
                    <div class="col-md-4">
                        <h3 class="my-3">Summary</h3>
                        <p>{this.state.summary}</p>
                        <h3 class="my-3">Information</h3>
                        <ul>
                            <li>News Organization: {this.state.source}</li>
                            <li>Related State: <Link to={"/states/" + this.state.state}>{this.state.state}</Link></li>
                            <li>Author: {this.state.author}</li>
                            <li>Date Published: {this.state.published_date}</li>
                            <a href={this.state.url} target="_blank" class="btn btn-primary mt-auto">Read Article</a>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <h3 class="my-4">Related Charities</h3>
            </div>
            <div class="row related-instances">
             { this.state.charities[0] != undefined &&
               <CharitiesCard image={this.state.charities[0].img} title={this.state.charities[0].name} description={this.state.charities[0].mission} id={this.state.charities[0].id}/>
             }
             { this.state.charities[1] != undefined &&
               <CharitiesCard image={this.state.charities[1].img} title={this.state.charities[1].name} description={this.state.charities[1].mission} id={this.state.charities[1].id}/>
             }
             { this.state.charities[2] != undefined &&
               <CharitiesCard image={this.state.charities[2].img} title={this.state.charities[2].name} description={this.state.charities[2].mission} id={this.state.charities[2].id}/>
             }
          </div>
          </>
        )
    }
}

export default NewsInstance;
