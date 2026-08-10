// vCard (.vcf) Generator and Exporter

export function generateVCard(user) {
  const nameParts = (user.name || 'Contact').split(' ');
  const firstName = nameParts[0] || 'Contact';
  const lastName = nameParts.slice(1).join(' ') || '';

  let vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${user.name || 'Contact'}`,
    user.title ? `TITLE:${user.title}` : '',
    user.company ? `ORG:${user.company}` : '',
    user.phone ? `TEL;TYPE=CELL:${user.phone}` : '',
    user.email ? `EMAIL;TYPE=INTERNET:${user.email}` : '',
    user.instagram ? `URL;TYPE=Instagram:https://instagram.com/${user.instagram.replace('@', '')}` : '',
    user.linkedin ? `URL;TYPE=LinkedIn:https://linkedin.com/in/${user.linkedin}` : '',
    user.bio ? `NOTE:${user.bio.replace(/\n/g, ' ')}` : '',
    'END:VCARD'
  ].filter(Boolean).join('\r\n');

  return vcard;
}

export function downloadVCard(user) {
  const vcardData = generateVCard(user);
  const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  const fileName = `${(user.name || 'contact').toLowerCase().replace(/\s+/g, '_')}_scanme.vcf`;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
