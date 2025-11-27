# KrakenFlex Outage Processing Task

## Description

This project implements the Kraken Flex interview task.
The application retrieves outage data and site information from the Kraken Flex API, filters and processes the data
according to the task specification (detailed below), and then posts the processed outages back onto the API.
The solution includes unit test coverage of the pure functions, retries on backend 500 errors, and a clear modular
architecture.

## Installation

### 1. Clone the repository
```bash
git clone <GIT REPO URL>
cd <repo>
```
### 2. Install dependencies
```bash
npm install
```
### 3. Environment variables
Create a .env file
```bash
API_KEY=<API-KEY>
BASE_URL=https://api.krakenflex.systems/interview-tests-mock-api/v1
SITE_ID=norwich-pear-tree
OUTAGE_DATE=2022-01-01T00:00:00.000Z
```

## Usage
The following command will run the program:
```bash
npm start
```
And produce an output similar to this:
```bash
Sending 10 processed outages
Successfully sent processed outages to the Kraken endpoint
```

## Tech Specification

Let's assume we want to do this for the site `kingfisher`.

Given `GET /outages` returns:

```json
[
  {
    "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
    "begin": "2021-07-26T17:09:31.036Z",
    "end": "2021-08-29T00:37:42.253Z"
  },
  {
    "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
    "begin": "2022-05-23T12:21:27.377Z",
    "end": "2022-11-13T02:16:38.905Z"
  },
  {
    "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
    "begin": "2022-12-04T09:59:33.628Z",
    "end": "2022-12-12T22:35:13.815Z"
  },
  {
    "id": "04ccad00-eb8d-4045-8994-b569cb4b64c1",
    "begin": "2022-07-12T16:31:47.254Z",
    "end": "2022-10-13T04:05:10.044Z"
  },
  {
    "id": "086b0d53-b311-4441-aaf3-935646f03d4d",
    "begin": "2022-07-12T16:31:47.254Z",
    "end": "2022-10-13T04:05:10.044Z"
  },
  {
    "id": "27820d4a-1bc4-4fc1-a5f0-bcb3627e94a1",
    "begin": "2021-07-12T16:31:47.254Z",
    "end": "2022-10-13T04:05:10.044Z"
  }
]
```

Given `GET /site-info/kingfisher` returns:

```json
{
  "id": "kingfisher",
  "name": "KingFisher",
  "devices": [
    {
      "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
      "name": "Battery 1"
    },
    {
      "id": "086b0d53-b311-4441-aaf3-935646f03d4d",
      "name": "Battery 2"
    }
  ]
}
```

We should send the following to `POST /site-outages/kingfisher`:

```json
[
  {
    "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
    "name": "Battery 1",
    "begin": "2022-05-23T12:21:27.377Z",
    "end": "2022-11-13T02:16:38.905Z"
  },
  {
    "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
    "name": "Battery 1",
    "begin": "2022-12-04T09:59:33.628Z",
    "end": "2022-12-12T22:35:13.815Z"
  },
  {
    "id": "086b0d53-b311-4441-aaf3-935646f03d4d",
    "name": "Battery 2",
    "begin": "2022-07-12T16:31:47.254Z",
    "end": "2022-10-13T04:05:10.044Z"
  }
]
```

## AI Usage Disclosure

I used ChatGPT for the following uses:

1. As a PR reviewer
2. Assistance with the retry function

## If I Had More Time

1. Mocked Axios tests: To validate full request/response pipeline
2. A runner class instead of running the entire functionality in index.ts: So that index.ts becomes a thinner entrypoint
and the orchestration logic can be properly unit tested.
3. More configurable retry functionality: Retry count, backoff strategy, retryable status codes, set via environment variables
4. Date validation and more integral error handling/logging: To handle unexpected or malformed API data