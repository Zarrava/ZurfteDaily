const fs = require('fs');
const path = require('path');

const cats = ['Success', 'Discipline', 'Business', 'Leadership', 'Life'];
const pools = {
  Success: [
    'Your next level demands a version of you that has never quit.',
    'Victory belongs to those who refine their craft in silence.',
    'Ambition without execution is only noise in an empty room.',
    'Build proof every day until doubt has nowhere to stand.',
    'The scoreboard changes when your standards rise before sunrise.',
    'Excellence is a habit disguised as ordinary Tuesdays.',
    'You do not rise to goals — you fall to the systems you tolerate.',
    'Let results be louder than every excuse you once believed.',
    'Success is rented, and the rent is due every morning.',
    'Winners audit their time before they celebrate their wins.',
    'Your momentum is an asset — protect it like capital.',
    'Craft a life where comfort is the exception, not the rule.',
    'The gap between vision and reality closes with disciplined reps.',
    'Become undeniable by stacking small victories with intention.',
    'Fortune respects those who prepare when nothing is watching.',
    'Raise your floor, not only your ceiling.',
    'Every breakthrough was once a boring routine repeated well.',
    'Your reputation is built in the moments no one applauds.',
    'Success favors the builder who finishes what fear started.',
    'Turn pressure into precision until pressure feels familiar.',
  ],
  Discipline: [
    'Discipline is the bridge between intention and identity.',
    'Show up on the days motivation stays home.',
    'Your calendar reveals your true priorities — edit it ruthlessly.',
    'Consistency is a competitive advantage most people refuse to pay for.',
    'Train your focus like a muscle or it will stay fragile forever.',
    'Delay gratification until your future self sends thanks.',
    'Structure creates freedom for those brave enough to follow it.',
    'The habit you skip today becomes the regret you carry tomorrow.',
    'Master the mundane and the extraordinary becomes inevitable.',
    'Discipline turns chaos into a workflow you can trust.',
    'Protect your mornings — they set the tone for your empire.',
    'Do the hard task first and the day bends in your favor.',
    'Your standards at home become your standards in business.',
    'Replace excuses with deadlines and watch your pace accelerate.',
    'Self-control is a founder skill that compounds quietly.',
    'Build routines that survive bad moods and busy seasons.',
    'Discipline is loyalty to the person you promised to become.',
    'Win the hour in front of you and the year takes care of itself.',
    'Repeat the right actions until they require no negotiation.',
    'Stay dangerous in your focus and gentle in your integrity.',
  ],
  Business: [
    'Revenue is applause for problems solved at scale.',
    'Build products people thank you for, not merely pay for.',
    'Cash flow clarity is leadership — confusion is expensive.',
    'Your brand is the promise you keep when profit is uncertain.',
    'Sell outcomes, not features, and conversations change instantly.',
    'Every no brings you closer to the client built for you.',
    'Operate lean until excellence forces expansion.',
    'Negotiate from value delivered, not from fear of losing.',
    'Systems scale businesses; heroics only scale burnout.',
    'Study your customer until empathy becomes your strategy.',
    'Profit is oxygen — purpose is the reason you breathe it.',
    'Ship fast, learn faster, refine until the market nods.',
    'Your network multiplies when you give before you ask.',
    'Price for transformation, not for hours at a desk.',
    'A business grows when its owner grows first.',
    'Document processes so growth does not depend on memory.',
    'Compete on trust when others compete on discounts.',
    'Listen to data, but decide with conviction.',
    'Build moats with service quality others cannot sustain.',
    'Entrepreneurship taxes comfort — pay daily and stay solvent.',
  ],
  Leadership: [
    'Leadership begins where blame ends and responsibility stands tall.',
    'Clarity is a gift you give your team every single week.',
    'People follow courage wrapped in humility, not titles alone.',
    'Your culture is what you tolerate when pressure arrives.',
    'Develop leaders around you or you will always be the bottleneck.',
    'Listen twice, speak once, and decisions improve immediately.',
    'A vision without trust is only a presentation.',
    'Celebrate progress publicly and correct privately with respect.',
    'The team mirrors your energy — regulate it deliberately.',
    'Great leaders remove friction so talent can run.',
    'Accountability without empathy creates turnover, not excellence.',
    'Delegate outcomes, not just tasks, and ownership appears.',
    'Your standards become the ceiling or the floor for others.',
    'Lead with principles when shortcuts whisper your name.',
    'Inspire by example on the hard days, not only the wins.',
    'Conflict handled early prevents crises handled late.',
    'Invest in people before you invest in more tools.',
    'Transparency builds loyalty faster than clever speeches.',
    'Leadership is service measured by how others grow.',
    'Build teams that win together and learn together.',
  ],
  Life: [
    'Design a life that feels aligned, not merely impressive.',
    'Peace is a strategy for sustainable high performance.',
    'Protect your energy like you protect your bank account.',
    'Gratitude turns ordinary mornings into launching pads.',
    'Rest is not retreat — it is maintenance for ambition.',
    'Choose relationships that sharpen you, not shrink you.',
    'Your health is the platform everything else stands on.',
    'Say no with confidence so your yes means something.',
    'Progress in life is measured in courage, not perfection.',
    'Celebrate how far you have come while you plan what is next.',
    'Joy and ambition can share the same address.',
    'Live intentionally because drift is expensive.',
    'Forgive quickly and move with purpose.',
    'Create memories that outlast milestones.',
    'Balance is built, not found — adjust weekly.',
    'Your story improves when you edit limiting beliefs.',
    'Be present where your feet are and bold where your dreams are.',
    'Kindness is strength that compounds across decades.',
    'Choose growth over gossip and your circle upgrades itself.',
    'Life rewards those who build meaning, not only momentum.',
  ],
};

let id = 1;
const quotes = [];
for (const cat of cats) {
  for (const q of pools[cat]) {
    quotes.push({ id: String(id++), quote: q, category: cat });
  }
}

const out = `/**
 * Zurfte Daily quote library — 100 original motivational quotes.
 * Balanced across five categories (20 quotes each).
 */

export const QUOTE_CATEGORIES = ${JSON.stringify(cats, null, 2)};

export const quotes = ${JSON.stringify(quotes, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/quotes.js'), out);
console.log('Generated', quotes.length, 'quotes');
