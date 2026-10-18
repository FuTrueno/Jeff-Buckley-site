import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CircleCheck, Eye, EyeOff, RotateCcw } from "lucide-react";
import { formIntro } from "../data/site";
import { tracks } from "../data/media";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../lib/utils";
import Button from "../components/ui/Button";
import DotGrid from "../components/ui/DotGrid";
import Reveal from "../components/ui/Reveal";
import { Eyebrow } from "../components/ui/SectionHeading";
import SplitText from "../components/ui/SplitText";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  age: "",
  preferredDate: "",
  sessionType: "",
  topics: [],
  favoriteSong: "",
  comments: "",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-[14px] text-ivory-100 placeholder:text-mist-500 transition-colors duration-300 [color-scheme:dark] hover:border-white/20 focus:border-bronze-500/60 focus:bg-ink-950/80 focus:outline-none focus:ring-2 focus:ring-bronze-500/15 focus-visible:outline-none";

const sessionTypes = [
  { value: "album", label: "Full album listening", hint: "Start to finish, in order" },
  { value: "songs", label: "Selected songs", hint: "A shorter, guided session" },
];

const topicOptions = [
  { value: "grace", label: "Grace" },
  { value: "lyrics", label: "Lyrics & songwriting" },
  { value: "guitar", label: "Guitar & arrangements" },
];

const steps = [
  { title: "Choose a format", body: "The whole record, or the songs you keep returning to." },
  { title: "Pick an entry point", body: "Your favourite song tells us where the session should begin." },
  { title: "Leave a note", body: "Anything you want the session to make room for." },
];

function validate(values) {
  const next = {};

  if (!values.fullName.trim()) next.fullName = "Please enter your name.";

  if (!values.email.trim()) {
    next.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    next.email = "That email address does not look right.";
  }

  if (values.password.length < 8) next.password = "Use at least 8 characters.";

  if (values.age !== "" && values.age !== null) {
    const age = Number(values.age);
    if (!Number.isInteger(age) || age < 13 || age > 100) {
      next.age = "Age must be between 13 and 100.";
    }
  }

  if (!values.sessionType) next.sessionType = "Choose a session type.";
  if (!values.favoriteSong) next.favoriteSong = "Choose a favourite song.";

  return next;
}

function Field({ label, htmlFor, error, hint, className, children }) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="block font-mono text-[8.5px] uppercase tracking-[0.24em] text-mist-400"
      >
        {label}
      </label>
      <div className="mt-2.5">{children}</div>
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-2 text-[11px] text-rose-300">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-2 text-[11px] text-mist-500">{hint}</p>
      ) : null}
    </div>
  );
}

