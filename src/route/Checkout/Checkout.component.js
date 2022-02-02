import { Checkout as SourceCheckout } from 'SourceRoute/Checkout/Checkout.component';
import ContentWrapper from 'Component/ContentWrapper';
import CheckoutProgressBar from 'src/CheckoutProgressBar.component';


export class CheckoutRoute extends SourceCheckout {
  render() {
    const steps = Object.entries(this.stepMap);
    steps.pop()
    const filteredSteps = steps.map((step) => {
      const name = step[0].split('_')[0]
      const firstLetter = name[0].toUpperCase();
      const nameComplement = name.slice(1).toLowerCase();

      return firstLetter + nameComplement;
    })
    return (
        <main block="Checkout">
            <ContentWrapper
              wrapperMix={ { block: 'Checkout', elem: 'Wrapper' } }
              label={ __('Checkout page') }
            >
                <CheckoutProgressBar 
                  steps={ filteredSteps }
                  stepsNumber={ Object.entries(this.stepMap).length } 
                />
                { this.renderSummary(true) }
                <div block="Checkout" elem="Step">
                    { this.renderTitle() }
                    { this.renderGuestForm() }
                    { this.renderStep() }
                    { this.renderLoader() }
                </div>
                <div>
                    { this.renderSummary() }
                    { this.renderPromo() }
                    { this.renderCoupon() }
                </div>
            </ContentWrapper>
        </main>
    );
}
}

export default CheckoutRoute;