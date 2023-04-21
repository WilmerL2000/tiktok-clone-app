import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '9g3wha00',
  dataset: 'production',
  apiVersion: '2023-04-21',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
