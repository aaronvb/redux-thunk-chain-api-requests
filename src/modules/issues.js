import axios from 'axios';

export const ISSUES_REQUESTED = 'issues/ISSUES_REQUESTED';
export const ISSUES_RECEIVED = 'issues/ISSUES_RECEIVED';

export const ISSUE_COMMENTS_RECEIVED = 'issues/ISSUE_COMMENTS_RECEIVED';

const initialState = {
  issuesById: [],
  issueCommentsByHash: {},
  isRetrievingIssues: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ISSUES_REQUESTED:
      return {
        ...state,
        isRetrievingIssues: true,
      };

    case ISSUES_RECEIVED:
      return {
        ...state,
        isRetrievingIssues: !state.isRetrievingIssues,
        issuesById: action.payload,
      };

    case ISSUE_COMMENTS_RECEIVED:
      return {
        ...state,
        issueCommentsByHash: {
          ...state.issueCommentsByHash,
          [action.id]: action.payload,
        },
      };

    default:
      return state;
  }
};

// Request issues using axios
// Request: GET
// Params: none
// Return: Array
export const requestIssues = () => {
  return dispatch => {
    dispatch({
      type: ISSUES_REQUESTED,
    });

    return fetchIssues()
      .then(resp => resp.data)
      .then(data =>
        dispatch({
          type: ISSUES_RECEIVED,
          payload: data,
        }),
      );
  };
};

const fetchIssues = () => {
  const url = 'https://api.github.com/repos/facebook/react/issues';

  return axios.get(url, {
    params: {
      per_page: 10,
    },
  });
};

// Request individual issue using axios
// Request: GET
// Params: issue number
// Return: Object
export const requestIssueCommentsHash = issueNumber => {
  return dispatch => {
    return fetchIssueComments(issueNumber)
      .then(resp => resp.data)
      .then(data =>
        dispatch({
          type: ISSUE_COMMENTS_RECEIVED,
          id: issueNumber,
          payload: data,
        }),
      );
  };
};

const fetchIssueComments = issueNumber => {
  const url = `https://api.github.com/repos/facebook/react/issues/${issueNumber}/comments`;

  return axios.get(url);
};

// Request issues using axios
// then request individual issue using axios
// This is the magic that chains our redux-thunk promises together.
export const requestIssuesAndIssueData = () => {
  return (dispatch, getState) => {
    dispatch(requestIssues()).then(() => {
      const issuesArr = getState().issues.issuesById;
      issuesArr.forEach(issue => {
        dispatch(requestIssueCommentsHash(issue.number));
      });
    });
  };
};
