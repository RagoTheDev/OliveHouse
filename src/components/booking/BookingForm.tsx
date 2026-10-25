import { useEffect, useId, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DateRange } from "react-day-picker";
import { Check, Copy, Info } from "lucide-react";
import { AirbnbIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Mail } from "lucide-react";
import { property } from "@/data/property";
import { airbnbChannel, directChannels, hasDirectChannel, inquiryText } from "@/lib/booking/channels";
import { availabilityProvider } from "@/lib/booking/availability";
import type { InquiryChannel } from "@/lib/booking/types";
import { formatDate, nightsBetween, pluralize } from "@/lib/format";
import { inquirySchema, type InquiryInput, type InquiryValues } from "./schema";
import { DateRangeField } from "./DateRangeField";
import { GuestStepper } from "./GuestStepper";
import { Button } from "@/components/ui/Button";

const channelIcon: Record<InquiryChannel["id"], React.ComponentType<{ className?: string }>> = {
  whatsapp: WhatsAppIcon,
  email: Mail,
  airbnb: AirbnbIcon,
};

const inputCls =
  "w-full rounded-sm border hairline bg-ivory-light px-4 py-3 font-sans text-[0.98rem] text-charcoal placeholder:text-charcoal/40 focus:border-olive focus:outline-none focus:ring-2 focus:ring-olive/20 transition-shadow";

