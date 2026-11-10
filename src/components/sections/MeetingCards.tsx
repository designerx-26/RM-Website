import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function MeetingCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {site.contact.meetings.map((meeting, index) => (
        <Reveal key={meeting.title} delay={index * 75} className="h-full">
          <div className="flex h-full flex-col rounded-lg border border-brand-grey-100 bg-brand-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between rounded-t-lg bg-brand-black px-5 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">{meeting.day}</p>
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-brand-grey-500" aria-hidden="true">
                <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <h3 className="text-base font-black uppercase tracking-tight text-brand-black">{meeting.title}</h3>
              <p className="text-sm text-brand-grey-500">{meeting.description}</p>
              <div className="mt-auto flex flex-col gap-1.5 border-t border-brand-grey-100 pt-4 text-sm font-semibold text-brand-black">
                <span className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-brand-red" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {meeting.time}
                </span>
                <span className="flex items-center gap-2 text-brand-grey-500">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-brand-red" aria-hidden="true">
                    <path d="M12 21s-7-6.5-7-12a7 7 0 0114 0c0 5.5-7 12-7 12z" stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  {meeting.location}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
