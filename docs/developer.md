# Developer documentation

## Overview

The package is written in ReactJS and Chakra UI, and built with Vite.

It relies on a back-end server, the [Hanzi API
Server](https://github.com/osteele/hanzi-api-server), for character
decomposition data.

## Local Development

To run locally, an instance of the Hanzi API Server must be attached to port 3100.
`yarn dev` in the [Hanzi API
Server](https://github.com/osteele/hanzi-api-server) starts the server on that
port.

Start the dev server with `yarn dev`, and visit <http://localhost:3000>.

## Configuration

Define these in `.env` for local development:

`API_SERVER` – the URL of the API server. Defaults to `http://localhost:3100`.

`DEBUG` — if truthy, a minimal amount of debug information is logged to the JavaScript developer console.
