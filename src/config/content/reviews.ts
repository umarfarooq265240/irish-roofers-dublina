import type { Review } from "../types";

// Real Google reviews only, copied from client/profile.md. Never add invented reviews.
// Google truncated some texts (ending in "…"). TODO(client): open each review on Google and paste the full text.
// The negative review is deliberately not featured (see client/profile.md).
export const reviews: Review[] = [
  {
    author: "Carin Bryans",
    when: "a week ago",
    rating: 5,
    topic: "Emergency repair",
    text: "Highly recommend Irish Roofers Dublin. They were very responsive, came out and priced the job quickly, organised temporary waterproofing and then did a permanent fix a few days later. Efficient, friendly and professional.",
  },
  {
    author: "Chris Paye",
    when: "a month ago",
    rating: 5,
    topic: "Ridge tile repointing",
    text: "Repointed and fixed all ridge tiles on my house. No hard push sell. Fair price. 3 lads arrived on time. All very friendly and did a great job. Highly recommended",
  },
  {
    author: "John Max",
    when: "5 months ago",
    rating: 5,
    topic: "Skylight installation",
    text: "Irish Roofers Dublin 14 did an excellent job with my skylight installation. Professional, efficient, and great attention to detail. The skylight fits perfectly with no leaks, and it has made a fantastic difference to the room. Fair pricing and friendly service. Highly recommend them for any flat roofing or skylight work in Dublin.",
  },
  {
    author: "Brendan Madigan",
    when: "4 months ago",
    rating: 5,
    topic: "Roof repairs",
    text: "I had a great experience with Irish Roofers. They arrived on time, were friendly, courteous, and worked hard throughout the day. The work was completed to a very high standard, and they left everything clean and tidy when they finished. …",
  },
  {
    author: "Karl Cerasi",
    when: "4 months ago",
    rating: 5,
    topic: "Chimney repair",
    text: "Pat organised a chimney repair for me a few weeks ago. I had a rather bad leak from my chimney which needed urgent attention. The whole process was explained in layman's talk. …",
  },
  {
    author: "Oceanfree 23",
    when: "a year ago",
    rating: 5,
    topic: "Roof repairs",
    text: "I had an excellent experience with Irish Roofers! From start to finish, their team was professional, punctual, and incredibly thorough. Alan & Patrick were great to deal with — Alan explained everything clearly, gave a fair and transparent …",
  },
  {
    author: "Sundararajan Jagannathan",
    when: "a year ago",
    rating: 5,
    topic: "Roof repairs",
    text: "I recently hired Irish Roofers for some repairs on my house, and I couldn't be more satisfied with the service. They provided a cherry picker for access and carried out all the necessary roof repairs efficiently and safely. …",
  },
];