export function BookingForm() {
  const ids = {
    dates: useId(),
    guests: useId(),
    name: useId(),
    contact: useId(),
    message: useId(),
    channel: useId(),
  };
  const [blocked, setBlocked] = useState<Date[]>([]);
  const [channel, setChannel] = useState<InquiryChannel>(directChannels[0] ?? airbnbChannel);
  const [sent, setSent] = useState<{ values: InquiryValues; url: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    availabilityProvider.blockedDates().then(setBlocked).catch(() => setBlocked([]));
  }, []);

  const form = useForm<InquiryInput, unknown, InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { guests: 2, name: "", contact: "", message: "" },
    mode: "onTouched",
  });
  const { register, handleSubmit, control, formState } = form;
  const { errors, isSubmitting } = formState;
  const checkIn = useWatch({ control, name: "checkIn" });
  const checkOut = useWatch({ control, name: "checkOut" });
  const guests = useWatch({ control, name: "guests" });
  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;

  const onSubmit = (values: InquiryValues) => {
    const url = channel.buildUrl({ ...values, message: values.message || undefined });
    if (channel.id === "email") {
      window.location.assign(url);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    setSent({ values, url });
  };

  const copyMessage = async () => {
    if (!sent) return;
    try {
      await navigator.clipboard.writeText(inquiryText({ ...sent.values, message: sent.values.message || undefined }));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (sent) {
    const Icon = channelIcon[channel.id];
    return (
      <div className="rounded-sm border hairline bg-ivory-light p-6 md:p-10" role="status" aria-live="polite">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-olive text-ivory">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <h2 className="mt-6 font-serif text-3xl leading-tight">Your inquiry is on its way.</h2>
        <p className="mt-3 max-w-prose text-[0.98rem] leading-relaxed text-charcoal/80">
          {channel.id === "airbnb"
            ? "We have opened the Olive House listing on Airbnb with your dates filled in. Complete the request there; Airbnb handles availability and payment."
            : `We opened ${channel.label.replace("Send via ", "").replace("Send by ", "")} with your message ready to send. If it did not open, use the button below.`}
        </p>
        <p className="mt-3 flex items-start gap-2 text-[0.85rem] leading-relaxed text-olive-800">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          This is an inquiry, not a confirmed reservation. {property.hostFirstName} will confirm whether{" "}
          {formatDate(sent.values.checkIn, "d MMM")} – {formatDate(sent.values.checkOut, "d MMM")} is available.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={sent.url} target="_blank" rel="noopener noreferrer" arrow="external">
            <Icon className="size-4" /> Open {channel.id === "airbnb" ? "Airbnb" : "again"}
          </Button>
          {channel.id !== "airbnb" && (
            <Button variant="outline" onClick={copyMessage} magnetic={false}>
              {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
              {copied ? "Copied" : "Copy message"}
            </Button>
          )}
          <Button variant="ghost" onClick={() => setSent(null)} magnetic={false} className="link-underline">
            Edit inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="flex flex-col gap-10 lg:col-span-7">
        {/* Dates */}
        <fieldset>
          <legend className="font-serif text-2xl">When would you like to stay?</legend>
          <p id={`${ids.dates}-help`} className="mt-1 text-[0.85rem] text-charcoal/65">
            Select a check-in day, then a check-out day. Past dates are unavailable.
          </p>
          <div className="mt-4">
            <Controller
              control={control}
              name="checkIn"
              render={({ field: ciField }) => (
                <Controller
                  control={control}
                  name="checkOut"
                  render={({ field: coField }) => {
                    const range: DateRange | undefined =
                      ciField.value || coField.value ? { from: ciField.value, to: coField.value } : undefined;
                    return (
                      <DateRangeField
                        value={range}
                        blockedDates={blocked}
                        describedBy={`${ids.dates}-help`}
                        onChange={(r) => {
                          ciField.onChange(r?.from);
                          coField.onChange(r?.to);
                        }}
                      />
                    );
                  }}
                />
              )}
            />
          </div>
          <div className="mt-3 grid gap-2 text-[0.85rem] sm:grid-cols-2">
            <p className={errors.checkIn ? "text-terracotta-deep" : "text-charcoal/70"} aria-live="polite">
              <span className="eyebrow mr-2 text-olive-600">Check-in</span>
              {errors.checkIn?.message ?? (checkIn ? formatDate(checkIn) : "Not selected")}
            </p>
            <p className={errors.checkOut ? "text-terracotta-deep" : "text-charcoal/70"} aria-live="polite">
              <span className="eyebrow mr-2 text-olive-600">Check-out</span>
              {errors.checkOut?.message ?? (checkOut ? formatDate(checkOut) : "Not selected")}
            </p>
          </div>
        </fieldset>

        {/* Guests */}
        <div>
          <label htmlFor={ids.guests} className="font-serif text-2xl">
            Guests
          </label>
          <p className="mt-1 text-[0.85rem] text-charcoal/65">The house sleeps up to {property.maxGuests}.</p>
          <div className="mt-4">
            <Controller
              control={control}
              name="guests"
              render={({ field }) => <GuestStepper id={ids.guests} value={field.value ?? 1} onChange={field.onChange} max={property.maxGuests} />}
            />
          </div>
          {errors.guests && <p className="mt-2 text-[0.85rem] text-terracotta-deep">{errors.guests.message}</p>}
        </div>

        {/* Details */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor={ids.name} className="eyebrow text-olive-600">
              Your name
            </label>
            <input id={ids.name} type="text" autoComplete="name" className={inputCls} placeholder="Full name" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${ids.name}-err` : undefined} {...register("name")} />
            {errors.name && (
              <p id={`${ids.name}-err`} className="text-[0.85rem] text-terracotta-deep">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor={ids.contact} className="eyebrow text-olive-600">
              Phone or e-mail
            </label>
            <input id={ids.contact} type="text" inputMode="email" autoComplete="email" className={inputCls} placeholder="+255 … or you@example.com" aria-invalid={!!errors.contact} aria-describedby={errors.contact ? `${ids.contact}-err` : undefined} {...register("contact")} />
            {errors.contact && (
              <p id={`${ids.contact}-err`} className="text-[0.85rem] text-terracotta-deep">
                {errors.contact.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label htmlFor={ids.message} className="eyebrow text-olive-600">
              Message <span className="normal-case tracking-normal opacity-60">(optional)</span>
            </label>
            <textarea id={ids.message} rows={4} className={inputCls} placeholder="Arrival time, a pet joining you, anything we should know…" aria-invalid={!!errors.message} aria-describedby={errors.message ? `${ids.message}-err` : undefined} {...register("message")} />
            {errors.message && (
              <p id={`${ids.message}-err`} className="text-[0.85rem] text-terracotta-deep">
                {errors.message.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Summary + channel */}
      <aside className="lg:col-span-5">
        <div className="rounded-sm border hairline bg-olive-950 p-6 text-ivory md:p-8 lg:sticky lg:top-28">
          <p className="eyebrow text-sand/85">Your stay</p>
          <dl className="mt-5 divide-y hairline-light">
            <div className="flex items-baseline justify-between py-3">
              <dt className="text-[0.85rem] text-sand/90">Dates</dt>
              <dd className="text-right font-serif text-lg">
                {checkIn && checkOut ? `${formatDate(checkIn, "d MMM")} – ${formatDate(checkOut, "d MMM yyyy")}` : "—"}
              </dd>
            </div>
            <div className="flex items-baseline justify-between py-3">
              <dt className="text-[0.85rem] text-sand/90">Nights</dt>
              <dd className="font-serif text-lg">{nights > 0 ? pluralize(nights, "night") : "—"}</dd>
            </div>
            <div className="flex items-baseline justify-between py-3">
              <dt className="text-[0.85rem] text-sand/90">Guests</dt>
              <dd className="font-serif text-lg">{pluralize(guests ?? 1, "guest")}</dd>
            </div>
          </dl>

          <fieldset className="mt-6">
            <legend className="eyebrow text-sand/85">How to send</legend>
            <div className="mt-3 flex flex-col gap-2">
              {[...directChannels, airbnbChannel].map((c) => {
                const Icon = channelIcon[c.id];
                const active = channel.id === c.id;
                return (
                  <label
                    key={c.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 text-[0.92rem] transition-colors ${
                      active ? "border-sand bg-ivory/10" : "border-ivory/15 hover:border-ivory/40"
                    }`}
                  >
                    <input type="radio" name={ids.channel} value={c.id} checked={active} onChange={() => setChannel(c)} className="accent-sand" />
                    <Icon className="size-4" />
                    <span>{c.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <Button type="submit" variant="ivory" size="lg" arrow={channel.id === "airbnb" ? "external" : "right"} className="mt-6 w-full" disabled={isSubmitting} magnetic={false}>
            {channel.id === "airbnb" ? "Continue on Airbnb" : "Send inquiry"}
          </Button>

          <p className="mt-4 flex items-start gap-2 text-[0.8rem] leading-relaxed text-sand/90">
            <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            {hasDirectChannel
              ? "A direct inquiry is a message to the host, not a reservation. Availability is confirmed by reply. Payment and protection for Airbnb bookings are handled by Airbnb."
              : "Direct messaging is not configured yet, so inquiries continue on Airbnb, where availability and payment are handled securely."}
          </p>
        </div>
      </aside>
    </form>
  );
}
