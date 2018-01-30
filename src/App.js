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
      <li key={issue.id}>
        <strong>#{issue.number}</strong>{' '}
        <a href={issue.html_url}>{issue.title}</a>
        <div className="issueComments">{this.renderIssueComments(issue)}</div>
      </li>
    ));

    return issues;
  }

  renderIssueComments(issue) {
    if (this.props.issueCommentsByHash[issue.number]) {
      const commentsArr = this.props.issueCommentsByHash[issue.number];
      return <ul>{this.renderIssueComment(commentsArr)}</ul>;
    } else {
      return <span>Loading...</span>;
    }
  }

  renderIssueComment(commentsArr) {
    if (commentsArr.length === 0) {
      return <em>No comments.</em>;
    } else {
      const comments = commentsArr.map(comment => (
        <li key={comment.id}>
          <strong>{comment.user.login}</strong>:
          <div>{comment.body}</div>
        </li>
      ));
      return comments;
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Last 10 React Issues</h1>
        <div className="Issues">
          <ul>{this.renderIssues()}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  issuesById: state.issues.issuesById,
  issueCommentsByHash: state.issues.issueCommentsByHash,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestIssuesAndIssueData,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
