import { useEffect, useReducer } from 'react';

import { Repo, ReposResponseFromApi } from '../types/index';

import { userMock as user } from '../mocks/user';

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

const REPOS_API_URL = `https://api.github.com/users/${user.login}/repos`;

export const useFetchRepos = () => {
  const [state, dispatch] = useReducer(fetchReposReducer, INITIAL_STATE);

  useEffect(() => {
    fetchRepos();
  }, []);

  async function fetchRepos(
    params?: Params
  ): Promise<ReposResponseFromApi | string> {
    try {
      dispatch({ type: 'REQUEST_STARTED' });
      if (params) {
        const response = await fetch(
          `${REPOS_API_URL}?sort=${params.sort}&direction=${params.direction}`
        );
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const repositories = mapFromApiToRepos(data);
        dispatch({ type: 'REQUEST_SUCCESSFUL', payload: repositories });
        return data;
      } else {
        const response = await fetch(REPOS_API_URL);
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const repositories = mapFromApiToRepos(data);
        dispatch({ type: 'REQUEST_SUCCESSFUL', payload: repositories });
        return data;
      }
    } catch (err: any) {
      dispatch({ type: 'REQUEST_FAILED', error: err.message });
      throw err;
    }
  }

  function mapFromApiToRepos(apiResponse: ReposResponseFromApi): Array<Repo> {
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
  }

  return { dispatch, state, fetchRepos };
};
