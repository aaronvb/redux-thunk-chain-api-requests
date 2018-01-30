import axios from 'axios';

export const ISSUES_REQUESTED = 'issues/ISSUES_REQUESTED';
export const ISSUES_RECEIVED = 'issues/ISSUES_RECEIVED';

export const ISSUE_RECEIVED = 'issues/ISSUE_RECEIVED';

const initialState = {
  issuesById: [],
  issuesByHash: {},
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

    case ISSUE_RECEIVED:
      return {
        ...state,
        issuesByHash: {
          ...state.issuesByHash,
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
export const requestIssueHash = issueNumber => {
  return dispatch => {
    return fetchIssue(issueNumber)
      .then(resp => resp.data)
      .then(data =>
        dispatch({
          type: ISSUE_RECEIVED,
          id: data.id,
          payload: data,
        }),
      );
  };
};

const fetchIssue = issueNumber => {
  const url =
    '/https://api.github.com/repos/facebook/react/issues/' + issueNumber;

  return axios.get(url);
};
