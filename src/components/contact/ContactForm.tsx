import { useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router';
import { AlertCircle, ArrowRight, Check, ChevronDown, FlaskConical, LoaderCircle, Phone, RotateCcw } from 'lucide-react';
import { SERVICE_OPTIONS, submitContact, isDemoMode, type ContactField, type ContactFormData } from '../../services/contact';
import { MESSAGE_MAX, validate, validateField, type FieldErrors } from '../../services/contact/validation';
import { company } from '../../content/company';

const EMPTY: ContactFormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  dimensions: '',
  message: '',
  consent: false,
  website: '',
};

const LABELS: Record<ContactField, string> = {
  name: 'Nimi',
  company: 'Yritys',
  email: 'Sähköposti',
  phone: 'Puhelinnumero',
  service: 'Kiinnostava palvelu',
  dimensions: 'Mainoksen arvioidut mitat',
  message: 'Viesti',
  consent: 'Tietojen käsittely',
  website: 'Verkkosivu',
};

type Status = 'idle' | 'submitting' | 'demo' | 'success' | 'error';

const fieldBase =
  'w-full rounded-xl bg-night-800/70 px-4 text-paper placeholder:text-steel-400 ring-1 ring-paper/12 transition-[box-shadow,background-color] duration-300 outline-none hover:ring-paper/25 focus:bg-night-800 focus:ring-2 focus:ring-gold-300/80 focus:shadow-[0_0_0_6px_rgb(238_199_124/0.08),0_0_30px_-6px_rgb(255_180_80/0.35)] aria-[invalid=true]:ring-signal/80';

