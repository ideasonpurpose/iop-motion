/**
 * Config options:

   sel: '.my-class', // CSS target selector
   effect: 'fade-up', // Animation effect
   distance: 40, // How many pixels the element moves while animating in px
   duration: 1000, // Animation duration in ms
   delay: 0, // Adds a delay before the animation happens

   sequence: 'mySequence', // Group elements to animate in a sequence 
   sequenceDelay: 250 // Amount of increasing delay between sequence items (excludes first item, which uses delay instead)

 * Available effects (sass/lib/_iopmotion.scss):
   Fade: fade-up, fade-down, fade-left, fade-right
   Slide: slide-up, slide-down, slide-left, slide-right
 */

const moveTargets = [
  {
    sel: '.exampleSequence > div',
    sequence: 'exampleSequence',
    sequenceDelay: 500
  },

  {
    sel: 'h1, pre',
    effect: 'fade-in',
    sequence: 'content',
    delay: 500
  },

  {
    sel: 'h2, h3, li',
    effect: 'fade-right',
    sequence: 'content',
    sequenceDelay: 1000
  },

  {
    sel: '.wrapper > p',
    effect: 'fade-up',
    sequence: 'content'
  },
];

module.exports = moveTargets;
