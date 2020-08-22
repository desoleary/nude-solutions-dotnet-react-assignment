# Nude Solutions .NET React Assignment (Renter Contents Editor)

## Development

#### Install .NET (OSX)

Download latest [here](https://docs.microsoft.com/en-us/dotnet/core/install/macos)

#### Run app on localhost

```bash
$ ASPNETCORE_URLS="https://localhost:5001" ASPNETCORE_ENVIRONMENT="Development" dotnet $HOME/code/nude-solutions-dotnet-react-assignment/bin/Debug/netcoreapp3.1/nude-solutions-dotnet-react-assignment.dll
```

#### Seed Data
- If you are running inside the Development environment on restart of the server seed data will refresh via:
`$ yarn run increment-server-restart-version` which is called with `start` and `storybook` package.json scripts

#### Storybook

`$ yarn run storybook`

#### Cypress

`$ yarn run cypress`

<img width="1440" alt="Screen Shot 2020-08-21 at 7 56 15 PM" src="https://user-images.githubusercontent.com/2164481/90946307-c4174a80-e3e8-11ea-8895-723b08b88791.png">
