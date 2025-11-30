# WebSocket Project

This project is an evolution of [rpi-proto2](https://github.com/Just-A-Regular-Nerd/rpi-proto2) such that it is still a WebSocket server and client, but implemented in NodeJS instead of Python.

The project goal is to make a **web-based MIDI piano**, but the sound plays on the server (host) instead of the client.

## Disclosure
**This project was developed with a lot of AI**, so if you take ethical issue with this, you've been warned.

That being said, my intention is to learn alongside AI rather than purely vibe-code this. This is the primary reason for
project resetting and rebasing on Node.

## Setup

Target(s): Raspberry Pi OS (64-bit), Debian 13

Install these system dependencies: `sudo apt install -y libasound2-dev libjack-dev fluid-soundfont-gm fluidsynth`

Install these npm libraries: `npm install midi node-speaker fluidsynth`

## Running

Clone the repository, then open a terminal within the repo directory and run:

`node server.js`

You should be able to then navigate to http://localhost:3000