const EMAIL = "louis.rotellini@gmail.com";

export function mailtoHref(subject?: string, body?: string) {
  const defaultSubject = "Prise de contact";

  const defaultBody = `Bonjour Louis,

Je vous contacte suite à la consultation de votre portfolio.

Merci !`;

  const s = encodeURIComponent(subject ?? defaultSubject);
  // RFC 6068 : les sauts de ligne d'un corps mailto s'écrivent %0D%0A.
  const b = encodeURIComponent((body ?? defaultBody).replace(/\r?\n/g, "\r\n"));
  return `mailto:${EMAIL}?subject=${s}&body=${b}`;
}
