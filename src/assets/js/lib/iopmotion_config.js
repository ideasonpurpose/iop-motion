const userTargets = require('../animations.js');

/**
 * Set Default Settings
 * 
 * Effects:
 * fade-up, fade-down, fade-left, fade-right
 * slide-up, slide-down, slide-left, slide-right
*/

const defaults = {
  effectPrefix: 'move:',
  activeClass: 'inview',
  effect: 'fade-up',

  distance: 40, // px
  duration: 1000, // ms
  delay: 0, // ms

  sequence: false,
  sequenceDelay: 250 // increasing delay between sequence items (excludes first item, which uses delay instead+)
}

/**
 * Set Default Selectors
 * 
 * Usage
 * <div class=".move:${effect}" />
 * 
 * Effects:
 * fade-up, fade-down, fade-left, fade-right
 * slide-up, slide-down, slide-left, slide-right
*/

const builtInTargets = [
  {
    sel: '[data-motion-effect]'
  }
]

module.exports = {
  defaults: defaults,
  targets: builtInTargets.concat(userTargets)
}
