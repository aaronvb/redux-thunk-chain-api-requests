# redux-thunk-chain-api-requests
This is an example on how to chain API requests using redux-thunk and axios.

### Use Case
We need to fetch an initial array of objects that each contain an ID. We then need to individually fetch the objects data with the ID and populate another model with the returned data. It would also *be cool* if we could show an initial list of objects, and update them in the UI as we fetch them individually.

### Example
In this example app, we will fetch an initial array of issues from https://github.com/facebook/react/issues, and then iterate over every issue in the array to fetch its detailed information(comments, etc) that are not provided in the initial array.

![redux-thunk-chain-api-example](https://user-images.githubusercontent.com/100900/35554723-c8a62f32-0540-11e8-9c16-2f4a2d66ea6b.gif)

### How
Using GitHub's API for issues (https://developer.github.com/v3/issues/), we can get a list of issues from the above repo using `GET /repos/facebook/react/issues`, this will return a response array that contains the issues.

With the array of issues we can then loop through each issue and fetch it issue using `GET /repos/facebook/react/issues/:number` (:number being one of the issues in the above array).

### Where's the challenge in that?
So now that we know how to get the data, how can we do this *asynchronously* and cleanly update the state as we go through each issue(providing a better user experience if we chose to display that).

### The Magic
It's simple! We can chain each redux-thunk action as long as they return a promise. In our case, we return an axios promise in each of our chained actions. Using `getState` we can provide our second action the data it needs.
```
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
```

### Running this example
The boilerplate for this example was created with [create-react-app](https://github.com/facebook/create-react-app).

After cloning and cd, run the following:

```
$ yarn install
$ yarn start
```
