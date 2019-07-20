import React from 'react';

import "./style.css";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';


class App extends React.Component {
    constructor() {
        super();

        this.state = {
            initials: ["0-9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
            journals: {}
        };
    }


    componentDidMount() {
        fetch('/all_journals.json')
            .then(res => res.json())
            .then((journals) => {
                this.setState({journals})
            })
            .catch("ERROR WHEN LOADING JSON");
    }


    render() {
        return (
            <main role="main">
                <Container>
                    <div className={"row"}>
                        <div className={"col-12 text-center"}>
                            <h2 className={"mt-3"}>Journal/Conference Title Abbreviations</h2>
                            <p>
                                List of abbreviations for several journals and conferences. Use them to shorten references. <br/>
                                This list was based on <a href="http://images.webofknowledge.com/images/help/WOS/0-9_abrvjt.html"
                                                          rel="noopener noreferrer" target="_blank">this site</a> and (possibly) contains all of the cited works in Web of Science.
                            </p>
                        </div>
                    </div>
                </Container>

                <Container>
                    <div className={"row"}>
                        <div className={"col-8 d-flex align-content-center flex-wrap"}>
                            <ul className={"list-group list-group-horizontal"}>
                                {
                                    Object.keys(this.state.journals).sort().map(initial =>
                                        <li className="list-group-item" key={initial}><h6><a href={"#"}>{initial}</a></h6></li>
                                    )
                                }
                            </ul>
                        </div>
                        <div className={"col-4"}>
                            <Form.Control type="email" placeholder="Search by Title or Abbreviation" />
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <ul className="list-group">
                                <li className="list-group-item">Cras justo odio</li>
                                <li className="list-group-item">Dapibus ac facilisis in</li>
                                <li className="list-group-item">Morbi leo risus</li>
                                <li className="list-group-item">Porta ac consectetur ac</li>
                                <li className="list-group-item">Vestibulum at eros</li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </main>
        );
    }
}

export default App;
