## Resources

### [Official Blog](https://www.cypress.io/blog)

- [TDD Development Guide using Cypress](https://www.cypress.io/blog/2019/02/05/modern-frontend-testing-with-cypress/)

- [Snapshot Testing](https://www.cypress.io/blog/2018/01/16/end-to-end-snapshot-testing/)

- [Visual Testing with Cypress](https://www.cypress.io/blog/2019/07/11/visual-testing-with-cypress/)

- [JSON Schema Testing with Cypress](https://www.cypress.io/blog/2018/07/10/json-schemas-are-your-true-testing-friend/)

- [Create Standalone App for CI Testing - Use Parcel for compiling code](https://www.cypress.io/blog/2019/05/13/code-create-react-app-v3-and-its-cypress-tests-using-typescript/)

- [Immutable Deploy Testing (git hooks)](https://www.cypress.io/blog/2017/05/30/cypress-and-immutable-deploys/)

- [Speed up end-to-end test runs with Parallelization](https://www.cypress.io/blog/2018/09/05/run-end-to-end-tests-on-ci-faster/)

- [Run Cypress with a single Docker command](https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/)

- [Dockerize Cypress](https://www.cypress.io/blog/2018/08/08/fast-tests-tiny-docker-image/)

- [Setting up CI Pipeline (Angular Example](https://www.cypress.io/blog/2019/08/02/guest-post-angular-adding-cypress-ui-tests-to-your-devops-pipeline/)

- [Testing on CI tips](https://www.cypress.io/blog/2017/11/07/add-gui-to-your-e2e-api-tests/)

## Table Of Contents

- [Development Steps](#development-steps)
  - [Initial setup](#initial-setup)
  - [Implementation using TDD](#implementation-using-tdd)
    - [Add fixtures](#add-fixtures)
      - [Usage](#usage)
      - [Stub GraphQL Requests](#stub-graphql-requests)
- [Useful Commands](#useful-commands)
  - [Tab](#tab)
    - [Usage](#usage-3)      
- [Example Code](#example-code)
  - [Page Objects](#page-objects)
    - [Implementation Details](#implementation-details)
  - [Custom Commands](#custom-commands)
    - [Login (Javascript Version](#login--javascript-version-)
      - [Usage](#usage-2)
    - [Login (Cypress Command Version](#login--cypress-command-version-)
      - [Usage](#usage-1)
  - [Working with iframes](#iframe)
- [Cypress Video Tutorials](#cypress-video-tutorials)
  - [How to test a React App](https://docs.cypress.io/examples/examples/tutorials.html#Test-a-React-Todo-App)
  - [Recipes](https://docs.cypress.io/examples/examples/recipes.html#fundamentals)

## Development Steps

###### [Reference Blog Entry](https://www.cypress.io/blog/2019/02/05/modern-frontend-testing-with-cypress/)

### Initial setup

- Convert user stories, requirements, and acceptance criteria into partial test specs
- Add fixtures and stub out network calls
- Run the Cypress Test Runner and keep it open next to your code editor

> Create partial test specs (Covert User Stories into partial tests)

```
describe('todo app', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('h1').contains('Todo List');
  });

  it('should display the todo list', () => {});

  it('should add a new todo to the list', () => {});

  it('should toggle a todo correctly', () => {});
});
```

### Implementation using TDD

- Use `.only` to focus, and iterate, on a single test
- Ensure the test fails
- Code until that test passes (`red`, `green`, `refactor`)
- Repeat the previous three steps until all tests are green

###### Add fixtures

> client/cypress/fixtures/todos/all_before.json

```js
export default {
  data: {
    todos: [
      {
        complete: false,
        created_date: 'Mon, 28 Jan 2019 15:32:28 GMT',
        id: 1,
        name: 'go for a walk'
      }
    ]
  },
  status: 'success'
};
```

> client/cypress/fixtures/todos/add.json

```js
export default {
  name: 'make coffee'
};
```

#### Usage

```js
beforeEach(() => {
  // fixtures
  cy.fixture('todos/all_before.json').as('todosJSON');
  cy.fixture('todos/add.json').as('addTodoJSON');
  cy.fixture('todos/all_after.json').as('updatedJSON');

  cy.visit('/');
  cy.get('h1').contains('Todo List');
});
```

#### Stub GraphQL Requests

```
it.only('should add a new todo to the list', () => {
  // network stubs
  cy.server();
  cy.route('GET', 'http://localhost:5009/todos', '@updatedJSON').as('getAllTodos');
  cy.route('POST', 'http://localhost:5009/todos', '@addTodoJSON').as('addTodo');

  // asserts
  cy.get('.input').type('drink a beverage');
  cy.get('.button').contains('Submit').click();
  cy.wait('@addTodo');
  cy.wait('@getAllTodos');
  cy.get('li').its('length').should('eq', 4);
  cy.get('li').eq(0).contains('go for a walk');
  cy.get('li').eq(3).contains('drink a beverage');
});
```
## Useful Commands

#### Tab

###### Usage

- `.tab()` must be chained off of a tabbable(focusable) subject, or the `body`
- `.tab()` changes the subject to the newly focused element after pressing `tab`
- `.tab({ shift: true })` sends a shift-tab to the element

```js
cy.get('input')
  .type('foo')
  .tab()
  .type('bar'); // type foo, then press tab, then type bar
cy.get('body').tab(); // tab into the first tabbable element on the page
cy.focused().tab(); // tab into the currently focused element
```

shift+tab:

```js
cy.get('input')
  .type('foop')
  .tab()
  .type('bar')
  .tab({ shift: true })
  .type('foo'); // correct your mistake
```

###### iframe

```js
// switch to an iframe subject
cy.get('#iframe-foo')
  .switchToIframe()
  .get('#button')
  .click(); // executed in <iframe id='iframe-foo' />

// or pass in $iframe object in hand
cy.get('#iframe-foo').then(($iframe) => {
  cy.switchToIframe($iframe);
  cy.get('#button').click();
});

// now switch back to the main frame
cy.switchToMain()
  .get(':checkbox')
  .check(); // issued on the main frame
```

### [Official Plugins](https://docs.cypress.io/guides/tooling/plugins-guide.html#Use-Cases)

#### Categories

##### [Authentication](https://docs.cypress.io/plugins/index.html#authentication)

##### [Development Tools](https://docs.cypress.io/plugins/index.html#development-tools)

- **[cypress-select-tests](https://github.com/bahmutov/cypress-select-tests)**
  > Filter running cy specs

###### - **[cypress-dotenv](https://github.com/morficus/cypress-dotenv)**

###### - **[cypress-fiddle](https://github.com/cypress-io/cypress-fiddle)**

> Generate Cypress tests live from HTML and JS

```js
import { testExamples } from '@cypress/fiddle';
const suite = {
  'parent suite': {
    'inner suite': [
      {
        name: 'a test',
        html: `
          <div id="name">Joe</div>
        `,
        test: `
          cy.contains('#name', 'Joe')
        `
      }
    ],
    'list test': {
      html: `
        <ul>
          <li>Alice</li>
          <li>Bob</li>
          <li>Cory</li>
        </ul>
      `,
      test: `
        cy.get('li').should('have.length', 3)
          .first().should('contain', 'Alice')
      `
    }
  }
};

testExamples(suite);
```

###### - **[cypress-autorecord](https://github.com/Nanciee/cypress-autorecord)**

> It simplifies mocking by auto-recording/stubbing HTTP interactions and automating the process of updating/deleting recordings.

###### - **[cypress-docker-images](https://github.com/cypress-io/cypress-docker-images)**

#### [Component Testing](https://docs.cypress.io/plugins/index.html#component-testing)

- [cypress-react-unit-test](https://github.com/bahmutov/cypress-react-unit-test)

  > Test React components using Cypress Test Runner

- [cypress-cycle-unit-test](https://github.com/bahmutov/cypress-cycle-unit-test)
  > Test Cycle.js components using Cypress Test Runner

#### [Custom Commands](https://docs.cypress.io/plugins/index.html#custom-commands)

- [cypress-commands](https://github.com/Lakitna/cypress-commands)
  > Extends & Add to existing commands

###### - **[cypress-testing-library](https://github.com/testing-library/cypress-testing-library)**

**[then](https://github.com/Lakitna/cypress-commands/blob/develop/docs/then.md)**

Pass in an options object to change the default behavior of `.then()`.

| Option | Default | Description |
| --- | --- | --- |
| `timeout` | [`defaultCommandTimeout`](https://docs.cypress.io/guides/references/configuration.html#Timeouts) | Time to wait for `.then()` to resolve before [timing out](https://docs.cypress.io/api/commands/then.html#Timeouts) |
| `retry` | `false` | Retry itself until assertions you've chained all pass |
| `log` | `false` | Displays the command in the [Command log](https://docs.cypress.io/guides/core-concepts/test-runner.html#Command-Log) |

**[attribute](https://github.com/Lakitna/cypress-commands/blob/develop/docs/attribute.md)**

| Option | Default | Description |
| --- | --- | --- |
| `timeout` | [`defaultCommandTimeout`](https://docs.cypress.io/guides/references/configuration.html#Timeouts) | Time to wait for `.attribute()` to resolve before [timing out](https://docs.cypress.io/api/commands/then.html#Timeouts) |
| `log` | `false` | Displays the command in the [Command log](https://docs.cypress.io/guides/core-concepts/test-runner.html#Command-Log) |
| `whitespace` | `keep` | Replace complex whitespace with a single regular space.<br> Accepted values: `simplify`, `keep-newline` & `keep` |
| `strict` | `true` | Implicitly assert that all subjects have the requested attribute |

```js
cy.get('a').attribute('href'); // Yields the value of the `href` attribute

cy.get('p')
  .attribute('hidden')
  .should('exist')
  .should('be.empty');
```

**[text](https://github.com/Lakitna/cypress-commands/blob/develop/docs/text.md)**

###### Arguments

**> options** **_(Object)_**

Pass in an options object to change the default behavior of `.text()`.

| Option | Default | Description |
| --- | --- | --- |
| `timeout` | [`defaultCommandTimeout`](https://docs.cypress.io/guides/references/configuration.html#Timeouts) | Time to wait for `.text()` to resolve before [timing out](https://docs.cypress.io/api/commands/then.html#Timeouts) |
| `log` | `false` | Displays the command in the [Command log](https://docs.cypress.io/guides/core-concepts/test-runner.html#Command-Log) |
| `whitespace` | `simplify` | Replace complex whitespace with a single regular space.<br> Accepted values: `simplify`, `keep-newline` & `keep` |
| `depth` | `0` | Include the text contents of child elements upto `n` levels |

```js
cy.get('div').text();

`<div class="grandparent">
  Grandma Gazelle
  <div class="parent">
    Mother Meerkat
    <div class="child">
      Son Scorpion
    </div>
  </div>
  <div class="parent">
    Father Fox
  </div>
</div>
`;

// yields "Grandma Gazelle Mother Meerkat Father Fox"
cy.get('.grandparent').text({ depth: 1 });
```

**[to](https://github.com/Lakitna/cypress-commands/blob/develop/docs/to.md)**

###### Arguments

**> type** **_(string)_**

The type you want to cast the subject to. Must be one of `number`, `string` or `array`.

**> options** **_(Object)_**

Pass in an options object to change the default behavior of `.to()`.

| Option | Default | Description |
| --- | --- | --- |
| `timeout` | [`defaultCommandTimeout`](https://docs.cypress.io/guides/references/configuration.html#Timeouts) | Time to wait for `.to()` to resolve before [timing out](https://docs.cypress.io/api/commands/then.html#Timeouts) |
| `log` | `false` | Displays the command in the [Command log](https://docs.cypress.io/guides/core-concepts/test-runner.html#Command-Log) |

```js
cy.wrap('042').to('string'); // Casting a string to a number
```

**[request](https://github.com/Lakitna/cypress-commands/blob/develop/docs/request.md)**

```js
cy.request(url);
cy.request(url, body);
cy.request(method, url);
cy.request(method, url, body);
cy.request(options);

// Correct Usage
cy.visit('http://localhost:8080/app');
cy.request('users/1.json'); //  url is  http://localhost:8080/users/1.json
```

###### - **[cypress-wait-until](https://github.com/NoriSte/cypress-wait-until)**

###### Arguments

- checkFunction

A function that must return a truthy value when the wait is over.

- options:Object (optional)

Pass in an options object to change the default behavior of `cy.waitUntil()`.

| Option | Default | Description |
| --- | --- | --- |
| `errorMsg` | `"Timed out retrying"` | The error message to write. |
| `timeout` | `5000` | Time to wait for the `checkFunction` to return a truthy value before throwing an error. |
| `interval` | `200` | Time to wait between the `checkFunction` invocations. |
| `description` | `"waitUntil"` | The name logged into the Cypress Test Runner. |
| `logger` | `Cypress.log` | A custom logger in place of the default [Cypress.log](https://docs.cypress.io/api/cypress-api/cypress-log.html). It's useful just for debugging purposes. |
| `log` | `true` | Enable/disable logging. |
| `customMessage` | `undefined` | String logged after the `options.description`. |
| `verbose` | `false` | If every single check result must be logged. |
| `customCheckMessage` | `undefined` | Like `customMessage`, but used for every single check. Useless if `verbose` is not set to `true`. |

```js
// wait until a cookie is set
cy.waitUntil(() =>
  cy.getCookie('token').then((cookie) => Boolean(cookie && cookie.value))
);

// with all the available options
cy.waitUntil(() => cy.window().then((win) => win.foo === 'bar'), {
  errorMsg: 'This is a custom error message', // overrides the default error message
  timeout: 2000, // waits up to 2000 ms, default to 5000
  interval: 500 // performs the check every 500 ms, default to 200
});
```

###### - **[cypress-graphql-mock](https://github.com/tgriesser/cypress-graphql-mock)**

> Adds commands for executing a mocked GraphQL server using only the client

[Example React Application](https://github.com/tgriesser/cypress-graphql-mock-example)

```js
/// <reference types="cypress" />
/// <reference path="../../support/commands.ts" />
import schema from '../../../schema.json';
import { Mocks_AllOperations } from '../../src/mock-types';

describe('load more', () => {
  beforeEach(() => {
    cy.server();
    cy.mockGraphql({ schema });
    cy.route('/sockjs-node', {});
  });

  it('Should show submit button when logged in', () => {
    cy.mockGraphqlOps <
      Mocks_AllOperations >
      {
        operations: {
          CurrentUserForLayout: {
            currentUser: {
              login: 'Tim Griesser',
              avatar_url: 'https://avatars1.githubusercontent.com/u/154748?v=4'
            }
          }
        }
      };
    cy.visit('/');
    cy.get('[data-e2e="submit_btn"]').should('have.attr', 'href', '/submit');
    cy.mockGraphqlOps <
      Mocks_AllOperations >
      {
        operations: {
          CurrentUserForLayout: {
            currentUser: null
          }
        }
      };
    cy.reload();
    cy.get('[data-e2e="submit_btn"]').should('not.exist');
  });

  it('Should show submit button when logged in', () => {
    cy.mockGraphqlOps <
      Mocks_AllOperations >
      {
        operations: {
          CurrentUserForLayout: {
            currentUser: null
          }
        }
      };
    cy.visit('/');
    cy.get('[data-e2e="submit_btn"]').should('not.exist');
  });

  it('Renders an empty state', () => {
    cy.mockGraphqlOps <
      Mocks_AllOperations >
      {
        operations: {
          Feed: {
            feed: []
          }
        }
      };
    cy.visit('/');
    // Broken because of SSR. Need to dig in more.
    // cy.get('[data-e2e="empty_state"]').should('be.visible');
    cy.get('[data-e2e="feed"]').should('be.visible');
  });
});
```

###### - **[cypress-plugin-tab](https://github.com/Bkucera/cypress-plugin-tab)**

- [cy-api](https://github.com/bahmutov/cy-api)
  > View Request and Response Logs - Commands HTTP API testing with server logs
  - [Example - Add Server logs to web-page](https://github.com/bahmutov/server-logs-example#server-logs)
- [cy-spok](https://github.com/bahmutov/cy-spok)

  - [Example - Object assertions](https://github.com/bahmutov/cy-spok/blob/master/cypress/integration/spec.js#L5)

```js
  const object = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    helloWorld: 'hello world',
    anyNum: 999,
    anotherNum: 888,
    anArray: [1, 2],
    anotherArray: [1, 2, 3],
    anObject: {},
  }

  // using Spok
  // https://github.com/thlorenz/spok#readme
  cy.wrap(object, { timeout: 2000 }).should(
    spok({
      $topic: 'spok-example',
      one: spok.ge(1),
      two: 2,
      three: spok.range(2, 6),
      four: spok.lt(5),
      helloWorld: spok.startsWith('hello'),
      anyNum: spok.type('number'),
      anotherNum: spok.number,
      anArray: spok.array,
      anObject: spok.ne(undefined),
    }),
  )
})
```

#### Preprocessors

###### - **[cypress-cucumber-preprocessor](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor)**

> Run cucumber/gherkin-syntaxed specs with cypress.io

###### - **[cypress-webpack-preprocessor](https://github.com/cypress-io/cypress-webpack-preprocessor)**

- [Development Tools](https://docs.cypress.io/plugins/index.html#development-tools)
- [Extending Other Testing Frameworks](https://docs.cypress.io/plugins/index.html#extending-other-testing-frameworks)
- [Framework tooling](https://docs.cypress.io/plugins/index.html#framework-tooling)
- [Build Preprocessors)](https://docs.cypress.io/plugins/index.html#preprocessors)
- [Reporting](https://docs.cypress.io/plugins/index.html#reporting)
- [Visual Testing](https://docs.cypress.io/plugins/index.html#visual-testing)

###### Interesting Plugins

- [Cucumber](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor)
- [Retries](https://github.com/Bkucera/cypress-plugin-retries)
- [Select inputs](https://github.com/bahmutov/cypress-select-tests)
- [Cypress Commands](https://github.com/Lakitna/cypress-commands)
- [Cypress Capybara](https://github.com/testdouble/cypress-capybara)
- [Mock GraphQL](https://github.com/tgriesser/cypress-graphql-mock)
- [Jest Adapter](https://github.com/phongnd39/cypress-jest-adapter)
- [Cypress Pipe](https://github.com/NicholasBoll/cypress-pipe)
- [Snapshot Testing](https://github.com/meinaart/cypress-plugin-snapshots)
- [Tab](https://github.com/Bkucera/cypress-plugin-tab)
- [Cypress Testing Library](https://github.com/kentcdodds/cypress-testing-library)
- [Auto mock](https://github.com/scottschafer/cypressautomocker)
- [Test individual components standalone](https://github.com/bahmutov/cypress-cycle-unit-test)
- [Unit test react components](https://github.com/bahmutov/cypress-react-unit-test)

## Useful Commands

###### Fire Events

```
cy.get('input#some-id').invoke('changeShowCount', { target: { value: 50 } })
```

## Recipes

###### [Modern frontend testing with Cypress](https://www.cypress.io/blog/2019/02/05/modern-frontend-testing-with-cypress/)

- Add fixtures
- Stub network calls
-

###### [Observing Emitted Events in Tests](https://www.cypress.io/blog/2019/03/20/using-events-emitted-from-your-application-during-end-to-end-tests/)

> Spying on events

```js
/// <reference types="Cypress" />
describe('Spying on Kuker messages', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        // start spying
        cy.spy(win, 'postMessage');
      }
    });
  });

  it('adds 2 todos', function() {
    cy.get('.new-todo')
      .type('learn testing{enter}')
      .type('be cool{enter}');
    cy.get('.todo-list li').should('have.length', 2);
  });
});
```

> Custom dom events

```js
const actions = {
  down: (e) => (state) => {
    const newState = {
      ...state,
      count: state.count - 1
    };
    // emit the "down" event
    kuker({
      type: 'count',
      label: 'down',
      state: newState,
      icon: 'fa-arrow-down',
      color: '#ff0000'
    });
    return newState;
  },
  up: (e) => (state) => {
    const newState = {
      ...state,
      count: state.count + 1
    };
    // emit the "up" event
    kuker({
      type: 'count',
      label: 'up',
      state: newState,
      icon: 'fa-arrow-up',
      color: '#00ff00'
    });
    return newState;
  }
};
```

###### [Custom JSDom events](https://www.cypress.io/blog/2019/02/28/shrink-the-untestable-code-with-app-actions-and-effects/)

## Cypress Video Tutorials

### [How to test a React App](https://docs.cypress.io/examples/examples/tutorials.html#Test-a-React-Todo-App)

- [Loading data with fixtures](https://docs.cypress.io/examples/examples/tutorials.html#4-Loading-data-with-fixtures)

### [Recipes (with code examples)](https://docs.cypress.io/examples/examples/recipes.html#Fundamentals)

- [Stop using page actions](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/)

> Application actions are a replacement for Page Objects

### Custom Commands

#### Login (Cypress Command Version)

> cypress/support/commands.js

```js
// in cypress/support/commands.js
Cypress.Commands.add('login', (username, password) => {
  cy.get('#login-username').type(username);
  cy.get('#login-password').type(password);
  cy.get('#login').submit();
});
```

###### Usage

```js
it('logs in', () => {
  cy.visit('/login');
  cy.login('username', 'password');
});
```

#### Login (Javascript Version)

> cypress/integration/util.js

```js
export const login = (username, password) => {
  cy.get('#login-username').type(username);
  cy.get('#login-password').type(password);
  cy.get('#login').submit();
};
```

###### Usage

```js
import { login } from './util';

it('logs in', () => {
  cy.visit('/login');
  login('username', 'password');
});
```

### Page Objects

```js
class SignInPage {
  visit() {
    cy.visit('/signin');
  }

  getEmailError() {
    return cy.get(`[data-testid=SignInEmailError]`);
  }

  getPasswordError() {
    return cy.get(`[data-testid=SignInPasswordError]`);
  }

  fillEmail(value) {
    const field = cy.get(`[data-testid=SignInEmailField]`);
    field.clear();
    field.type(value);

    return this;
  }

  fillPassword(value) {
    const field = cy.get(`[data-testid=SignInPasswordField]`);
    field.clear();
    field.type(value);

    return this;
  }

  submit() {
    const button = cy.get(`[data-testid=SignInSubmitButton]`);
    button.click();
  }
}

export default SignInPage;
```

###### Implementation Details

- Invoke methods on the application's model object
- Avoid code duplication and need to create page object hierarchy
- Run e2e very quickly by skipping UI unless testing that specific UI feature

- [How to get around lack of multiple tabs in Cypress](https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/testing-dom__tab-handling-links/cypress/integration/tab_handling_anchor_links_spec.js)
