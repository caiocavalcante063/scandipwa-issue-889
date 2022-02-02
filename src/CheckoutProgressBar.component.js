 import { PureComponent } from 'react';
 import React from 'react';
 
 import './CheckoutProgressBar.style';
 
 export class CheckoutProgressBar extends PureComponent {
    constructor() {
      super();

      this.state = {
        progressBar: null,
        path: null,
      }
    }

    createDot(title, number, customClass) {
      const pin = React.createElement('div', { class: `dot-progress-pin${customClass ? `-${customClass}` : ''}` });
      const pinNumber =  React.createElement('div', { class: `dot-progress-pin-number${customClass ? `-${customClass}` : ''}` }, number);
      const pinTitle = React.createElement('span', { class: `dot-progress-pin-title${customClass ? `-${customClass}` : ''}` }, title);
      const dot = React.createElement('div', { class: `dot-progress-checkout${customClass ? `-${customClass}` : ''}` }, [pin, pinNumber, pinTitle])

      return dot;
    }

    createBar(customClass) {
      const bar = React.createElement('div', { class: `bar-progress-checkout${customClass ? `-${customClass}` : ''}` });
      return bar
    }


    createProgressBarElements(customClass, progressLimiter) {
      const { stepsNumber, steps } = this.props;
      // if the number of steps is less than 3, progressbar is not useful
      if ( stepsNumber < 3 ) return null;

      const stepsArr = [];
      let totalSteps = stepsNumber + (stepsNumber - 1);
      let innerCounter = 0;

       // populating stepsArr
      for (let i = 1; i <= totalSteps; i += 1) {
        if (stepsArr.length % 2 === 0) {
          stepsArr.push(
            i <= progressLimiter ?  this.createBar(customClass) : this.createBar()
            )
        } else {
          stepsArr.push(
            i <= progressLimiter ? this.createDot(steps[innerCounter], (innerCounter + 1), customClass)
            : this.createDot(steps[innerCounter], (innerCounter + 1))
            )
          innerCounter += 1;
        }
      }

      return stepsArr;
    }

    renderProgressBar(customClass, progressLimiter) {
      const elementsArr = this.createProgressBarElements(customClass, progressLimiter);
      const progressBar = React.createElement('div', { class: 'progress-bar-wrapper' }, elementsArr)
      this.setState({ progressBar })
    }

    componentDidMount() {
      this.renderProgressBar();
    }

    componentDidUpdate() {
      const { steps } = this.props;
      const { path } = this.state;
      const transformedSteps = steps.map(step => step.toLowerCase());
      const pathName = window.location.pathname.split('checkout/')[1];

      if (path !== pathName) {
        this.setState({ path: pathName })
        const pathNameIndex = transformedSteps.indexOf(pathName) === -1 ?
          (transformedSteps.length * 2) + 1
          : transformedSteps.indexOf(pathName) + 1;
        const progressLimiter = pathNameIndex * 2;
        this.renderProgressBar('filled', progressLimiter);
      }
    }
 
     render() {
       const { progressBar } = this.state;
         return (
         progressBar
         );
     }
 }
 
 export default CheckoutProgressBar;
