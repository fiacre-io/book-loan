// Library name generator

export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getLibTitle() {
  const adjectives = ['adorable', 'beautiful', 'clean', 'appealing', 'elegant', 'fancy', 'glamorous', 'handsome', 'sublime', 'magnificent', 'stunning', 'lovely', 'quaint', 'sparkling', 'beautous', 'ideal', 'symmetrical', 'resplendent', 'graceful', 'pleasing', 'refined', 'divine', 'angelic', 'classy', 'magnificent', 'bewitching', 'radiant', 'mysterious', 'statuesque', 'grand', 'dazzling', 'cute', 'charming', 'fair', 'comely', 'worried'];

  const authors = ['Hemingway', 'Tolkien', 'Herodotus', 'Bellow', 'Kafka', 'Duras', 'Amis', 'Flagg', 'Paglia', 'Rilke', 'Sappho', 'Neruda', 'Thompson', 'Pound', 'Didion', 'Christie', 'Steel', 'Rowling', 'Kingsolver', 'Barnes', 'Bronte', 'LeGuin', 'Poe', 'Nin', 'Wilde', 'Stowe', 'Dickinson', 'Shakespeare', 'Milton', 'Pope', 'Swift', 'Wolfe', 'Atwood', 'Austen', 'Alcott', 'Highsmith'];

  const nouns = ['eyebrows', 'cheek', 'chin', 'teeth', 'feet', 'toe', 'foot', 'leg', 'knee', 'ankles', 'shin', 'heel', 'hand', 'forearm', 'hip', 'wrist', 'palm', 'arm', 'mouth', 'head', 'forehead', 'lip', 'nose', 'thumb', 'finger', 'thigh', 'lungs', 'stomach', 'ribs', 'brain'];

  return `${rando(adjectives)}-${rando(authors)}-${rando(nouns)}`;
}
