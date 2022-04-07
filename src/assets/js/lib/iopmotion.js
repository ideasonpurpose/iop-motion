const config = require('./iopmotion_config.js');
const defaults = config.defaults;
const targets = config.targets;
const prefersRM = window.matchMedia("(prefers-reduced-motion: reduce)");

/**
 * Set up Observers
 */

// Activate element animation
function animateElement(t, observer) {
  t.classList.add(defaults.effectPrefix + defaults.activeClass);
  observer.unobserve(t);
}

let observerCallback = (entries, observer) => {
  // Resets each time a new group of sequenced entries enters the viewport
  let previousSequence = {};
  let previousDelay = 250;

  entries.forEach(entry => {
    let t = entry.target;
    let seqGroup = t.getAttribute('data-motion-seqgroup');
    let seqDelay = t.getAttribute('data-motion-seqdelay');

    if (entry.isIntersecting) {
      /**
       * Process sequencing
       * 
       * 1) A sequence only applies to visible elements, in batches, as they enter the viewport.
       * 2) Elements are grouped by individual sequence groups,
       * preventing multiple concurrent sequences from overlapping eachothers parameters
       */
      if (seqGroup) {
        let previousSequenceEntry = previousSequence[seqGroup];

        // Increase the delay for the current item, based on last item's delay
        if (previousSequenceEntry) {
          previousDelay = getComputedStyle(previousSequenceEntry).getPropertyValue('--delay');
          t.style.setProperty('--delay', (Number(previousDelay) + Number(seqDelay)));
        }

        previousSequence[seqGroup] = t;
      }

      animateElement(t, observer);
    }

    /**
     * (!) Edge case
     * If a user entered the page already scrolled down (i.e. from an anchor link)
     * then cancel animations on all elements that are outside the viewport upwards.
     * We do this because animations just don't look great when scrolling up.
     * 
     * (+) Consider implementing reversed animations logic.
     */
    else if (entry.boundingClientRect.top < 0 && !entry.isIntersecting) {
      t.style.setProperty('--delay', 0);
      t.style.setProperty('--duration', 0);
      animateElement(t, observer);
    }
  });
};

let observer = new IntersectionObserver(observerCallback, {});


/**
 * Apply setting to all @targets
 * and send them to @observer
 */

let groupedSelectors = {};

targets.forEach(t => {
  // Skip animations if user prefers-reduced-motion
  if (!prefersRM || prefersRM.matches) return false;

  let sel = t.sel;
  let els = document.querySelectorAll(sel);

  if (!els.length) return false;

  let tSequence = t.sequence;

  els.forEach(elm => {
    let effect = elm.getAttribute('data-motion-effect') || t.effect || defaults.effect;
    let distance = elm.getAttribute('data-motion-distance') || t.distance || defaults.distance;
    let duration = elm.getAttribute('data-motion-duration') || t.duration || defaults.duration;
    let delay = elm.getAttribute('data-motion-delay') || t.delay || defaults.delay;
    let seqDelay = elm.getAttribute('data-motion-seqdelay') || t.sequenceDelay || defaults.sequenceDelay;

    elm.style.setProperty('--distance', distance);
    elm.style.setProperty('--duration', duration);
    elm.style.setProperty('--delay', delay);

    if (tSequence) {
      elm.setAttribute('data-motion-seqgroup', tSequence);
      elm.setAttribute('data-motion-seqdelay', seqDelay);
    };

    elm.classList.add(defaults.effectPrefix + effect);
  });

  if (tSequence) {
    if (groupedSelectors[tSequence]) groupedSelectors[tSequence].push(sel);
    else groupedSelectors[tSequence] = [sel];
  }
  else {
    if (groupedSelectors['nosequence']) groupedSelectors['nosequence'].push(sel);
    else groupedSelectors['nosequence'] = [sel];
  }
});


/**
 * Loop through grouped targets belonging to the same sequence.
 * 
 * This enables multiple targets with independent configurations
 * to belong to the same main sequence.
 * (by applying the same sequence id in the target config)
 * 
 * E.g. sequence: 'footerAnimations'
 */


for (var i in groupedSelectors) {
  let selector = groupedSelectors[i].join(',');
  let els = document.querySelectorAll(selector);

  els.forEach(elm => {
    observer.observe(elm);
  });
}

document.documentElement.classList.remove('loading');
