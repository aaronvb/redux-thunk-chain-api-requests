import axios from 'axios';

export const ISSUES_RETRIEVING = 'issues/ISSUES_RETRIEVING';
export const ISSUES_RECEIVED = 'issues/ISSUES_RECEIVED';

export const ISSUE_RETRIEVING = 'issues/ISSUE_RETRIEVING';
export const ISSUE_UPDATED = 'issues/ISSUE_UPDATED';

const initialState = {
  issuesById: [],
  issuesByHash: {},
  isRetrievingIssues: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ISSUES_RETRIEVING:
      return {
        ...state,
        isRetrievingIssues: true,
      };

    case ISSUES_RECEIVED:
      return {
        ...state,
      };

    case ISSUE_UPDATED:
      return {
        ...state,
      };

    default:
      return state;
  }
};
