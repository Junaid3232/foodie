import stripe from 'tipsi-stripe'
import {Stripe_Published_Key} from '../../utilts/Config'
export const StripePayment= ()=>  {
   let init= stripe.setOptions({
        publishableKey: Stripe_Published_Key
      })
      console.log("INIT",init)
      return init
  }