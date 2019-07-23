import React from 'react';
import { decode } from 'he';

import "./style.css";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";


class App extends React.Component {
    constructor() {
        super();

        this.state = {
            initials: ["0-9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
            journals: {},
            targetInitial: null,
            targetJournals: []
        };

        this.updateTable = this.updateTable.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.search = this.search.bind(this);
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
        this.refs.inputField.value = "";
        const targetInitial = initial;
        const targetJournals = this.state.journals[targetInitial];

        this.setState({targetInitial, targetJournals});
    }

    handleKeyDown(event) {
        if (event.key === "Enter") {
            this.search();
        }
    }

    search() {
        if (this.refs.inputField.value) {
            let targetJournals = [];
            const regex = new RegExp(`^.*${this.refs.inputField.value.toUpperCase()}.*$`);
            console.log("====> ", this.refs.inputField.value.toUpperCase());

            for (let initial in this.state.journals) {
                this.state.journals[initial].forEach(journal => {
                    if (regex.test(journal.title.toUpperCase()) || regex.test(journal.abbr.toUpperCase())) {
                        targetJournals.push(journal);
                    }
                });
            }

            this.setState({targetJournals});
        }
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
                                                          rel="noopener noreferrer" target="_blank">this site/link</a> and (possibly) contains all of the cited works in Web of Science. <br/>

                                Suggestion? Please contact us on <a href={"https://twitter.com/hisamuka"}>twitter</a> or <a href={"https://github.com/hisamuka/journal-conference-abbreviations"}>github</a>.
                            </p>
                        </div>
                    </div>
                </Container>

                <Container>
                    <div className={"row"}>
                        <div className={"col-8 d-flex align-content-center flex-wrap"}>
                            <ul className={"list-group list-group-horizontal"}>
                                {
                                    this.state.initials.map(initial =>
                                        <li className={"list-group-item"} key={initial}
                                            onClick={() => this.updateTable(initial)}>
                                            <Button variant="link">{initial}</Button>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                        <div className={"col-3"}>
                            <Form.Control type="email" placeholder="Search by Title or Abbreviation" ref={"inputField"}
                                          onKeyDown={this.handleKeyDown} />
                        </div>
                        <div className={"col-1"}>
                            <button type="button" className="btn btn-primary" onClick={this.search}>Search!</button>
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
                                    this.state.targetJournals.map((journal, idx) =>
                                    <tr key={idx}>
                                        <th scope="row">{idx}</th>
                                        <td>{decode(journal.title)}</td>
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
