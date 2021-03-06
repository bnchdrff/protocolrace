# Protocol Race

A game for the September 29 2012 DiscoTech at Kemeny Rec Center

Two players compete to have the most HTTPS requests (vs HTTP).

![Scoreboard (photo credit Nina Bianchi)](https://user-images.githubusercontent.com/99194/31977823-a0202f70-b90c-11e7-977b-b74dc3e7504d.jpg)

![Players (photo credit Nina Bianchi)](https://user-images.githubusercontent.com/99194/31977824-a030a918-b90c-11e7-9621-f6c202023eb3.jpg)

## Network setup

One computer serves as an internet gateway, and two computers run WWW browsers.

This program runs on the gateway.

## Installation

    git clone https://github.com/bnchdrff/protocolrace
    cd protocolrace
    npm install
    sudo node server.js
    # sudo is required because of pcap

## License - "MIT License"

Copyright (c) 2012 Benjamin Chodoroff

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
