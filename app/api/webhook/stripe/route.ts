import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Extract details from session
      const customerId = session.customer as string;
      const customerEmail = session.customer_details?.email || '';
      const customerName = session.customer_details?.name || 'Unknown Member';
      const planTier = session.metadata?.planTier || 'Unknown Plan';

      // Insert into Supabase members table
      const { error } = await supabase
        .from('members')
        .insert({
          email: customerEmail,
          name: customerName,
          plan_tier: planTier,
          stripe_customer_id: customerId,
          subscription_status: 'Active',
        });

      if (error) {
        console.error('Supabase insert error in Webhook:', error);
      } else {
        console.log('✅ Successfully inserted member into Supabase from Webhook');
      }

      if (error) {
        console.error('Error inserting member to Supabase:', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
      }

      console.log(`Successfully created active membership for ${customerEmail}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Unhandled webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
