import { z } from "zod";

export const NoteSchema = z.string().max(200, "Note must be 200 characters or less").catch("");

export type Note = z.infer<typeof NoteSchema>;
