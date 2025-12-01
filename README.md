# Serverside mini Piano

This project is a server-side simple piano keyboard, such that clients are presented with a basic piano interface
and when they play a note, it will play from the device hosting the webserver, not the client.

This is for an upcoming Raspberry Pi demo workshop run by CQU Initiation and Innovation.

## Disclosure
**This project was developed with a lot of AI**, so if you take ethical issue with this, you've been warned.

That being said, our intention was to learn alongside AI rather than purely vibe-code this, and in that aspect, us
developers still debugged this code ourselves and made our own tweaks to it independent of an LLM.

## Limitations
This only plays pre-recorded wave files of piano tones, and does not generate them on the fly.

This came down to limitations in current NodeJS libraries that usually expect sound to play from the web client
and not the server, and time constraints with this project.

## Setup

Requirements: NodeJS, and any sound output device

NPM packages: `npm install express node-wav-player`

Then just run `node server.js` and it should be made available on [localhost:3000](http://localhost:3000)