export default function ListeningForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const cardRef = useRef(null);

  usePageMeta(
    "Listening Form — Jeff Buckley, Grace & Legacy",
    "Register for a fictional Jeff Buckley listening session. A front-end demonstration; no information is stored.",
  );

  // The success panel is much shorter than the form, so bring it into view.
  useEffect(() => {
    if (submitted) {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [submitted]);

  const update = (key) => (event) => {
    setValues((previous) => ({ ...previous, [key]: event.target.value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const toggleTopic = (topic) => {
    setValues((previous) => ({
      ...previous,
      topics: previous.topics.includes(topic)
        ? previous.topics.filter((item) => item !== topic)
        : [...previous.topics, topic],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(firstKey)?.focus();
      return;
    }

    setSubmitted({ ...values });
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setSubmitted(null);
    setShowPassword(false);
  };

  const summaryRows = submitted
    ? [
        { label: "Name", value: submitted.fullName },
        { label: "Email", value: submitted.email },
        {
          label: "Format",
          value:
            sessionTypes.find((type) => type.value === submitted.sessionType)?.label ?? "—",
        },
        { label: "Date", value: submitted.preferredDate || "Not set" },
        {
          label: "Favourite",
          value: tracks.find((track) => track.id === submitted.favoriteSong)?.title ?? "—",
        },
        {
          label: "Topics",
          value:
            submitted.topics
              .map((topic) => topicOptions.find((option) => option.value === topic)?.label)
              .filter(Boolean)
              .join(", ") || "None selected",
        },
        { label: "Note", value: submitted.comments || "—" },
      ]
    : [];

  return (
    <section className="relative overflow-hidden pb-24 pt-[120px] sm:pb-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -left-32 top-20 size-[440px] rounded-full bg-steel-500/[0.09] blur-[130px]" />
        <div className="absolute -right-24 top-1/3 size-[480px] rounded-full bg-bronze-500/[0.10] blur-[140px]" />
      </div>
      <DotGrid className="opacity-40" cell={34} opacity={0.22} spotlight={false} />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Intro */}
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <Eyebrow>{formIntro.eyebrow}</Eyebrow>

            <h1 className="mt-6 font-display text-[clamp(2.6rem,4.8vw,4.2rem)] font-light leading-[0.98] tracking-[-0.015em] text-ivory-50">
              <SplitText trigger="mount" text="Tell us what you" delay={0.1} />{" "}
              <motion.span
                className="inline-block italic text-bronze-gradient"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.6, ease: "easeOut" }}
              >
                want to hear.
              </motion.span>
            </h1>

            <p className="mt-6 max-w-md text-[14.5px] leading-relaxed text-mist-300">
              {formIntro.body}
            </p>

            <ol className="mt-10 space-y-5 border-t border-white/8 pt-8">
              {steps.map((step, index) => (
                <Reveal key={step.title} as="li" delay={0.05 * index}>
                  <div className="flex gap-4">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-bronze-500/30 font-mono text-[9px] text-bronze-400">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-[13px] font-medium text-ivory-100">{step.title}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-mist-400">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>

            <p className="mt-8 font-mono text-[8px] uppercase leading-relaxed tracking-[0.24em] text-mist-500">
              No account is created. No data leaves this page.
            </p>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div
              ref={cardRef}
              className="relative scroll-mt-24 overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.045] via-white/[0.02] to-white/[0.008] p-6 backdrop-blur-xl sm:p-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-bronze-400/50 to-transparent"
              />

              <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="inline-flex size-14 items-center justify-center rounded-full bg-bronze-300 text-ink-950">
                      <CircleCheck className="size-6" strokeWidth={1.8} />
                    </span>
                    <h2 className="mt-6 font-display text-[2.1rem] leading-tight text-ivory-50">
                      You&rsquo;re on the list.
                    </h2>
                    <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-mist-400">
                      Nothing was submitted anywhere — this is a front-end
                      demonstration. Here is what the server would have received.
                    </p>

                    <dl className="mt-7 divide-y divide-white/8 overflow-hidden rounded-xl border border-white/8">
                      {summaryRows.map((row) => (
                        <div
                          key={row.label}
                          className="flex items-start justify-between gap-6 px-4 py-3"
                        >
                          <dt className="font-mono text-[8px] uppercase tracking-[0.24em] text-mist-500">
                            {row.label}
                          </dt>
                          <dd className="max-w-[60%] text-right text-[12.5px] leading-relaxed text-ivory-100">
                            {row.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-7">
                      <Button type="button" variant="ghost" onClick={reset}>
                        <RotateCcw
                          aria-hidden="true"
                          className="mr-1.5 size-3.5"
                          strokeWidth={1.7}
                        />
                        Start over
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    noValidate
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-9"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-mist-500">
                        Session registration
                      </p>
                      <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-mist-500">
                        <span className="text-bronze-400">*</span> required
                      </p>
                    </div>

                    {Object.keys(errors).length > 0 ? (
                      <div
                        role="alert"
                        className="rounded-xl border border-rose-400/30 bg-rose-500/[0.07] px-4 py-3 text-[12px] text-rose-200"
                      >
                        Please check the highlighted fields and try again.
                      </div>
                    ) : null}

                    {/* 1 — Account */}
                    <fieldset className="space-y-5">
                      <legend className="mb-5 flex w-full items-center gap-3 font-mono text-[8.5px] uppercase tracking-[0.28em] text-bronze-400">
                        <span className="inline-flex size-5 items-center justify-center rounded-full border border-bronze-500/40 text-[9px]">
                          1
                        </span>
                        Account details
                        <span aria-hidden="true" className="h-px flex-1 bg-white/8" />
                      </legend>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          label="Full name *"
                          htmlFor="fullName"
                          error={errors.fullName}
                          className="sm:col-span-2"
                        >
                          <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            placeholder="Your name"
                            value={values.fullName}
                            onChange={update("fullName")}
                            aria-invalid={Boolean(errors.fullName)}
                            aria-describedby={errors.fullName ? "fullName-error" : undefined}
                            required
                            className={inputClass}
                          />
                        </Field>

                        <Field
                          label="Email *"
                          htmlFor="email"
                          error={errors.email}
                          className="sm:col-span-2"
                        >
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={values.email}
                            onChange={update("email")}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            required
                            className={inputClass}
                          />
                        </Field>

                        <Field
                          label="Password *"
                          htmlFor="password"
                          error={errors.password}
                          hint="At least 8 characters."
                        >
                          <div className="relative">
                            <input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              autoComplete="new-password"
                              placeholder="••••••••"
                              minLength={8}
                              value={values.password}
                              onChange={update("password")}
                              aria-invalid={Boolean(errors.password)}
                              aria-describedby={
                                errors.password ? "password-error" : undefined
                              }
                              required
                              className={cn(inputClass, "pr-12")}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((current) => !current)}
                              aria-label={showPassword ? "Hide password" : "Show password"}
                              className="absolute right-3 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-mist-400 transition-colors hover:text-bronze-200"
                            >
                              {showPassword ? (
                                <EyeOff className="size-4" strokeWidth={1.6} />
                              ) : (
                                <Eye className="size-4" strokeWidth={1.6} />
                              )}
                            </button>
                          </div>
                        </Field>

                        <Field label="Age" htmlFor="age" error={errors.age}>
                          <input
                            id="age"
                            name="age"
                            type="number"
                            min={13}
                            max={100}
                            inputMode="numeric"
                            placeholder="Optional"
                            value={values.age}
                            onChange={update("age")}
                            aria-invalid={Boolean(errors.age)}
                            aria-describedby={errors.age ? "age-error" : undefined}
                            className={inputClass}
                          />
                        </Field>
                      </div>
                    </fieldset>

                    {/* 2 — Preferences */}
                    <fieldset className="space-y-6">
                      <legend className="mb-5 flex w-full items-center gap-3 font-mono text-[8.5px] uppercase tracking-[0.28em] text-bronze-400">
                        <span className="inline-flex size-5 items-center justify-center rounded-full border border-bronze-500/40 text-[9px]">
                          2
                        </span>
                        Session preferences
                        <span aria-hidden="true" className="h-px flex-1 bg-white/8" />
                      </legend>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Preferred date" htmlFor="preferredDate">
                          <input
                            id="preferredDate"
                            name="preferredDate"
                            type="date"
                            value={values.preferredDate}
                            onChange={update("preferredDate")}
                            className={inputClass}
                          />
                        </Field>

                        <Field
                          label="Favourite song *"
                          htmlFor="favoriteSong"
                          error={errors.favoriteSong}
                        >
                          <div className="relative">
                            <select
                              id="favoriteSong"
                              name="favoriteSong"
                              value={values.favoriteSong}
                              onChange={update("favoriteSong")}
                              aria-invalid={Boolean(errors.favoriteSong)}
                              aria-describedby={
                                errors.favoriteSong ? "favoriteSong-error" : undefined
                              }
                              required
                              className={cn(inputClass, "appearance-none pr-10")}
                            >
                              <option value="">Select a song</option>
                              {tracks.map((track) => (
                                <option key={track.id} value={track.id}>
                                  {track.title}
                                </option>
                              ))}
                            </select>
                            <ChevronDown
                              aria-hidden="true"
                              className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-mist-400"
                              strokeWidth={1.6}
                            />
                          </div>
                        </Field>
                      </div>

                      <div>
                        <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-mist-400">
                          Session type *
                        </p>
                        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                          {sessionTypes.map((type) => (
                            <label
                              key={type.value}
                              className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3.5 transition-colors duration-200 hover:border-white/16 has-[:checked]:border-bronze-500/50 has-[:checked]:bg-bronze-500/[0.07] has-[:focus-visible]:border-bronze-500/50"
                            >
                              <input
                                type="radio"
                                name="sessionType"
                                value={type.value}
                                checked={values.sessionType === type.value}
                                onChange={update("sessionType")}
                                required
                                className="option-input"
                              />
                              <span
                                aria-hidden="true"
                                className="option-mark option-mark--radio mt-0.5"
                              />
                              <span>
                                <span className="block text-[13px] text-ivory-100">
                                  {type.label}
                                </span>
                                <span className="mt-0.5 block text-[11px] text-mist-500">
                                  {type.hint}
                                </span>
                              </span>
                            </label>
                          ))}
                        </div>
                        {errors.sessionType ? (
                          <p className="mt-2 text-[11px] text-rose-300">{errors.sessionType}</p>
                        ) : null}
                      </div>

                      <div>
                        <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-mist-400">
                          Topics of interest
                        </p>
                        <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                          {topicOptions.map((topic) => (
                            <label
                              key={topic.value}
                              className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.02] px-3.5 py-3 transition-colors duration-200 hover:border-white/16 has-[:checked]:border-bronze-500/50 has-[:checked]:bg-bronze-500/[0.07] has-[:focus-visible]:border-bronze-500/50"
                            >
                              <input
                                type="checkbox"
                                name="topics"
                                value={topic.value}
                                checked={values.topics.includes(topic.value)}
                                onChange={() => toggleTopic(topic.value)}
                                className="option-input"
                              />
                              <span
                                aria-hidden="true"
                                className="option-mark option-mark--checkbox"
                              />
                              <span className="text-[12.5px] leading-tight text-mist-200">
                                {topic.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <Field
                        label="Additional information"
                        htmlFor="comments"
                        hint={`${values.comments.length}/500 characters`}
                      >
                        <textarea
                          id="comments"
                          name="comments"
                          rows={5}
                          maxLength={500}
                          placeholder="Tell us what you would like to explore…"
                          value={values.comments}
                          onChange={update("comments")}
                          className={cn(inputClass, "min-h-[124px] resize-y leading-relaxed")}
                        />
                      </Field>
                    </fieldset>

                    <div className="flex flex-wrap items-center gap-3 border-t border-white/8 pt-7">
                      <Button type="submit" withArrow>
                        Submit registration
                      </Button>
                      <Button type="button" variant="ghost" onClick={reset}>
                        Reset
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <p className="mt-4 px-1 font-mono text-[8px] uppercase leading-relaxed tracking-[0.2em] text-mist-500">
              Built as a front-end exercise — form state lives in React only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
