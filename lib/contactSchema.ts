import { z } from 'zod';

export const contactSchema = z.object({
  name:    z.string().min(1).max(80),
  email:   z.string().email().max(120).toLowerCase(),
  message: z.string().min(2).max(2_000),
  website: z.string().max(0),      
  ts:      z.coerce.number(),        
});

export type ContactPayload = z.infer<typeof contactSchema>;
