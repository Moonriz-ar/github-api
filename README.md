# GitPanda

A webapp that lets you input a Github username (for example, my username: Moonriz-ar), and checkout the user's bio info and repositories by integrating with Github API.

<br />

Tech stack: Typescript, React, React-Router-Dom 6, Material UI, styled-components

<br />

Practiced the following concepts:
- Typescript: type and interface definitions and usage in functional components
- React-Router-Dom 6: define routes and set up public and private routes
- Custom hooks: with Typescript to fetch repositories list and repository detail from Github API
- useContext: to subscribe to User from any component within provider, show User info and to make API calls with user.login data
- useCallback: to avoid infinite loop in useEffect function dependency

[Assignment](https://docs.google.com/document/d/1mrqBRTc1A9n34yHcBtMcufI9F0D-hy4wQ_SjeCp1DIY/edit)
<br />
[Demo link](https://gitpanda.vercel.app/login "Demo link")
<br />
[References](https://alert-milk-258.notion.site/Hitbug-ac5a144460a649628234e1dd1c1f06fc)


## Screens
#### login
![chrome_g6vtNznsDj](https://user-images.githubusercontent.com/55898995/191960623-0660b767-3edb-4393-9a9a-34b8b2f02b78.png)
#### home
![chrome_WtLMjchCjZ](https://user-images.githubusercontent.com/55898995/191960667-a81c7991-4ae6-4578-8cba-5eb2abc199e4.png)
#### user info
![chrome_Teq47nJSKs](https://user-images.githubusercontent.com/55898995/191960695-3edb49d2-2e2a-48a0-9224-c1265eaa1a73.png)
#### repositories list
![chrome_h5ZRxMITwk](https://user-images.githubusercontent.com/55898995/191960711-fb8c970a-1c54-4005-b299-82657788017a.png)
#### repository detail
![chrome_dpUu9Fgb7O](https://user-images.githubusercontent.com/55898995/191960722-e7b0744e-3006-4ee1-9976-5e59cd8c83c9.png)
