import { useReducer } from 'react';

import { Repo, ReposResponseFromApi } from '../types/index';

interface Params {
  sort: string;
  direction: string;
}

interface FetchState {
  isLoading: boolean;
  data: Array<Repo> | null;
  error: string | null;
}

type FetchReducerAction =
  | {
      type: 'REQUEST_STARTED';
    }
  | {
      type: 'REQUEST_SUCCESSFUL';
      payload: Array<Repo>;
    }
  | {
      type: 'REQUEST_FAILED';
      error: string;
    };

const fetchReposReducer = (
  state: FetchState,
  action: FetchReducerAction
): FetchState => {
  switch (action.type) {
    case 'REQUEST_STARTED':
      return {
        ...state,
        isLoading: true,
      };
    case 'REQUEST_SUCCESSFUL':
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    case 'REQUEST_FAILED':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
  }
};

const INITIAL_STATE: FetchState = {
  isLoading: false,
  data: null,
  error: null,
};

export const useFetch = (url: string) => {
  const [state, dispatch] = useReducer(fetchReposReducer, INITIAL_STATE);

  const fetchRepos = async (params?: Params): Promise<ReposResponseFromApi> => {
    dispatch({ type: 'REQUEST_STARTED' });
    let response;
    if (params) {
      response = await fetch(
        `${url}?sort=${params.sort}&direction=${params.direction}`
      );
    } else {
      response = await fetch(url);
    }
    if (!response.ok) {
      console.log('inside fetchRepos', response);
      // throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  };

  const mapFromApiToRepos = (
    apiResponse: ReposResponseFromApi
  ): Array<Repo> => {
    return apiResponse.map((repoFromApi) => {
      let {
        description,
        fork,
        html_url,
        id,
        name,
        language,
        stargazers_count,
        watchers_count,
      } = repoFromApi;

      description = description ? description : 'No Description';

      return {
        description,
        fork,
        html_url,
        id,
        name,
        language,
        stargazers_count,
        watchers_count,
      };
    });
  };

  return { dispatch, state, fetchRepos, mapFromApiToRepos };
};
