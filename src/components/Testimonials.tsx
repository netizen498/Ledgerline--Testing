import { Quote } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  location: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'We replaced three spreadsheets with one clear cash-flow view. Month-end close went from a week of reconciliation to a single afternoon of review.',
    name: 'Ama Owusu',
    role: 'Finance Lead',
    company: 'Kente Logistics',
    location: 'Osu, Accra',
    initials: 'AO',
  },
  {
    quote:
      'The plan configurator made it obvious which tier fit our transaction volume. No sales call, no pressure — just transparent rules we could read ourselves.',
    name: 'Kwabena Mensah',
    role: 'Co-founder & CEO',
    company: 'Spintex Bakes',
    location: 'Spintex, Accra',
    initials: 'KM',
  },
  {
    quote:
      'As a finance team handling multiple vendor accounts, the structured comparison table saved us a procurement cycle. Every feature was on the page before we had to ask.',
    name: 'Esi Boateng',
    role: 'Head of Operations',
    company: 'Cantonments Retail Group',
    location: 'Cantonments, Accra',
    initials: 'EB',
  },
  {
    quote:
      'The financing section laid out use cases without promising approvals. That honesty is exactly what a cautious finance team needs before exploring options.',
    name: 'Yaw Asante',
    role: 'CFO',
    company: 'Airport City Studios',
    location: 'Airport City, Accra',
    initials: 'YA',
  },
  {
    quote:
      'Cash-flow forecasting stopped being a guess. We can finally show the board a clean net-position chart instead of a stitched-together deck.',
    name: 'Adwoa Frimpong',
    role: 'Operations Manager',
    company: 'East Legon Tech Hub',
    location: 'East Legon, Accra',
    initials: 'AF',
  },
  {
    quote:
      'Onboarding our five-person finance team took minutes, not days. The seat structure per plan was clear up front, with no surprise add-on fees.',
    name: 'Nana Kojo',
    role: 'Founder',
    company: 'Labone Fintech Labs',
    location: 'Labone, Accra',
    initials: 'NK',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-b border-line bg-surface">
      <div className="container-px py-16 lg:py-24">
        <SectionHeading
          eyebrow="From Accra teams"
          title="How local finance teams use Ledgerline"
          description="Fictional reviews from illustrative Accra-based startups and finance teams — demonstrations of how the product could fit, not real endorsements."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="card flex flex-col p-6 transition-shadow hover:shadow-card"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-accent/10 text-accent-600">
                <Quote size={16} />
              </span>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-primary">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                  {t.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-heading text-sm font-semibold text-primary">
                    {t.name}
                  </p>
                  <p className="truncate text-xs text-muted">
                    {t.role}, {t.company}
                  </p>
                  <p className="truncate text-[11px] text-muted/70">{t.location}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-8 flex items-start gap-2 text-xs leading-relaxed text-muted">
          <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-highlight" aria-hidden />
          <span>
            These testimonials are fictional demonstrations created for design purposes. They do
            not represent real customers, companies, or endorsements.
          </span>
        </p>
      </div>
    </section>
  );
}
