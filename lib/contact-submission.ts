export const formSubmitEndpoint = 'https://formsubmit.co/3bc2588a7c30e68047d52b720455e7bb';
export const formSubmitAjaxEndpoint = 'https://formsubmit.co/ajax/3bc2588a7c30e68047d52b720455e7bb';
export const submissionTimeout = 45_000;

export class SubmissionError extends Error {
  constructor(public kind: 'rejected' | 'unconfirmed' | 'timeout') { super(kind); }
}

export async function submitContact(payload: Record<string, string>, signal: AbortSignal) {
  let response: Response;
  try {
    response = await fetch(formSubmitAjaxEndpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload), signal
    });
  } catch { throw new SubmissionError(signal.aborted ? 'timeout' : 'unconfirmed'); }
  if (!response.ok) throw new SubmissionError(response.status >= 500 ? 'unconfirmed' : 'rejected');
  let result: unknown;
  try { result = await response.json(); } catch { throw new SubmissionError('unconfirmed'); }
  if (!result || typeof result !== 'object' || !('success' in result)) throw new SubmissionError('unconfirmed');
  if (result.success !== true && result.success !== 'true') throw new SubmissionError('rejected');
}