export function ContactForm() {
  const uid = useId();
  const [data, setData] = useState<ContactFormData>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [submitError, setSubmitError] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [preview, setPreview] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const id = (f: ContactField) => `${uid}-${f}`;

  const update = (field: ContactField) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    const next = { ...data, [field]: value } as ContactFormData;
    setData(next);
    // Once a field has been visited, re-check it live so errors clear as soon as they're fixed
    if (touched[field] || errors[field]) setErrors((prev) => ({ ...prev, [field]: validateField(field, next) }));
  };

  const blur = (field: ContactField) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    const shouldCheck = field === 'consent' ? false : typeof data[field] === 'string' && (data[field] as string).trim() !== '';
    if (shouldCheck || errors[field]) setErrors((prev) => ({ ...prev, [field]: validateField(field, data) }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      setShowSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setShowSummary(false);
    setStatus('submitting');
    setSubmitError('');
    const result = await submitContact(data);
    if (result.status === 'error') {
      setSubmitError(result.message);
      setStatus('error');
      return;
    }
    setStatus(result.status);
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const reset = () => {
    setData(EMPTY);
    setErrors({});
    setTouched({});
    setStatus('idle');
    setPreview(false);
  };

  const errorList = Object.entries(errors).filter(([, v]) => v) as [ContactField, string][];

  if (status === 'demo' || status === 'success') {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="outline-none">
        {status === 'demo' && !preview ? (
          <DemoResult onReset={reset} onPreview={() => setPreview(true)} />
        ) : (
          <SuccessState preview={status === 'demo'} onBack={() => setPreview(false)} />
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={isDemoMode ? `${uid}-demo` : undefined} className="relative">
      {isDemoMode && (
        <div id={`${uid}-demo`} className="mb-8 flex gap-3 rounded-2xl bg-volt/[0.06] p-4 text-[0.9rem] leading-relaxed text-steel-200 ring-1 ring-volt/25">
          <FlaskConical className="mt-0.5 size-4 shrink-0 text-volt" aria-hidden="true" />
          <p>
            <strong className="font-semibold text-paper">Demolomake.</strong> Lomake näyttää, miltä tarjouspyyntö tulee
            toimimaan. Tietoja ei lähetetä eikä tallenneta – ota yhteyttä puhelimitse tai sähköpostilla.
          </p>
        </div>
      )}

      {showSummary && errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 rounded-2xl bg-signal/[0.07] p-5 ring-1 ring-signal/40 outline-none focus-visible:ring-2"
        >
          <p className="flex items-center gap-2 font-semibold text-paper">
            <AlertCircle className="size-4 text-signal" aria-hidden="true" />
            Tarkista {errorList.length === 1 ? 'yksi kenttä' : `${errorList.length} kenttää`}
          </p>
          <ul className="mt-3 space-y-1.5 text-[0.92rem]">
            {errorList.map(([f, msg]) => (
              <li key={f}>
                <a href={`#${id(f)}`} className="text-steel-200 underline decoration-signal/50 underline-offset-4 hover:text-paper"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id(f))?.focus();
                  }}
                >
                  {LABELS[f]}: {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
        <Field id={id('name')} label={LABELS.name} required error={errors.name}>
          <input
            id={id('name')}
            name="name"
            autoComplete="name"
            required
            value={data.name}
            onChange={update('name')}
            onBlur={blur('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id('name')}-err` : undefined}
            className={`${fieldBase} h-14`}
          />
        </Field>
        <Field id={id('company')} label={LABELS.company} optional>
          <input
            id={id('company')}
            name="company"
            autoComplete="organization"
            value={data.company}
            onChange={update('company')}
            className={`${fieldBase} h-14`}
          />
        </Field>
        <Field id={id('email')} label={LABELS.email} required error={errors.email}>
          <input
            id={id('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={data.email}
            onChange={update('email')}
            onBlur={blur('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id('email')}-err` : undefined}
            className={`${fieldBase} h-14`}
          />
        </Field>
        <Field id={id('phone')} label={LABELS.phone} optional error={errors.phone}>
          <input
            id={id('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={update('phone')}
            onBlur={blur('phone')}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${id('phone')}-err` : undefined}
            className={`${fieldBase} h-14`}
          />
        </Field>
        <Field id={id('service')} label={LABELS.service} required error={errors.service}>
          <div className="relative">
            <select
              id={id('service')}
              name="service"
              required
              value={data.service}
              onChange={update('service')}
              onBlur={blur('service')}
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? `${id('service')}-err` : undefined}
              className={`${fieldBase} h-14 cursor-pointer appearance-none pr-12 ${data.service ? '' : 'text-steel-400'}`}
            >
              <option value="" disabled>
                Valitse palvelu
              </option>
              {SERVICE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-night-800 text-paper">
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-steel-300" aria-hidden="true" />
          </div>
        </Field>
        <Field id={id('dimensions')} label={LABELS.dimensions} optional hint="Esim. 300 × 80 cm – arviokin riittää.">
          <input
            id={id('dimensions')}
            name="dimensions"
            value={data.dimensions}
            onChange={update('dimensions')}
            aria-describedby={`${id('dimensions')}-hint`}
            className={`${fieldBase} h-14`}
          />
        </Field>
        <Field
          id={id('message')}
          label={LABELS.message}
          required
          error={errors.message}
          hint="Kerro kohteesta, toiveistasi ja aikataulusta."
          className="sm:col-span-2"
          aside={
            <span className={`num text-[0.78rem] ${data.message.length > MESSAGE_MAX ? 'text-signal' : 'text-steel-400'}`} aria-hidden="true">
              {data.message.length} / {MESSAGE_MAX}
            </span>
          }
        >
          <textarea
            id={id('message')}
            name="message"
            required
            rows={6}
            value={data.message}
            onChange={update('message')}
            onBlur={blur('message')}
            aria-invalid={!!errors.message}
            aria-describedby={`${id('message')}-hint${errors.message ? ` ${id('message')}-err` : ''}`}
            className={`${fieldBase} min-h-40 resize-y py-3.5 leading-relaxed`}
          />
        </Field>

        {/* Honeypot for future spam filtering: hidden from people and assistive tech */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id('website')}>Jätä tämä kenttä tyhjäksi</label>
          <input id={id('website')} name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={update('website')} />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3.5">
            <span className="relative mt-0.5 grid size-6 shrink-0 place-items-center">
              <input
                id={id('consent')}
                name="consent"
                type="checkbox"
                required
                checked={data.consent}
                onChange={update('consent')}
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? `${id('consent')}-err` : undefined}
                className="peer size-6 cursor-pointer appearance-none rounded-md bg-night-800 ring-1 ring-paper/25 transition outline-none checked:bg-gold-300 checked:ring-gold-300 hover:ring-gold-300/60 focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900 aria-[invalid=true]:ring-signal/80"
              />
              <Check className="pointer-events-none absolute size-4 text-night-900 opacity-0 transition peer-checked:opacity-100" strokeWidth={3} aria-hidden="true" />
            </span>
            <label htmlFor={id('consent')} className="cursor-pointer text-[0.95rem] leading-relaxed text-steel-200">
              Hyväksyn, että antamiani tietoja käsitellään yhteydenottopyyntöni käsittelemiseksi{' '}
              <Link to="/tietosuoja" className="text-gold-200 underline decoration-gold-300/40 underline-offset-4 hover:text-gold-100">
                tietosuojaselosteen
              </Link>{' '}
              mukaisesti. <span className="text-steel-400">(pakollinen)</span>
            </label>
          </div>
          {errors.consent && <ErrorText id={`${id('consent')}-err`}>{errors.consent}</ErrorText>}
        </div>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-6 flex items-center gap-2 text-[0.95rem] text-signal">
          <AlertCircle className="size-4" aria-hidden="true" />
          {submitError}
        </p>
      )}

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.82rem] text-steel-400">Pakolliset kentät on merkitty tähdellä (*).</p>
        <button type="submit" className="btn btn-primary min-w-56" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Käsitellään…
            </>
          ) : (
            <>
              Lähetä tarjouspyyntö
              <ArrowRight className="btn-icon size-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  optional,
  error,
  hint,
  aside,
  className = '',
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[0.9rem] font-medium text-paper">
          {label}
          {required && (
            <span className="ml-0.5 text-gold-300" aria-hidden="true">
              *
            </span>
          )}
          {optional && <span className="ml-2 text-[0.8rem] font-normal text-steel-400">(valinnainen)</span>}
        </label>
        {aside}
      </div>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-[0.82rem] text-steel-300">
          {hint}
        </p>
      )}
      {error && <ErrorText id={`${id}-err`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-[0.85rem] text-signal animate-[page-in_0.4s_var(--ease-expo)_both]">
      <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

/** Shown in demo mode instead of a confirmation: states clearly that nothing was sent. */
function DemoResult({ onReset, onPreview }: { onReset: () => void; onPreview: () => void }) {
  const phone = company.phones[0];
  return (
    <div className="rounded-3xl bg-night-850 p-8 ring-1 ring-volt/30 sm:p-10">
      <p className="t-eyebrow is-on">
        <span className="led led-volt" aria-hidden="true" />
        Demotila
      </p>
      <h3 className="t-h3 mt-5">Lomake toimii – mutta viestiä ei lähetetty.</h3>
      <p className="t-body mt-4">
        Tämä on esittelyversio. Antamiasi tietoja ei lähetetty Valoluxille eikä tallennettu mihinkään. Valmiilla sivustolla
        tarjouspyyntö välitetään yritykselle Google Apps Scriptin kautta.
      </p>
      <p className="t-body mt-4">
        Tavoitat Valoluxin nyt puhelimitse tai sähköpostilla:{' '}
        <a href={phone.href} className="num text-gold-200 underline underline-offset-4">
          {phone.label}
        </a>{' '}
        ·{' '}
        <a href={`mailto:${company.email}`} className="break-all text-gold-200 underline underline-offset-4">
          {company.email}
        </a>
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" className="btn btn-ghost" onClick={onReset}>
          <RotateCcw className="size-4" aria-hidden="true" />
          Täytä uudelleen
        </button>
        <button type="button" className="btn btn-ghost" onClick={onPreview}>
          Esikatsele valmiin sivuston kiitosnäkymää
        </button>
      </div>
    </div>
  );
}

/** Production confirmation. In the demo it is only reachable as a labelled preview. */
function SuccessState({ preview, onBack }: { preview: boolean; onBack: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-night-850 p-8 text-center ring-1 ring-gold-300/30 sm:p-12">
      {preview && (
        <p className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-volt/15 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.2em] text-volt uppercase ring-1 ring-volt/40">
          Esikatselu – mitään ei lähetetty
        </p>
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_180_80/0.25),transparent)]"
      />
      <span className="relative mx-auto mt-6 grid size-16 place-items-center rounded-full bg-gold-300 text-night-900 shadow-[0_0_40px_6px_rgb(255_180_80/0.45)]">
        <Check className="size-7" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <h3 className="t-h3 relative mt-7">Kiitos! Tarjouspyyntösi on vastaanotettu.</h3>
      <p className="t-body relative mx-auto mt-4 max-w-md">
        Palaamme asiaan mahdollisimman pian. Kiireellisissä asioissa voit soittaa meille suoraan.
      </p>
      <p className="relative mt-6 flex items-center justify-center gap-2 text-paper">
        <Phone className="size-4 text-gold-300" aria-hidden="true" />
        <span className="num">{company.phones.map((p) => p.label).join(' / ')}</span>
      </p>
      {preview && (
        <button type="button" className="btn btn-ghost relative mt-8" onClick={onBack}>
          Takaisin demotilan ilmoitukseen
        </button>
      )}
    </div>
  );
}
