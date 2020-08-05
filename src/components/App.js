import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  componentDidMount() {
    this.fetchPets();
  }

  fetchPets() {
    const type = this.state.filters.type;
    fetch(`/api/pets${type === "all" ? "" : `?type=${type}`}`)
      .then((res) => res.json())
      .then((pets) => this.setState({ pets }));
  }

  onChangeType = (e) => {
    this.setState({ filters: { type: e.target.value } });
  };

  onFindPetsClick = () => {
    this.fetchPets();
  };

  onAdoptClick = (id) => {
    const pets = this.state.pets.map((petObj) => {
      const newPet = { ...petObj };
      if (newPet.id === id) {
        newPet.isAdopted = true;
      }
      return newPet;
    });

    this.setState({ pets });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptClick={this.onAdoptClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
