export const ADJECTIVES = [
  'calm',
  'focused',
  'brave',
  'curious',
  'silent',
  'eager',
  'gentle',
  'sharp',
  'steady',
  'bold',
  'keen',
  'patient',
  'clever',
  'swift',
  'humble',
  'resilient',
  'quiet',
  'thoughtful',
  'precise',
  'observant'
];

export const SURNAMES = [
  'turing',
  'hopper',
  'knuth',
  'ritchie',
  'morse',
  'shannon',
  'church',
  'bernerslee',
  'lovelace',
  'torvalds',
  'dijkstra',
  'boole',
  'newton',
  'gauss',
  'euler',
  'feynman',
  'tesla',
  'curie',
  'pascal',
  'noether'
];

export const generateAnonymousName = () => {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]!;
  const name = SURNAMES[Math.floor(Math.random() * SURNAMES.length)]!;
  return `${adj.charAt(0).toUpperCase() + adj.slice(1)} ${name.charAt(0).toUpperCase() + name.slice(1)}`;
};
