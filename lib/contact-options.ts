export const contactServices = [
  'developpement-application-mali', 'consultant-informatique-bamako',
  'data-automatisation', 'consultant-si-ong', 'kalansup-universites',
  'kalanplus-ecoles', 'smartcare-cliniques', 'formation', 'maintenance', 'other'
] as const;
export type ContactService = typeof contactServices[number];

const projectServices: Record<string, ContactService> = {
  kalansup: 'kalansup-universites', storesup: 'developpement-application-mali',
  'agritech-mali': 'data-automatisation', 'digital-queue': 'developpement-application-mali'
};

export function isContactService(value: unknown): value is ContactService {
  return typeof value === 'string' && contactServices.some(service => service === value);
}

export function readContactContext(search: string) {
  const params = new URLSearchParams(search);
  const candidate = params.get('project') ?? '';
  const project = Object.prototype.hasOwnProperty.call(projectServices, candidate) ? candidate : '';
  const requestedService = params.get('service');
  const service = isContactService(requestedService) ? requestedService : projectServices[project] ?? '';
  return { project, service };
}

export function contactHref(locale: string, context: { service?: string; project?: string } = {}) {
  const params = new URLSearchParams();
  if (isContactService(context.service)) params.set('service', context.service);
  if (context.project && Object.prototype.hasOwnProperty.call(projectServices, context.project)) params.set('project', context.project);
  const query = params.toString();
  return `/${locale}/shamsi-digital${query ? `?${query}` : ''}#contact`;
}
