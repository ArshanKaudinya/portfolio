import { z } from 'zod';

export const contactSchema = z.object({
  name:    z.string().min(1).max(80),
  email:   z.string().email().max(120),
  message: z.string().min(10).max(2_000),
  website: z.string().max(0),        // honeypot
  ts:      z.coerce.number(),        // ms since epoch (hidden field)
});

export type ContactPayload = z.infer<typeof contactSchema>;
