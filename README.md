# Plan.com technical task

## Technologies/concepts involved

For the frontend:
* Vite (https://vitejs.dev/guide/) - Created the project by executing the following command: yarn create vite camlin-technical-task --template react-ts
* React
* Typescript
* Antd (https://ant.design/components/overview)
* Custom Hook to fetch data (useFetch), which is leveraging the generics typescript concept to accept and ensure its types
* Custom Hooke to debounce some actions, such as filtering the list and/or start playing the video
* ContextAPI is here to help us abstract and reuse some states across the application where necessary
* Making use of the Outlet (react-router-dom), so the component can be wrapper in a layout (Basically, a High-Order component, where a function takes a component and returns a new component).
* JSON Server mocking RestFul API, so we can make calls to the endpoints (https://www.npmjs.com/package/json-server). It allows, developers to mock data and make calls to the endpoints as they were reaching the backend.


## Setting Up & starting the webcomponents/json server applications

Please access the `plan-technical-task` folder, which is the related project.

If setting up through the docker container, you will need the docker configured on your machine.
* Run `docker-compose run plan-frontend-service yarn install && docker-compose up -d`
  Note: Bear in mind, that there is a bug related to installing node_modules within the container images, so it is necessary to run the command above as it is, so the node_modules installs using the right binaries, which are utilised within the container through the defined volume.

* The command above should start the react project (PORT=5180) and the json server (PORT=5181)
  * Frontend: http://localhost:5180/ , host gets exposed, so it is acessible on your browser
  * JSON Server: http://localhost:5181/
 
 Note: I was thinking on making the calls straight to gist.githubusercontent.com repository, but I came across some CORS issues, and decided to go with JSON server.

 ![image](https://github.com/user-attachments/assets/05feb554-0cbf-4047-b602-41dc276dc6bb)

 ![image](https://github.com/user-attachments/assets/990c4379-a53e-4f11-aadc-eb1de67103bc)

 
If, you decide to start the project outside the container, please guarantee you have node 20+ installed on your machine.
* Run `yarn install`
* Run `yarn run dev`
  * This command should start the react project (PORT=5180) and the json server (PORT=5181)
  * Frontend: http://localhost:5180/
  * JSON Server: http://localhost:5181/
 
* You can build it by running the following command `yarn run build`

![image](https://github.com/user-attachments/assets/199aa30d-5151-4212-9818-1f858ed6f229)

![image](https://github.com/user-attachments/assets/ec185e1f-8563-47c4-8888-ca2a26d7ef40)

![image](https://github.com/user-attachments/assets/b43c9564-de20-4efd-b70a-0b45b71504b3)


## Extras

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
