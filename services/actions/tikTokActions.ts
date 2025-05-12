'use server';

import { TIKTOK_EVENTS } from '@/helpers/constants';
import { MetaActionProps } from './withMetaDataAction';
import { headers } from 'next/headers';
import { getCurrentUrl } from './getServerUrl';
function hash(input: string): string {
  return require('crypto').createHash('sha256').update(input).digest('hex');
}


// Standard TikTok Events


type TikTokEventProps<T> = MetaActionProps<T> & {
  event_name: string;
  page_url?: string;
  event_source?: string;
};

export async function sendTikTokEvent<T>({ 
  user_data, 
  custom_data, 
  event_name, 
  page_url,
  event_source = 'web'
}: TikTokEventProps<T>): Promise<any> {
  const userAgent = headers().get('user-agent') || '';
  const ip = headers().get('x-forwarded-for') || '';


  if (!Object.values(TIKTOK_EVENTS).includes(event_name)) {
    throw new Error('Invalid event name. Must be one of the standard TikTok events.');
  }

  const pixelId = process.env.TIKTOK_PIXEL_ID || 'D07OAKBC77UFFMMCNQE0';
  const accessToken = process.env.TIKTOK_ACCESS_TOKEN || '2d08f3d32d31eb0a256c6d2e197b6b982f61e60d';

  const hashedUserData: Record<string, string> = {
    ip: ip,
    user_agent: user_data?.userAgent || userAgent
  };

  if (user_data?.email) {
    hashedUserData.email = hash(user_data.email);
  }
  
  if (user_data?.phoneNumber) {
    hashedUserData.phone_number = hash(user_data.phoneNumber);
  }
  
  if (user_data?.id) {
    hashedUserData.external_id = hash(user_data.id);
  }

  // Filter out empty values
  Object.keys(hashedUserData).forEach(key => 
    !hashedUserData[key] && delete hashedUserData[key]
  );

  const timestamp = Math.floor(Date.now() / 1000);
  
  const payload = {
    pixel_code: pixelId,
    event: event_name,
    timestamp: timestamp,
    context: {
      user: hashedUserData,
      page: {
        url: page_url || null,
      }
    },
    properties: custom_data,
    source: event_source
  };

  try {
    const response = await fetch(
      `https://business-api.tiktok.com/open_api/v1.3/pixel/track/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Token': accessToken
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error(`Error sending TikTok ${event_name} event:`, errorResponse);
      throw new Error('Failed to send TikTok event');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error sending TikTok ${event_name} event:`, error.message);
    throw new Error('Failed to send TikTok event');
  }
}

// Specific event action functions
export async function tikTokViewContentAction<T>({ user_data, custom_data, page_url }: MetaActionProps<T> & { page_url?: string }): Promise<any> {
  return sendTikTokEvent({
    user_data,
    custom_data,
    event_name: TIKTOK_EVENTS.VIEW_CONTENT,
    page_url
  });
}

export async function tikTokSearchAction<T>({ user_data, custom_data, page_url }: MetaActionProps<T> & { page_url?: string }): Promise<any> {
  return sendTikTokEvent({
    user_data,
    custom_data,
    event_name: TIKTOK_EVENTS.SEARCH,
    page_url
  });
}

export async function tikTokAddToCartAction<T>({ user_data, custom_data, page_url }: MetaActionProps<T> & { page_url?: string }): Promise<any> {
  return sendTikTokEvent({
    user_data,
    custom_data,
    event_name: TIKTOK_EVENTS.ADD_TO_CART,
    page_url
  });
}

export async function tikTokAddToWishlistAction<T>({ user_data, custom_data, page_url }: MetaActionProps<T> & { page_url?: string }): Promise<any> {
  return sendTikTokEvent({
    user_data,
    custom_data,
    event_name: TIKTOK_EVENTS.ADD_TO_WISHLIST,
    page_url
  });
}

export async function tikTokInitiateCheckoutAction<T>({ user_data, custom_data, page_url }: MetaActionProps<T> & { page_url?: string }): Promise<any> {
  return sendTikTokEvent({
    user_data,
    custom_data,
    event_name: TIKTOK_EVENTS.INITIATE_CHECKOUT,
    page_url
  });
}

export async function tikTokPurchaseAction<T>({ user_data, custom_data, page_url }: MetaActionProps<T> & { page_url?: string }): Promise<any> {
  return sendTikTokEvent({
    user_data,
    custom_data,
    event_name: TIKTOK_EVENTS.PURCHASE,
    page_url
  });
}

export async function tikTokSubscribeAction<T>({ user_data, custom_data, page_url }: MetaActionProps<T> & { page_url?: string }): Promise<any> {
  return sendTikTokEvent({
    user_data,
    custom_data,
    event_name: TIKTOK_EVENTS.SUBSCRIBE,
    page_url
  });
}

export async function tikTokContactAction<T>({ user_data, custom_data, page_url }: MetaActionProps<T> & { page_url?: string }): Promise<any> {
  return sendTikTokEvent({
    user_data,
    custom_data,
    event_name: TIKTOK_EVENTS.CONTACT,
    page_url
  });
}

export async function tikTokCompleteRegistrationAction<T>({ user_data, custom_data, page_url }: MetaActionProps<T> & { page_url?: string }): Promise<any> {
  return sendTikTokEvent({
    user_data,
    custom_data,
    event_name: TIKTOK_EVENTS.COMPLETE_REGISTRATION,
    page_url
  });
}

export async function tikTokSubmitFormAction<T>({ user_data, custom_data, page_url }: MetaActionProps<T> & { page_url?: string }): Promise<any> {
  return sendTikTokEvent({
    user_data,
    custom_data,
    event_name: TIKTOK_EVENTS.SUBMIT_FORM,
    page_url
  });
}

export async function tikTokPageViewAction<T>({ user_data, custom_data }: MetaActionProps<T>): Promise<any> {
  const pageUrl = await getCurrentUrl();

  return sendTikTokEvent({
    user_data,
    custom_data,
    event_name: TIKTOK_EVENTS.PAGE_VIEW,
    page_url:pageUrl
  });
} 