import { useEffect, useReducer } from 'react';

import {
  Language,
  LanguagesFromApi,
  RepoData,
  RepoResponseFromApi,
} from '../types';

import { userMock as user } from '../mocks/user';

interface FetchState {
  error: string | null;
  isLoading: boolean;
  languages: Array<Language> | null;
  repositoryData: RepoData | null;
}

type FetchReducerAction =
  | {
      type: 'REQUEST_STARTED';
    }
  | {
      type: 'REQUEST_REPO_SUCCESSFUL';
      payload: RepoData;
    }
  | {
      type: 'REQUEST_LANGUAGES_SUCCESSFUL';
      payload: Array<Language>;
    }
  | {
      type: 'REQUEST_FAILED';
      error: string;
    };

const fetchRepoReducer = (
  state: FetchState,
  action: FetchReducerAction
): FetchState => {
  switch (action.type) {
    case 'REQUEST_STARTED':
      return {
        ...state,
        isLoading: true,
      };
    case 'REQUEST_REPO_SUCCESSFUL':
      return {
        ...state,
        isLoading: false,
        error: null,
        repositoryData: action.payload,
      };
    case 'REQUEST_LANGUAGES_SUCCESSFUL':
      return {
        ...state,
        isLoading: false,
        error: null,
        languages: action.payload,
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
  error: null,
  isLoading: false,
  languages: null,
  repositoryData: null,
};

export const useFetchRepo = (repoName: string | undefined) => {
  const [state, dispatch] = useReducer(fetchRepoReducer, INITIAL_STATE);

  useEffect(() => {
    fetchRepo(repoName);
  }, []);

  async function fetchRepo(
    repoName: string | undefined
  ): Promise<RepoResponseFromApi | string> {
    try {
      dispatch({ type: 'REQUEST_STARTED' });

      const responseRepo = await fetch(
        `https://api.github.com/repos/${user.login}/${repoName}`
      );
      const responseLanguages = await fetch(
        `https://api.github.com/repos/${user.login}/${repoName}/languages`
      );

      if (!responseRepo.ok) {
        throw new Error(`${responseRepo.status} ${responseRepo.statusText}`);
      }
      if (!responseLanguages.ok) {
        throw new Error(
          `${responseLanguages.status} ${responseLanguages.statusText}`
        );
      }

      const repoData = await responseRepo.json();
      const languagesData = await responseLanguages.json();

      const repo = mapFromApiToRepo(repoData);
      const languages = mapFromApiToLanguages(languagesData);

      dispatch({ type: 'REQUEST_REPO_SUCCESSFUL', payload: repo });
      dispatch({ type: 'REQUEST_LANGUAGES_SUCCESSFUL', payload: languages });
      return repoData;
    } catch (err: any) {
      dispatch({ type: 'REQUEST_FAILED', error: err.message });
      throw err;
    }
  }

  function mapFromApiToLanguages(
    apiResponse: LanguagesFromApi
  ): Array<Language> {
    const result = [];
    const total = Object.values(apiResponse).reduce(
      (sum, current) => sum + current,
      0
    );
    for (const [key, value] of Object.entries(apiResponse)) {
      result.push({
        name: key,
        percentage: (value / total) * 100,
      });
    }
    return result;
  }

  function mapFromApiToRepo(apiResponse: RepoResponseFromApi): RepoData {
    let {
      created_at,
      description,
      html_url,
      forks_count,
      name,
      pushed_at,
      stargazers_count,
      updated_at,
      watchers_count,
    } = apiResponse;

    created_at = created_at.slice(0, 10);
    description = description ? description : 'No Description';
    pushed_at = pushed_at.slice(0, 10);
    updated_at = updated_at.slice(0, 10);

    return {
      created_at,
      description,
      html_url,
      forks_count,
      name,
      pushed_at,
      stargazers_count,
      updated_at,
      watchers_count,
    };
  }

  return { state };
};
