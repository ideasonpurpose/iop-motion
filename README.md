# IOP Motion

Common animation library used at [Ideas On Purpose](https://www.ideasonpurpose.com/).
Read the [IOP Motion animation library guide](https://ideasonpurpose.github.io/iop-motion/dist/) for installation and examples.


## Getting Started
- `git clone https://github.com/ideasonpurpose/iop-motion.git .` - downloads a copy of this repository into the current terminal location. 
- `npm install` - install project dependencies, then
- `npm run start` - start the development environment at [//localhost:8080](http://localhost:8080)
- `npm run build` - build the site for production delivery.

Edit the `src` directory.

Once finished, run `npm run build` and push changes.

## Quirks
If animations don't happen on page load properly (e.g. items are visible when they should be faded out), it's most likely a CSS `transition` is overriding the library transitions. Fix it by wrapping the element in a new container and apply the motion effects on it instead.
