import { sendGAEvent } from '@next/third-parties/google'

export type ContactChannel = 'line' | 'phone' | 'email' | 'facebook'

export type ContactSource =
  | 'floating'
  | 'contact_section'
  | 'contact_popup'
  | 'footer'
  | 'cta_section'
  | 'service_detail'

export const trackContactClick = (channel: ContactChannel, source: ContactSource) => {
  sendGAEvent('event', 'contact_click', {
    channel,
    source,
  })
}

export const trackServiceCardClick = (slug: string, source: 'key_services' | 'extra_services' | 'services_list') => {
  sendGAEvent('event', 'service_card_click', {
    service_slug: slug,
    source,
  })
}

export const trackCTAClick = (label: string, source: ContactSource) => {
  sendGAEvent('event', 'cta_click', {
    label,
    source,
  })
}

export const trackContactPopupOpen = (source: string) => {
  sendGAEvent('event', 'contact_popup_open', { source })
}

export const trackContactFormSubmit = (params: { service?: string; status: 'success' | 'error' }) => {
  sendGAEvent('event', 'contact_form_submit', params)
}

export const trackScrollDepth = (percent: 25 | 50 | 75 | 90) => {
  sendGAEvent('event', 'scroll_depth', { percent })
}
