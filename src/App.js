import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {requestIssuesAndIssueData} from './modules/issues';
import './App.css';

class App extends Component {
  componentWillMount() {
    this.props.requestIssuesAndIssueData();
  }

  renderIssues() {
    const issuesById = this.props.issuesById;

    const issues = issuesById.map(issue => (
      <li key={issue.id}>{issue.title}</li>
    ));

    return issues;
  }

  render() {
    return (
      <div className="App">
        <h1>Last 10 React Issues</h1>
        <a href="https://github.com/facebook/react/issues">
          https://github.com/facebook/react/issues
        </a>
        <div className="Issues">
          <ul>{this.renderIssues()}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  issuesById: state.issues.issuesById,
  issuesByHash: state.issues.issuesByHash,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestIssuesAndIssueData,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
