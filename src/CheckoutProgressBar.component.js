 import { PureComponent } from 'react';
 import React from 'react';
 
 import './CheckoutProgressBar.style';
 
 export class CheckoutProgressBar extends PureComponent {
    createDot(title, number) {
      const pin = React.createElement('div', { class: 'dot-progress-pin progress-bar-element' });
      const pinNumber =  React.createElement('div', { class: 'dot-progress-pin-number progress-bar-element' }, number);
      const pinTitle = React.createElement('span', { class: 'dot-progress-pin-title progress-bar-element' }, title);
      const dot = React.createElement('div', { class: 'dot-progress-checkout progress-bar-element' }, [pin, pinNumber, pinTitle])

      return dot;
    }

    createBar() {
      const bar = React.createElement('div', { class: 'bar-progress-checkout progress-bar-element' });
      return bar
    }


    createProgressBarElements() {
      const { stepsNumber, steps } = this.props;
      // if the number of steps is less than 3, progressbar is not useful
      if ( stepsNumber < 3 ) return null;

      let totalSteps = stepsNumber + (stepsNumber - 1);

      const stepsArr = [];
      let innerCounter = 0;

       // populating stepsArr
      for (let i = 1; i <= totalSteps; i += 1) {
        if (stepsArr.length % 2 === 0) {
          stepsArr.push(this.createBar())
        } else {
          stepsArr.push(this.createDot(steps[innerCounter], innerCounter + 1))
          innerCounter += 1;
        }
      }

      return stepsArr;
    }

    renderProgressBar() {
      const elementsArr = this.createProgressBarElements();
      return React.createElement('div', { class: 'progress-bar-wrapper' }, elementsArr)
    }

    componentDidUpdate() {
      const { steps } = this.props;
      const transformedSteps = steps.map(step => step.toLowerCase());
      const path = window.location.pathname.split('checkout/')[1];
      const progressBarElements = Array.from(document.querySelectorAll('.progress-bar-element'));

      const progressLimiter = () => {
        const limiter = transformedSteps.indexOf(path) + 5;

        for (let i = 0; i >= (limiter - 1); i += 1) {
          progressBarElements[i].classList.add('filled')
        }
      }

      progressLimiter();
    }
 
     render() {
         return (
          this.renderProgressBar()
         );
     }
 }
 
 export default CheckoutProgressBar;
