"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  return (
    <form className="flex flex-col gap-4 mt-14 border-t pt-10 border-foreground/5">
      <p className="mb-4"> Hi 👋 If you need anything, send me a message.</p>
      <Input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        className="w-full h-10 px-4 bg-none border border-foreground/5 rounded-md"
      />

      <Textarea
        name="message"
        placeholder="Your message"
        required
        className="w-full px-4 bg-none border border-foreground/5 rounded-md"
      />
      <Button
        type="submit"
        className="w-text-sm font-semibold rounded-lg w-max bg-foreground hover:bg-foreground/80 text-background h-10 px-4 disabled:opacity-50"
      >
        Send Message
      </Button>
    </form>
  );
}
