import React, { Component } from "react";
import "./index.css";
 
class Home extends Component {
  render() {
    return (
      <div>
        <h4>Project Requirements</h4>
        <p>1.Use Python-SPARQL API to run SPARQL queries against the Ontologies and embed these into Python-Flask RESTful Services. </p>
        <p>2.Write OPENAPI Specifications using Swagger and test your APIs on the Swagger website.</p>
        <p>3.Build Web Client/UI to enable users to browse the Nobel Winners by Nation, Year, and Category. The project will be graded for a reasonable UI. You may use React or any other technology for the UI.</p>
        <p>4.You should build a separate page giving all details for individual winners (e.g. a separate Web page for winner of the Physics Prize in 2010, etc).</p>
      </div>
    );
  }
}
 
export default Home;