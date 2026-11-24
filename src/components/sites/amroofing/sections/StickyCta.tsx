import Link from "next/link";
import { phoneHref } from "@/config/site";

export function StickyCta({ surveyHref = "/contact/#enquiry" }: { surveyHref?: string }) {
  return (
    <div className="sticky-cta" aria-label="Quick contact">
      <a className="btn btn-accent" href={phoneHref}>
        Call
      </a>
      <Link className="btn btn-dark" href={surveyHref}>
        Get a free quote
      </Link>
    </div>
  );
}
