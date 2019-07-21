import React from 'react';

import "./style.css";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';


class App extends React.Component {
    constructor() {
        super();

        this.state = {
            initials: ["0-9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
            journals: {},
            targetInitial: null
        };

        this.updateTable = this.updateTable.bind(this);
    }


    componentDidMount() {
        fetch('/all_journals.json')
            .then(res => res.json())
            .then((journals) => {
                const targetInitial = "0-9";
                this.setState({journals, targetInitial});
            })
            .catch("ERROR WHEN LOADING JSON");
    }


    updateTable(initial) {
        this.setState({targetInitial: initial});
    }

    getTargetJournals(initial) {
        if (initial in this.state.journals) {
            console.log("oioioioi");
            return this.state.journals[initial];
        }
        else return [];
    }


    render() {
        const targetJournals = (this.state.targetInitial in this.state.journals) ? this.state.journals[this.state.targetInitial] : [];

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
                                        <li className="list-group-item" key={initial} ref={"letterLi"}
                                            onClick={() => this.updateTable(initial)}>
                                            <h6><a href={"javascript:void(0)"}>{initial}</a></h6>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                        <div className={"col-4"}>
                            <Form.Control type="email" placeholder="Search by Title or Abbreviation" />
                        </div>
                    </div>
                    <div className={"row"} style={{marginTop: "10px"}}>
                        <div className={"col-12"}>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Journal/Conference's Title</th>
                                    <th scope="col">Abbreviation</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    targetJournals.map((journal, idx) =>
                                    <tr>
                                        <th scope="row">{idx}</th>
                                        <td>{journal.title}</td>
                                        <td>{journal.abbr}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Container>
            </main>
        );
    }
}

export default App;
