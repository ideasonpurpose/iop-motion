/**
 * Config options:

   sel: '.my-class', // CSS target selector
   effect: 'move:fade-up', // Animation effect
   distance: 40, // How many pixels the element moves while animating in px
   duration: 1000, // Animation duration in ms
   delay: 0, // Adds a delay before the animation happens

   sequence: 'mySequence', // Group elements to animate in a sequence 
   sequenceDelay: 250 // Amount of increasing delay between sequence items (excludes first item, which uses delay instead)

 * Available effects (sass/iopmotion.scss):
   Fade: fade-up, fade-down, fade-left, fade-right
   Slide: slide-up, slide-down, slide-left, slide-right
 */

const moveTargets = [
  {
    sel: '.header li',
    effect: 'slide-left',
    sequence: 'header lists'
  },

  {
    sel: 'img',
    sequence: '1',
    delay: 250
  },

  {
    sequence: '2',
    sel: '.sequence p',
    effect: 'fade-up',
    delay: 100
  },
  {
    sequence: '2',
    sel: 'li',
    effect: 'fade-right',
    delay: 100
  },
  {
    sequence: '2',
    sel: '.nosequence p, .nosequence div',
    duration: 1000,
    distance: 20,
    effect: 'fade-down',
  }
];

module.exports = moveTargets;
